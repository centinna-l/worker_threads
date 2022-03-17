const express = require("express");
const app = express();
const { Worker, isMainThread, setEnvironmentData } = require("worker_threads");

let total = 0;
setEnvironmentData("total", total);
app.get("/home", (req, res) => {
  console.log("Main Thread: ", isMainThread);
  total++;

  res.json({
    message: `This is a sample API ${total}`,
  });
});
app.get("/heavy", (req, res) => {
  console.log("Main Thread: ", isMainThread);
  const worker = new Worker("./worker", { workerData: { total: 0 } });
  worker.on("message", (workerData) => {
    res.json({
      message: `This is a sample API ${workerData}`,
    });
  });
});

app.listen(8000, (_) => {
  console.log("Connected to Port: 8000");
});
