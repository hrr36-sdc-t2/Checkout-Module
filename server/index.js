const
  cluster = require('cluster'),
  cpus = require('os').cpus().length,
  startProcess = require('./server.js');

switch (cluster.isMaster) {
  case true: distributeProcess(); break;
  case false:
  default: startProcess();
}

function distributeProcess() {
  let
    workers = [],
    clust = 2;
  console.log('cpus ', cpus)
  for (let i = 0; i < clust; i++) {
    createClust(i);
  }

  function createClust(i) {
    workers[i] = cluster.fork();
    workers[i]
      .on('exit', () => {
        console.log('cluster exited and re-created', i);
        createClust(i);
      });
  }

}