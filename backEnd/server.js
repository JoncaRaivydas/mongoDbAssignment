const express = require("express")
const cors = require("cors")
const colors = require("colors")
const dotenv = require("dotenv").config()
const {errorHandler}=require("./middleware/errorMidleware")
const connectDB=require("./config/db")
const categoryRoutes = require("./routes/categoryRoutes");
const port= process.env.PORT || 8000

connectDB()

const app = express()

app.use(cors());

app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.use('/api/goals', require('./routes/goalsRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler)
app.use("/api", categoryRoutes);


app.listen(port, ()=>{
    console.log(`server started on port ${port}`)
})