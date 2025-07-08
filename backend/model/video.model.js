import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String 
    },
    videoLink: { 
        type: String, 
        required: true 
    },
    thumbnail: { 
        type: String 
    },
    views: { 
        type: Number, 
        default: 0 
    },
    likes: { 
        type: Number, 
        default: 0 
    },
    dislikes: { 
        type: Number, 
        default: 0 
    },
    uploadDate: { 
        type: Date, 
        default: Date.now 
    },
    category: { 
        type: String 
    },
    channel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Channel",
        required: true,
    },
    comments: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Comment" 
    }],
},{ timestamps: true });

const VideoModel = mongoose.model("Video", videoSchema);

export default VideoModel;