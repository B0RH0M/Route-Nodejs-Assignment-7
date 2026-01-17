import userModel from "./models/user.model.js";
import postModel from "./models/post.model.js";
import commentModel from "./models/comment.model.js";


// user has many posts
userModel.hasMany(postModel, {
  foreignKey: "userId",
  as: "posts",
});
postModel.belongsTo(userModel, {
  foreignKey: "userId",
  as: "user"
});

// post has many comments
postModel.hasMany(commentModel, {
  foreignKey: "postId",
  as: "comments"
});
commentModel.belongsTo(postModel, {
  foreignKey: "postId",
  as: "post"
});

// user has many comments
userModel.hasMany(commentModel, {
  foreignKey: "userId",
  as: "comments"  
});
commentModel.belongsTo(userModel, {
  foreignKey: "userId",
  as: "user"
});


export {
  userModel,
  postModel,
  commentModel
}
