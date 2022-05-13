require("dotenv").config();
const express= require('express');
const cors=require("cors");
const db = require("./db");
const morgan=require('morgan');
const color=require('color');


const app=express();



app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use((req,res,next)=>{
    console.log("something");
    next();
})

//Get all restaurants
app.get("/api/v1/restaurants", async(req,res)=>{
    try{
        const result= await db.query("select * from restaurants");

    res.status(200).json({
        status:"success",
        resutls: result.rowCount,
        data: {
            restaurants:result.rows,
        },
    });
    }catch(err){
        console.log(err);
    }
    

});

//Get a Restaurant
app.get("/api/v1/restaurants/:id", async (req,res)=>{

    try{
        console.log(req.params);
        const result=await db.query("select * from restaurants where id= $1",[req.params.id]);
        console.log(result.rows);
        res.status(200).json({
            status:"succes",
            results: result.rowCount,
            data:{
                restaurant:result.rows[0],
            },
        });
    }catch(err){
        console.log(err);
    }
   
});

//Create a Restaurant
app.post("/api/v1/restaurants", async(req,res)=>{

    try{
        const results=await db.query("insert into restaurants(name,location,price_range) values($1,$2,$3) returning *",[req.body.name,req.body.location,req.body.price_range]);
        console.log(results);
        res.status(200).json({
            status:"succes",
            results: results.rowCount,
            data:{
                restaurants:results.rows,
            },
        });
    }catch(err){
        console.log(err);
    }

   
});

//Update restaurants
app.put("/api/v1/restaurants/:id", async(req,res)=>{
    
    
    try{
        const result= await db.query("update restaurants set name=$1, location=$2,price_range=$3 where id=$4 returning *",[req.body.name,req.body.location,req.body.price_range,req.params.id]);
        res.status(200).json({
            status:"succes",
            results:result.rowCount,
            data:{
                restaurants:result.rows,
            },
        });
        console.log(result.rows[0]);
    }catch(err){
        console.log(err);
    }
    
});

//Delete restaurant
app.delete("/api/v1/restaurants/:id",async (req,res)=>{
    try{
        const result=await db.query("delete from restaurants where id=$1",[req.params.id]);
        res.status(204).json({
            status:"succes",
        });
    }catch(err){
        console.log(err);
    }
});

const port=process.env.PORT || 3001;
app.listen(port,()=>{
    console.log(`server is up and running on port ${port}`);
});



