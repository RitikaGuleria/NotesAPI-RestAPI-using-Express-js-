require("dotenv").config();
console.log("message",process.env.MONGO_URL);

const express = require("express");
const app = express() ;
//app object is a Server Application and we need to start this server application using app object bcz it will 
//receive req and has to serve.
//To serve request it has to define port no. bcz on that port no. request will come and it has to serve.

// dotenv.config();

const mongoose=require("mongoose");

const cors=require("cors");
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'),
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE'),
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// npm i -g cors
// app.use(cors(corsOptions));
// const quotes=require("./quotes.json");


//middleware
app.use((req,res,next)=>{
    console.log("HTTP Method - "+req.method+" , URL- "+ req.url);
    next();
});

const userRoute = require("./src/routes/userRoutes");
const noteRouter = require("./src/routes/noteRoutes");
app.use("/users",userRoute);
app.use("/note",noteRouter);



const PORT=process.env.PORT || 5000;


// mongoose.connect("mongodb+srv://admin:admin@cluster0.qkefgbg.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('Connected to MongoDB...'))
//     .catch(err => console.error('Could not connect to MongoDB...', err));

mongoose.connect(process.env.MONGO_URL + process.env.DB_NAME)
.then(()=>{
    app.listen(PORT,()=>{
        console.log("Server has started on PORT NO. "+PORT);
    });
})
.catch((error)=>{
    console.log(error);
})

// Database.connect(process.env.DB_URL + process.env.DB_NAME, {
//     useCreateIndex: true,
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: true,
// })



// const DB_OPTIONS = {
//     dbName: process.env.notes_db
// }

// const connectdb = ()=>{
//     // connecting with database
//     return mongoose.connect(process.env.MONGO_URL,DB_OPTIONS,()=>{
//         console.log("Database connected successfully on Port-"+PORT);
//     })
// }








app.get("/",(req,res)=>{
    res.send("Hello");
});

// app.get("/hi",(req,res)=>{
//     res.send("Hiiiii");
// })

// app.get("/quotes",(req,res)=>{
//     res.status(200).json(quotes);
// });

// app.get("/random",(req,res)=>{
//     let index = Math.floor(Math.random()*quotes.length);
//     let quote = quotes[index];
//     res.status(200).json(quote);
// })
