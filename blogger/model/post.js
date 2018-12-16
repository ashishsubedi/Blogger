var mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
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
    _creatorId:{
        type: Schema.Types.ObjectId,
        ref : 'User'
    }
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;

