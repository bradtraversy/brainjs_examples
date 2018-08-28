const brain = require('brain.js');
const fs = require('fs');
const data = require('./data.json');

const networkPath = '03_hardware-software-cached.network.json';

const trainingData = data.map(item => ({
  input: item.text,
  output: item.category
}));

const network = new brain.recurrent.LSTM();
let networkData = null;
if (fs.existsSync(networkPath)) {
  networkData = JSON.parse(fs.readFileSync(networkPath));
  network.fromJSON(networkData);
} else {
  network.train(trainingData, {
    iterations: 2000
  });
  fs.writeFileSync(networkPath, JSON.stringify(network.toJSON(), null, 2));
}

const output = network.run('The code has some bugs');

console.log(`Category: ${output}`);
