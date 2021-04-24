const mongoose = require('mongoose');

const hackerSchema = new mongoose.Schema({
    name: { type: String, required: true},
    profile: { type: String, required: true},
    location: { type: String, required: true},
    education: { type: String, required: true},
    
    challengesSolved: { type: Number, required: true},
    solutionsSubmitted: { type: Number, required: true},
    solutionsAccepted: { type: Number, required: true},
    overallRank: { type: Number, required: true},
    followers: { type: Number, required: true},
    following: { type: Number, required: true},

    ds: { type: Number, required: true},
    algo: { type: Number, required: true},
    cpp: { type: Number, required: true},
    java: { type: Number, required: true},
    python: { type: Number, required: true},
    html: { type: Number, required: true},
    js: { type: Number, required: true},
    votes: { type: Number, required: true},
    timestamp: { type: Number, required: true},

    deviceType: { type: String, required: false},
})

module.exports = Hacker = mongoose.model("hacker", hackerSchema);




