import path from 'path';
import express from 'express'
import cors from 'cors'
import { config } from '~api/config'

import MongoDB from '~api/services/mongodb';

import catalog from '~api/routes/catalog';
import heartbeat from '~api/routes/heartbeat';

const app = express();
app.use(express.json());
app.use('/', catalog);
app.use('/isAlive', heartbeat);

if (config.isDev && config.webAppURL) {
  const corsOptions = {
    origin: config.webAppURL,
    optionsSuccessStatus: 200
  };
  app.use(cors(corsOptions));
} else if (config.webAppPath) {
  app.use(express.static(path.join(__dirname, config.webAppPath)));
}

const main = async () => {
  await MongoDB.connect(config.mongoDB.connectionUri);

  app.listen(config.port, () => {
    console.log('Server listening on port', config.port);
  }).on('error', err => {
    console.error(err);
    process.exit(1);
  });
};

if (config.mongoDB.connectionUri) {
  main();
} else {
  console.log('Cannot start server. MongoDB connection info missing');
}
