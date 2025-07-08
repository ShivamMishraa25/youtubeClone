import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true 
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String 
    },
    likedVideos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video'
    }],
    subscribedChannels: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Channel' 
    }],
    channelId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Channel' 
    }
}, { timestamps: true });

const UserModel = mongoose.model("User", userSchema);

export default UserModel;