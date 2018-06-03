import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';
import del from 'del';
import path from 'path';
import fs from 'fs';
import mongoose from 'mongoose';
import multer from 'multer';
import AWS from 'aws-sdk';
import Humidity from './models/humidity';
import Snapshot from './models/snapshot';
import Log from './models/log';
import Temperature from './models/temperature';
import config from './config';
import { getQueryParams } from './utils';

const app = express();
const upload = multer({ dest: __dirname + '/public/images'});

AWS.config.region = 'us-east-2';

mongoose.connect(`${config.mongoUrl}`);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/snapshots', upload.single('image'), (req, res) => {
    if (req.file) {
      const { originalname, filename, destination } = req.file;
      const { createdAt } = req.body;
      const filepath = `${destination}/${filename}`;
      const body = fs.createReadStream(filepath);
      const key = `uploads/snapshots/${filename}`;
      const s3obj = new AWS.S3({ params: {
        Bucket: config.bucket, Key: key, ACL: 'public-read'
      } });

      s3obj.upload({ Body: body }).send((err, data) => {
        del([filepath]);
        if (err) {
          console.log(`Failed to upload image to s3: ${err}`);
          res.status(400).json({ errors : 'Error on upload' });
        } else {
          const uri = data.Location;
          Snapshot.create({
            uri,
            createdAt,
          }).then((doc) => res.json(doc));
        }
      });
    } else {
      console.log('err');
      res.status(400).json({});
    }
});

app.post('/temperatures',(req, res) => {
  const temperature = req.body;
  Temperature.create(temperature).then((doc) => res.json(doc));
});

app.post('/humidities', (req, res) => {
  const humidity = req.body;
  Humidity.create(humidity).then((doc) => res.json(doc));
});

app.post('/logs',(req, res) => {
  const log = req.body;
  Log.create(log).then((doc) => res.json(doc));
});

app.get('/temperatures', (req, res) => {
  const { first, offset } = getQueryParams(req.query);
  Temperature.find({}).limit(first).skip(offset).sort({createdAt: 'desc'}).exec()
    .then((docs) => {
      res.json(docs);
    });
});

app.get('/logs', (req, res) => {
  const { first, offset } = getQueryParams(req.query);
  Log.find({}).limit(first).skip(offset).sort({createdAt: 'desc'}).exec()
    .then((docs) => {
      res.json(docs);
    });
});

app.get('/humidities', (req, res) => {
  const { first, offset } = getQueryParams(req.query);
  Humidity.find({}).limit(first).skip(offset).sort({createdAt: 'desc'}).exec()
    .then((docs) => {
      res.json(docs);
    });
});

app.get('/snapshots', (req, res) => {
  const { first, offset } = getQueryParams(req.query);
  Snapshot.find({}).limit(first).skip(offset).sort({createdAt: 'desc'}).exec()
    .then((docs) => {
      res.json(docs);
    });
});

app.use((err, req, res, next) => {
  res.status(404).json({});
});

const httpServer = http.createServer(app);
httpServer.listen(config.port, () => {
  console.log(`listening on ${config.port}`);
});
