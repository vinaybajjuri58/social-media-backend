const express = require("express");
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the backend of social media",
  });
});
app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
