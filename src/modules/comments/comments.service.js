import { commentModel } from "../../db/associations.js";
import { Op } from '@sequelize/core';

export const getAllComments = async (req, res) => {
  try {
    const comments = await commentModel.findAll({
      include: [{
        association: "user",
        attributes: ["id", "name", "email"]
      }
      ],
      attributes: {
        exclude: ["userId", "deletedAt"]
      },
      order: [["createdAt", "DESC"]]
    });
    res.status(200).json({ message: "comments retrieved successfully", data: comments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addBulkComments = async (req, res) => {
  const commentsData = req.body.comments;

  try {
    const newComments = await commentModel.bulkCreate(commentsData);
    res.status(201).json({ message: "comments added successfully", data: newComments });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateComment = async (req, res) => {
  const commentId = req.params.id;
  const userId = req.query.userId; // I use userId from query params like deletePost to standarize the approach
  const updateData = req.body;

  try {
    const comment = await commentModel.findOne({ where: { id: commentId } });
    if (!comment) {
      return res.status(404).json({ message: "comment not found" });
    }
    if (comment.userId.toString() !== userId) {
      return res.status(403).json({ message: "unauthorized to update this comment" });
    }
    const [updatedRowsCount, updatedRows] = await commentModel.update(updateData, {
      where: { id: commentId },
      returning: true,
    });

    if (updatedRowsCount === 0) {
      return res.status(404).json({ message: "something wrong happened" });
    }
    return res.status(200).json({ message: "comment updated successfully", data: updatedRows[0] });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

export const findOrCreateComment = async (req, res) => {
  const { postId, userId, content } = req.body;

  try {
    const [comment, created] = await commentModel.findOrCreate({
      where: { postId, userId, content },
      defaults: { postId, userId, content }
    });

    if (created) {
      res.status(201).json({ message: "comment created successfully", data: comment, created });
    } else {
      res.status(200).json({ message: "comment already exists", data: comment, created });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const findCommentsByContent = async (req, res) => {
  const contentQuery = req.query.word;

  try {
    const comments = await commentModel.findAll({
      where: {
        content: {
          [Op.like]: `%${contentQuery}%`
        }
      }
    });

    if (comments.length === 0) {
      return res.status(200).json({ message: "no comments found matching the search criteria" });
    }
    return res.status(200).json({ message: "comments retrieved successfully", count: comments.length, data: comments });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export const getNewestCommentsForPost = async (req, res) => {
  const postId = req.params.postId;

  const post = await commentModel.findOne({ where: { postId } });
  if (!post) {
    return res.status(404).json({ message: "post not found" });
  }

  try {
    const comments = await commentModel.findAll({
      where: { postId },
      order: [["createdAt", "DESC"]],
      limit: 3,
      attributes: {
        exclude: ["userId", "postId", "deletedAt", "updatedAt"]
      },
      order: [["createdAt", "DESC"]]
    });

    res.status(200).json({ message: "newest comments retrieved successfully", count: comments.length, data: comments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getCommentDetailsById = async (req, res) => {
  const commentId = req.params.id;

  try {
    const comment = await commentModel.findByPk(commentId, {
      include: [
        {
          association: "user",
          attributes: ["id", "name", "email"]
        },
        {
          association: "post",
          attributes: ["id", "title", "content"]
        }
      ],
      attributes: {
        exclude: ["userId", "postId", "deletedAt"]
      }
    });

    if(!comment) {
      return res.status(404).json({ message: "comment not found" });
    }
    res.status(200).json({ message: "comment retrieved successfully", data: comment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}