
import mongoose, { Schema } from "mongoose";

const storySchema = new mongoose.Schema({
    
        name: {
          type: String,
          required: true,
        },
    
        genres: [
          {
            type: Schema.Types.ObjectId,
            ref: "Genre",
            required: true,
          },
        ],
    
        country: {
          type: String,
        },
        author: {
          type: String,
        },
        status: {
          type: String,
          enum: ["hoan thanh", "dang cap nhat"],
          default: "dang cap nhat",
        },
        poster_img: {
          type: String,
          required: true,
        },
        releaseDate: {
          type: Date,
        },
        description: {
          type: String,
          required: true,
        },
        totalChap: {
          type: Number,
        },
        totalPoints: {
          type: Number,
          required: false,
          default: 0,
        },
        countRating: {
          type: Number,
          required: false,
          default: 0,
        },
        viewed: {
          type: Number,
          required: false,
          default: 0,
        },
    
}, { timestamps: true }); // timestamps thêm createdAt và updatedAt

const Novel = mongoose.model("Novel", storySchema);

export default Novel;
