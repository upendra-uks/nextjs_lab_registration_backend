import { Pool } from "pg";
import NextCors from 'nextjs-cors';
import Cors from 'cors';

import mysql from 'serverless-mysql';
const db = mysql({
  config: {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD
  }
});

const cors = Cors({
  methods: ['POST', 'GET', 'HEAD', 'PUT', 'DELETE'],
  origin: ['https://www.test.com', 'http://localhost:3000'],
  credentials: true
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req,res,fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

export {db, cors, runMiddleware}
