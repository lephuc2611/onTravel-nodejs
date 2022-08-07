require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const dbConfig = require('./app/config/db.config')
const mongoString = `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`
const routes = require('./app/routes/routes')

const db = require("./app/models")
const Role = db.role
db.mongoose
.connect(mongoString)
.then(() => {
   console.log('Database Connected!')
   initial()
})
.catch(err => {
  console.error("Connection error", err)
  process.exit()
})

const app = express()

//use cors
// var corsOptions = {
//    origin: "http://localhost:8081"
// };

// app.use(cors(corsOptions))

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended: true}))

app.use(express.json())

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
   console.log(`Server started at ${PORT}`);
})

app.use('/api', routes)


function initial() {
   Role.estimatedDocumentCount((err, count) => {
     if (!err && count === 0) {
       new Role({
         name: "user"
       }).save(err => {
         if (err) {
           console.log("error", err);
         }
         console.log("added 'user' to roles collection");
       });
       new Role({
         name: "host"
       }).save(err => {
         if (err) {
           console.log("error", err);
         }
         console.log("added 'host' to roles collection");
       });
       new Role({
         name: "admin"
       }).save(err => {
         if (err) {
           console.log("error", err);
         }
         console.log("added 'admin' to roles collection");
       });
     }
   });
}