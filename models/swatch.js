var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var swatchSchema = new Schema({
    userID: Schema.Types.ObjectId,
    name: String,
    collectionz: String,
    designer: String,
    manufacturer: String,
    amountYards: Number,
    amountInches: Number,
    width: String,
    colors: Array,
    img: Object,
    dateAdded: Date
});

var Swatch = mongoose.model('Swatch', swatchSchema);

exports.schema = swatchSchema;
exports.model = Swatch;

//module.exports = Swatch;