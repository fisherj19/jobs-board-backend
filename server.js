'use strict';

const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const fireAdmin = require('firebase-admin');

const app = express();
// parsers for POST data: set file size limits
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
// point static path to 'pub' folder
app.use(express.static(path.join(__dirname, 'pub')));

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const port = process.env.PORT || 3000;

const corsOptions = {
  origin: [
    process.env.SERVICE_PATH,
    process.env.APP_PATH
  ]
};
app.use(cors(corsOptions));
app.all('/*', (req, res, next) => {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Accept,X-Access-Token,X-Key');
  if (req.method === 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

// login to Firebase
fireAdmin.initializeApp({
  credential: fireAdmin.credential.cert({
    "type": "service_account",
    "project_id": process.env.FIREBASE_PROJECT_ID,
    "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
    "private_key": process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    "client_email": process.env.FIREBASE_CLIENT_EMAIL,
    "client_id": process.env.FIREBASE_CLIENT_ID,
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://accounts.google.com/o/oauth2/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": process.env.FIREBASE_CLIENT_CERT_URL
  }),
  databaseURL: process.env.FIREBASE_DB
});

app.locals.fireAdmin = fireAdmin;

// set up security middleware
app.all('/api/core/*', [require('./server/middleware/validateRequest')]);
app.all('/api/core/admin/*', [require('./server/middleware/validateAdmin')]);

// shared routes
app.use('/api', require('./server/routes/api'));

// catch all other routes and return index file
app.all('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'pub/index.html'));
});

// create HTTP server
const server = http.createServer(app);

// listen on provided port, on all network interfaces
server.listen(port, () => console.log(`API running on ${process.env.SERVICE_PATH}`));
