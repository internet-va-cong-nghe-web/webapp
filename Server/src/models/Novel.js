import mongoose from "mongoose";

const storySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    author: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    genre: {
        type: [String], // Mảng các thể loại, ví dụ: ["Action", "Fantasy"]
        required: true,
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0,
    },
    likes_count: {
        type: Number,
        default: 0,
    },
    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User", // Giả sử bạn có User model cho người dùng
            },
            content: {
                type: String,
                required: true,
                trim: true,
            },
            date: {
                type: Date,
                default: Date.now,
            },
        },
    ],
}, { timestamps: true }); // timestamps thêm createdAt và updatedAt

const Novel = mongoose.model("Novel", storySchema);

export default Novel;
