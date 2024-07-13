import express from "express";
import { getPost, getPosts, createPost, delPost, updatePost } from "../controllers/postController.js";

const router = express.Router();

router.get("/", getPosts);

router.get("/:id", getPost);

router.post("/", createPost);

router.put("/:id", updatePost);

router.delete("/:id", delPost);

export default router;
