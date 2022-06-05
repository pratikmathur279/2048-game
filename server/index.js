import path from "path";
import { fileURLToPath } from 'url';
import cors from "cors";
import moment from 'moment-timezone';

import bodyParser from 'body-parser';
import multer from 'multer';
var upload = multer();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

import express from "express";
import { DynamoDBClient, ListTablesCommand } from "@aws-sdk/client-dynamodb";

import config from './config/config.js';

// import scheduler from './events/scheduler.js';

// import routes


const PORT = process.env.PORT || 3456;

const app = express();

// for parsing application/json
app.use(express.json());

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// for parsing multipart/form-data
app.use(upload.array());


app.use(express.static(path.resolve(__dirname, '../client/public')));

app.use((err, req, res, next) => {
	res.locals.error = err;
	const status = err.status || 500;
	res.status(status);
	res.render('error');
});

app.use(cors({
	"origin": "*",
	"methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
	"allowedHeaders": ['Authorization', 'Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Access-Control-Request-Method', 'Access-Control-Request-Headers', 'Cache-Control']
}));

// automated task scheduler
// scheduler();

// establish dynamodb connection
(async () => {
	const client = new DynamoDBClient({ region: "us-east-1" });
})();


// import api routes here

app.get("/api", (req, res) => {
	console.log('my server');
	res.json({ message: "My server" });
});


app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../client/public', 'index.html'));
});