const express = require('express');
const fs = require('fs');
const app = express();
const path = require('path');
const router = express.Router();
const multer = require('multer')
const xlsx = require('xlsx');
const Upload=require('../models/Extract_data')
const { format } = require('date-fns');
const archiver = require('archiver');

//Storing a data in server
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './Data');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

// Uploading an Excel file
router.post('/upload', upload.single('file'), async (req, res) => {
try {
const { userId } = req.body;
await Upload.deleteMany({ userId });
const workbook = xlsx.readFile(req.file.path);
    for (const sheetName of workbook.SheetNames) {
        const sheet = workbook.Sheets[sheetName];
        const sheetData = xlsx.utils.sheet_to_json(sheet, { header: 1 });
        if (sheetData.length === 0) {
            continue;
        }
        const [headers, ...data] = sheetData;
        for (const row of data) {
            const rowData = {};
            headers.forEach((header, index) => {
                rowData[header] = row[index];
            });
            await Upload.create({ userId, data: rowData });
        } 
    }
    res.json({ message: 'File uploaded and data stored successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to upload file.' });
    }
});
    // const cleanupInterval = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    // setInterval(async () => {
    //     const twentyFourHoursAgo = new Date(Date.now() - cleanupInterval);
    //     await UploadedData.deleteMany({ createdAt: { $lt: twentyFourHoursAgo } });
    //     console.log('Old data removed.');
    // }, cleanupInterval);

//Listing the file names
router.get('/filelist/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const data = await Upload.find({ userId });
        if (data.length === 0) {
            return res.status(404).json({ message: 'Data not found for the user.' });
        }
        data.sort((a, b) => a.data['IBD No'] - b.data['IBD No']);
        const groupedData = {};
        data.forEach(item => {
            const ibdNo = item.data['IBD No'];
            if (!groupedData[ibdNo]) {
                groupedData[ibdNo] = [];
            }
            const createdAt = new Date(item.createdAt);
            const formattedDate = createdAt.toLocaleString('en-IN', {
            timeZone: 'Asia/Kolkata',
            dateStyle: 'short', 
            timeStyle: 'short', 
    });
            groupedData[ibdNo].push({
                entryName: `${ibdNo}`,
                createdAt: formattedDate,
            });
        });
        const entryNames = Object.keys(groupedData).map(ibdNo => ({
            entryName: `${ibdNo}`,
            createdAt: groupedData[ibdNo][0].createdAt,
        }));
        res.json({ entryNames });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve data.' });
    }
});

//Download a Folders
router.get('/download/data/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const data = await Upload.find({ userId });
        if (data.length === 0) {
            return res.status(404).json({ message: 'Data not found for the user.' });
        }
        data.sort((a, b) => a.data['IBD No'] - b.data['IBD No']);
        const groupedData = {};
        data.forEach(item => {
            const ibdNo = item.data['IBD No'];
            if (!groupedData[ibdNo]) {
                groupedData[ibdNo] = [];
            }
            groupedData[ibdNo].push(item);
        });
        const archive = archiver('zip', {
            zlib: { level: 8 },
        });
        archive.on('error', (err) => {
            console.error(err);
            res.status(500).json({ error: 'Failed to create zip file.' });
        });
        const todayFolderName = format(new Date(), 'dd-MM-yyyy');
        res.attachment(`${todayFolderName}.zip`);
        archive.pipe(res);
        for (const ibdNo in groupedData) {
            // const textData = groupedData[ibdNo].map(item => {
            // return Object.keys(item.data).map(key => `${key}: ${item.data[key]}`).join(', ');
            // }).join('\n\n');
            // const entryName = `IBDNo_${ibdNo}.txt`;
            // archive.append(textData, { name: entryName });
            const textData = groupedData[ibdNo].map(item => {
                const values = Object.values(item.data).join('    ');
                return values;
            }).join('\n');
            const entryName = `IBDNo_${ibdNo}.txt`;
            archive.append(textData, { name: entryName });
        }
        archive.finalize();
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve data.' });
    }
});
module.exports = router;