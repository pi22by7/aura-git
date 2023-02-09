const mongoose =require("mongoose")
const express =require("express")
const authRoute=require("./routes/authRoutes")
const app=express()
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
const bodyParser=require("body-parser")
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');

require('dotenv').config()
mongoose.set("strictQuery", false);

mongoose.connect(process.env.DB,{
    useNewUrlParser:true,
    // useUnifiedTopology:true,
    // useCreateIndex:true
}).then(()=>{
    console.log("Connected to Database")
}).catch((e)=>{
    console.log("Unable to connect to Database")
    console.log(e)
})

// Route Middlewares
app.use("/auth/user",authRoute)

// middlewares
app.use(bodyParser.json())
app.use(express.json())
app.use(cookieParser());


app.get('*', checkUser);
app.use(authRoutes);
const port = 8080
app.listen(port,()=>{
    console.log(`Server Up and running @${port}`)
})
