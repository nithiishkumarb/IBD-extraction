const mongoose = require('mongoose');

const uploadedDataSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    data: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    expireAt: {
        type: Date,
        default: () => new Date(Date.now() + 2 * 60 * 1000),
        index: { expires: '24h' },
    },
});
module.exports=mongoose.model('Data', uploadedDataSchema);




// const { format } = require("date-fns");
// const today = format(new Date(), "dd-MM-yyyy");
// const FolderSchema = new mongoose.Schema({
//     userId: { type: String, required: true },
//     data: mongoose.Schema.Types.Mixed, // Store the row data as a JSON object
//     createdAt: { type: Date, default: Date.now, expires: '24h' },
// });
// module.exports = mongoose.model(today, FolderSchema);