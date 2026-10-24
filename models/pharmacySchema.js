const moogose = require("mongoose");

const pharmacySchema = new moogose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    Composition: {
        type: String,
        required: true,
    },
    usage: {
        type: String,
        required: true, 
    },
    prescriptionRequired: {
        type: Boolean,
        required: true, 
    },
    manufacturer: {
        type: String,
        required: true,  
    },
    stock: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    }

}, { timestamps: true });

const Drugs = moogose.model("Drugs", pharmacySchema);

module.exports = Drugs;
    