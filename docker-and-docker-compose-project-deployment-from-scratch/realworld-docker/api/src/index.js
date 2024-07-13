const express = require("express")

const port = process.env.PORT ?? 8080;
const host = process.env.HOST;
const app = express()

app.get("/test", (req, res) => {
  res.send("Our API server is working correctly")
})


app.listen(port, () => {
  console.log(`Started api service on port ${port}`)
  console.log(`Our host is ${host}`)
})