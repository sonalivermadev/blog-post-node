const app=require("./app")
require("dotenv").config()
const PORT=process.env.PORT||4000
const DBconnected=require("./config/config");

DBconnected.DBconnected()
  app.listen(PORT,()=>{
    console.log(`server is running${PORT}`)
  })
