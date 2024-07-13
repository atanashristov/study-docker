const mongoose = require("mongoose")
const { db } = require("../configuration")

module.exports.connectDb = () => {
  console.log(`Connecting to mongo db at ${db}`)
  mongoose.connect(db)

  return mongoose.connection
}