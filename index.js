const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
require("dotenv").config();
const { initialiseDBConnection } = require("./db/db.connect");
const { userRouter } = require("./routes/user.routes");
const {
  pathNotFoundHandler,
  errorHandler,
} = require("./middleware/errorHandlers");
const { notificationRouter } = require("./routes/notification.routes");
const { commentRouter } = require("./routes/comment.routes");
const { postRouter } = require("./routes/post.routes");
const { authValidator } = require("./middleware/authHandler");
initialiseDBConnection();
const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the backend of social media",
  });
});
app.use("/api/users", userRouter);
app.use("/api/notifications", authValidator, notificationRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments/", authValidator, commentRouter);

app.use(pathNotFoundHandler);
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
