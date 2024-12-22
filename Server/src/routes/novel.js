
import Novel from "../models/Novel.js";
import express from "express";
const routerNovel = express.Router();


routerNovel.post("/", async (req, res) => {
    try {
        const { title, author, description, genre, rating, likes_count, comments } = req.body;

        if (!title || !author || !description || !genre) {
            return res.status(400).send({ message: "Title, author, description, and genre are required" });
        }

        const newNovel = new Novel({
            title,
            author,
            description,
            genre,
            rating: rating || 0,          // Nếu không có rating, mặc định là 0
            likes_count: likes_count || 0, 
            comments: comments || []       // Nếu không có comments, mặc định là mảng rỗng
        })

        // Lưu truyện mới vào mongo.
        await newNovel.save();
        res.status(201).send({ message: "Novel created successfully", story: newNovel });
    } catch (error) {
        console.error("Error creating story:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

routerNovel.get("/", async (req, res) => {
    try {
        const novels = await Novel.find();
        res.status(200).send(novels);
    } catch (error) {
        console.error("Error retrieving novels:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

routerNovel.get("/:id", async (req, res) => {
    try {
        const novel = await Novel.findById(req.params.id);
        if (!novel) {
            return res.status(404).send({ message: "Novel not found" });
        }
        res.status(200).send(novel);
    } catch (error) {
        console.error("Error retrieving novel:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});


routerNovel.put("/:id", async (req, res) => {
    try {
        const updates = req.body;
        const novel = await Novel.findByIdAndUpdate(req.params.id, updates, { new: true });
        if (!novel) {
            return res.status(404).send({ message: "Novel not found" });
        }
        res.status(200).send({ message: "Novel updated successfully", story: novel });
    } catch (error) {
        console.error("Error updating novel:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});


routerNovel.delete("/:id", async (req, res) => {
    try {
        const novel = await Novel.findByIdAndDelete(req.params.id);
        if (!novel) {
            return res.status(404).send({ message: "Novel not found" });
        }
        res.status(200).send({ message: "Novel deleted successfully" });
    } catch (error) {
        console.error("Error deleting novel:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

export default routerNovel;