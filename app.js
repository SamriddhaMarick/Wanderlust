const express=require('express');
const app=express();
const mongoose=require('mongoose'); 
const Listing = require('./models/listing.js');
const path=require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");




const MONGO_URL='mongodb://127.0.0.1:27017/wanderlust';

main().then(()=>{
    console.log("Connected to MongoDB");
}).catch((err)=>{
    console.error("Error connecting to MongoDB:");
    console.error(err);
});


async function main()   {
    await mongoose.connect(MONGO_URL);
}    




app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname,"public")));



app.get("/",(req,res) => {
    res.send("Hi i am root!");
});
app.listen(8080,()=>{
    console.log('Server is running on port 8080');
});




// index route
app.get("/listings", async (req,res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings});
})
 
// new route

app.get("/listings/new", (req,res) => {
    res.render("listings/new.ejs");
});


// show route
app.get("/listings/:id", async (req,res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs",{listing}); 
});


// create route
app.post("/listings", async (req,res) => {
    const newlisting = new Listing(req.body.listing);
    await newlisting.save();
    res.redirect("/listings");
});


// edit  route
app.get("/listings/:id/edit", async (req,res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
});


// update route
app.put("/listings/:id", async (req,res) => {
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect("/listings");
});


//delete route

app.delete("/listings/:id", async (req,res) => {
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
});

// app.get("/testListing", async (req, res) => {
//     let sampleListing = new Listing({
//         title: "My new mountain",
//         description: "by the volcano!",
//         price: 1000,
//         location: "Hawaii",
//         country: "USA",
//     }) 
    

//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("successful testing");
// });     





// Listing.deleteMany({}).then(()=>{
//     console.log("All listings deleted");
// }).catch((err)=>{
//     console.error("Error deleting listings:");
//     console.error(err);
// });
