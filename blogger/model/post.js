var mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    text: {
        type :String,
        required:true
    },
    createdAt:{
        type: Date,
        default: Date.now()
    },
    isDeleted:{
        type: Boolean,
        default: false
    },
    _createrId:{
        type: Schema.ObjectId,
        ref : 'User'
    }
});

const User = mongoose.model("User", userSchema);
module.exports = User;

