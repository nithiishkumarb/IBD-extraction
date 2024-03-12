const router = require("express").Router();
const Industries = require("../models/Industries");
const PDFDocument = require("pdfkit");

router.get('/industries_list', async (req, res) => {
    try {
        const industries = await Industries.find({});

        // Create a new PDF document
        const doc = new PDFDocument();
        doc.pipe(res); // Send the PDF as the response

        doc.fontSize(18).text('List of Industries', { align: 'center' }).moveDown(0.5);

        industries.forEach((industry, index) => {
            doc.text(`${index + 1}. ${industry.name}`);
            // You can customize the way you want to add industries to the PDF
        });

        doc.end(); // Finalize the PDF

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="industries_list.pdf"');
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while generating the PDF.');
    }
});

module.exports = router;
