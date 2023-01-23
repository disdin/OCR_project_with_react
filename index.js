// Importing all required modules
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import Connection from "./model/db.js";
import rateLimit from "express-rate-limit";
import hsts from "hsts";
import { router } from "./router.js";
import helmet from "helmet";
import cluster from "cluster";
import os from "os";
import cors from 'cors'
import multer from "multer";


dotenv.config();

const numCpu = os.cpus().length;

const app = express();
app.use(cors());
// limiting concurrent requests
const limiter = rateLimit({
  windowMs: 5 * 1000, 
  max: 25, // Limit each IP to 100 requests per `window`
  message: {
    code: 429,
    message: 'too many requests'
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

//declaring port and database url
const port = process.env.PORT || 5000;
// const username = process.env.DB_USERNAME;
// const password = process.env.DB_PASSWORD;
// const url = `mongodb+srv://${username}:${password}@cluster0.khyvpbl.mongodb.net/?retryWrites=true&w=majority`;
// Connection(process.env.MONGODB_URI || url);

// declaring middleware functions
app.use(bodyParser.json({ limit: '1mb' }));
app.set("view engine", "ejs"); //ejs as templating engine
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); //static files in public directory
// app.use(limiter);
// app.use(helmet());
// app.use(hsts({
//   // Limiting payload size
//   maxAge: 31536000,
//   includeSubDomains: true,
//   preload: true
// }));
app.use('/', router);

// using multiple CPU cores to boost speed
if (cluster.isMaster) {
  for (let i = 0; i < numCpu; i++) {
    cluster.fork();
  }
  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    cluster.fork();
  })
}
else {
  app.listen(port, () => {
    console.log(`>> Server ${process.pid} started successfully at port ${port}`);
  });
}



