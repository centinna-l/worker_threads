const express = require("express");
const app = express();
app.set("view engine", "ejs");
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
app.get("/about", (req, res) => {
  var mascots = [
    { name: "Sammy", organization: "DigitalOcean", birth_year: 2012 },
    { name: "Tux", organization: "Linux", birth_year: 1996 },
    { name: "Moby Dock", organization: "Docker", birth_year: 2013 },
  ];
  var tagline =
    "No programming concept is complete without a cute animal mascot.";
  res.render("pages/index.ejs", { mascots, tagline });
});
app.listen(8000, (_) => {
  console.log("Connected to Port: 8000");
});
