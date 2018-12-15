var mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    method:{
        type: String,
        enum: ['local','google']
    },
    
    local:{
        password:{
            type:String,
            minlength: [8,"Too Short"]
        },
        email : {
            type: String,
            required: true
        },
        username:{
            type: String,
        },
        name :{
            type: String, 
        },
        admin:{
            type:Boolean,
            default:false
        }

    },
    google:{
        googleid : {
            type: String,
        },  
        email : {
            type: String,
        },
        name :{
            type: String, 
        },
        admin:{
            type:Boolean,
            default:false
        }
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

