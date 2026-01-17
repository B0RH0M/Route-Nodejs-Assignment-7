import { Router } from "express";
import { addNewPost, deletePost, getAllPosts, getAllPostsDetails, getAllPostsWithCommentsCount } from "./posts.service.js";
const router = Router();

// end point to add new post
router.post("/", addNewPost);


// end point to delete post
router.delete("/:id", deletePost);


// end point to get all posts
router.get("/", getAllPosts);

// end point to get all posts with user and comments details
router.get("/details", getAllPostsDetails);

// end point to get posts with comments count
router.get("/comments-count", getAllPostsWithCommentsCount);


export default router;