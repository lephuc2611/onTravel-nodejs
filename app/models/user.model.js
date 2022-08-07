const mongoose = require('mongoose')

const User = mongoose.model(
   "User",
   new mongoose.Schema({
      userName: {
         require: true,
         type: String
      },
      email: {
         require: true,
         type: String
      },
      password: {
         require: true,
         type: String
      },
      role: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role"
         }
      ]
   })
)

module.exports = User
