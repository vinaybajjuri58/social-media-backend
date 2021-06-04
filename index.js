const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
require("dotenv").config();
const { initialiseDBConnection } = require("./db/db.connect");
const { userRouter } = require("./routes/user.routes");
const {
  pathNotFoundHandler,
  errorHandler,
} = require("./middleware/errorHandlers");
const { imageUploadHandler } = require("./middleware/imageUploadHandler");
initialiseDBConnection();
const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the backend of social media",
  });
});
app.use("/api/users", userRouter);
app.use("/api/image-upload", imageUploadHandler);

app.use(pathNotFoundHandler);
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
