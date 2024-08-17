import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Setup Node with TS and JEST with Nodemon watching");
});

app.listen(8080, () => {
  console.log("app is listening: http://localhost:8080");
});
