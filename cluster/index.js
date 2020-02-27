const cluster = require('cluster');
const express = require('express');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(' Fork %s worker(s) from master', numCPUs);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('online', worker => {
    console.log('worker is running on %s pid', worker.process.pid);
  });

  cluster.on('exit', (worker, code, signale) => {
    console.log('worker with %s pid is closed', worker.process.pid);
  });
} else if (cluster.isWorker) {
  const port = 3000;
  console.log(
    `worker (${cluster.worker.process.pid}) is now listening to http://localhost:${port}`
  );
  const app = express();
  app.get('*', (req, res) => {
    res.send(200, `cluser ${cluster.worker.process.pid} responded \n`);
  });
  app.listen(port);
}
