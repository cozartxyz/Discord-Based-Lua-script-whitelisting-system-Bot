const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
 key: String,
 hwid: String,
 userId: String, 
 exploit: String,
 discordId: String
});

module.exports.Userdb = mongoose.model('users', userSchema);