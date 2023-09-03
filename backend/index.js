const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
// const colors = require("colors")
const dotenv = require("dotenv")
const {connection} = require("./db.js")


const {userRouter} = require("./routes/user.routes.js")
const {transactionRouter}=require("./routes/transaction.routes.js")


// rest object
const app = express()

// middlewares

app.use(morgan("dev"))
app.use(express.json())
app.use(cors())

// routes

// app.get("/",(req,res)=>{
// res.send("<h1>hello server</h1>")
// })

app.use("/users",userRouter)
app.use("/transaction",transactionRouter)

//port

const PORT = 8080 || process.env.port

app.listen(PORT,async()=>{
    try {
        await connection
        console.log(`server is running in port ${PORT}`)
    } catch (error) {
        console.log("something error occurs")
    }
 
})