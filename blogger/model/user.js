var mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    googleid : {
        type: String,
        default: ""
    },
    name :{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true,
        unique: true,
        minlenghth: [6,"Too Short"]
    },
    password:{
        type:String,
        required:true,
        minlength: [8,"Too Short"]
    },
    email : {
        type: String,
        required: true
    },
    admin:{
        type:Boolean,
        default:false
    },
    isDeleted:{
        type: Boolean,
        default:false
    },
    _userPosts:[{
        type: Schema.ObjectId,
        ref: 'Post'
    }]
},{
    timestamps: true
});

const User = mongoose.model("User", userSchema);
module.exports = User;

