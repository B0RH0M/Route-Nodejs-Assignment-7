import express from "express";
import { checkConnection, syncDatabase } from "./db/database.js";
import userRouter from "./modules/users/users.controller.js";
import postRouter from "./modules/posts/posts.controller.js";
import commentRouter from "./modules/comments/comments.controller.js";

import "../src/db/models/user.model.js";
import "../src/db/models/post.model.js";
import "../src/db/models/comment.model.js";

const app = express();
const PORT = 3000;

const bootstrap = async () => {
  app.use(express.json());
  
  // check connection 
  await checkConnection();
  // sync Database
  await syncDatabase();

  app.get("/", (req, res, next) => {
    res.status(200).send("Server is running");
  })

  app.use("/users", userRouter);
  app.use("/posts", postRouter);
  app.use("/comments", commentRouter);

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}                             

export default bootstrap;