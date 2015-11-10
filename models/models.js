/**
 * Mongoose Model Information
 * */

var mongoose = require('mongoose');

var CandidateModel = mongoose.model('candidate', new mongoose.Schema({
    google_id: {
        unique: true,
        type: String
    },
    google_user: mongoose.Schema.Types.Mixed,
    name: {
        first: String,
        last: String
    },
    email: String,
    linkedin: String,
    github: String
}));

module.exports = {
    CandidateModel: CandidateModel
};