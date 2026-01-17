import { Router } from "express";
import { addBulkComments, findCommentsByContent, findOrCreateComment, getAllComments, getCommentDetailsById, getNewestCommentsForPost, updateComment } from "./comments.service.js";
const router = Router();

// end point to add bulk comments
router.post("/", addBulkComments);

// end point to find if exists or create comment if not exists
router.post("/find-or-create", findOrCreateComment);

// end point to update comment
router.patch("/:id", updateComment);

// end point to get all comments
router.get("/", getAllComments);

// end point to find comments by content
router.get("/search", findCommentsByContent);

// end point to get newest 3 comments for a post
router.get("/newest/:postId", getNewestCommentsForPost);

// end point to get post details by id
router.get("/details/:id", getCommentDetailsById);

export default router;
