const express=require('express');
const app=express();
// const status=
// app.listen(5000, console.log("Server is running on Port: ", 5000));



app.use((req, res, next) => {
    res.status(404).send("Route Does not exist: ");
  });
  

  app.use("/", ()=>{
    console.log("Hello world");
  });