const {
  workerData,
  parentPort,
  isMainThread,
  getEnvironmentData,
} = require("worker_threads");
console.log(isMainThread);
let total = workerData.total;
console.log(getEnvironmentData("total"));
for (let i = 0; i < 1000000000; i++) {
  total++;
}

parentPort.postMessage(total);
