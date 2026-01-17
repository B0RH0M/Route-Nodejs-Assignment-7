import { postModel, commentModel } from "../../db/associations.js";
import { sequelize } from "../../db/database.js";

export const addNewPost = async (req, res) => {
  try {
    const newPost = await postModel.create(req.body);
    res.status(201).json({ message: "post added successfully", data: newPost });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const deletePost = async (req, res) => {
  const postId = req.params.id;
  const userId = req.query.userId;

  try {
    const post = await postModel.findOne({ where: { id: postId } });
    if (!post) {
      return res.status(404).json({ message: "post not found" });
    }
    if (post.userId.toString() !== userId) {
      return res.status(403).json({ message: "unauthorized to delete this post" });
    }
    const deletedRowsCount = await postModel.destroy(post);
    if (deletedRowsCount === 0) {
      return res.status(404).json({ message: "something wrong happened" });
    }
    res.status(200).json({ message: "post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getAllPosts = async (req, res) => {
  try {
    const posts = await postModel.findAll({
      attributes: ["id", "title", "content", "createdAt", "updatedAt"],
      include: {
        association: "user",
        attributes: ["id", "name", "email"]
      },
    });
    res.status(200).json({ message: "posts retrieved successfully", data: posts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getAllPostsDetails = async (req, res) => {
  try {
    const posts = await postModel.findAll({
      attributes: ["id", "title", "content", "createdAt", "updatedAt"],
      include: [
        {
          association: "user",
          attributes: ["id", "name", "email"]
        },
        {
          association: "comments",
          attributes: ["id", "content"]
        }
      ]
    });

    res.status(200).json({ message: "posts retrieved successfully", data: posts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getAllPostsWithCommentsCount = async (req, res) => {
  try {
    const posts = await postModel.findAll({
      include: [
        {
          association: "comments",
          attributes: []
        }
      ],
      attributes: [
        "id", "title",
        [sequelize.cast(sequelize.fn("COUNT", sequelize.col("comments.id")), "INTEGER"), "commentsCount"],
      ],
      group: ['Post.id']
    });
    res.status(200).json({ message: "posts retrieved successfully", data: posts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}