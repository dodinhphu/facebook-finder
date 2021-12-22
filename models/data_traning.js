const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const dataTraning = new Schema({
    id: { type: String, default: '' },
    data:
    {
        label: { type: String, default: '' },
        descriptors: { type: Array, default: '' },
    }
});
module.exports = mongoose.model('dataTraning', dataTraning);