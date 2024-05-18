const express = require('express');
const app = express();
const mongoose = require('mongoose');

const Listing = require("./models/listing.js");
const path = require('path');
const MONGO_URL = "mongodb://127.0.0.1:27017/wonderlust";
const methodOverride = require("method-override");

const ejsMate = require("ejs-mate");
app.set("view engine","ejs");
app.set('views',path.join(__dirname,"views")); 
app.use(express.urlencoded({extended:true}));
app.engine('ejs',ejsMate);
app.use(methodOverride("_method"));

app.use(express.static(path.join(__dirname,"public")));
main()
.then(()=>{
    console.log('connected to DB');
})
.catch((err)=>{
    console.log(err);
})
async function main(){
    await mongoose.connect(MONGO_URL); 
}


// index route
app.get('/listings',async (req,res)=>{
   const allListings = await Listing.find({});
   res.render('listings/index.ejs',{allListings});

})


// new Route
app.get('/listings/new',(req,res)=>{
    res.render('listings/new.ejs')
 
})
// create Route
app.post("/listings",async(req,res)=>{

    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect('/listings');
    // let listing = req.body.listing;
    // console.log(listing);

}) 

// update Route
app.put("/listings/:id",async(req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listings/${id}`);
})
// show route

app.get('/listings/:id',async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render('listings/show.ejs',{listing});
})


// edit route

app.get('/listings/:id/edit',async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render('listings/edit.ejs',{listing});
})


// Delete Route
app.delete('/listings/:id',async (req,res)=>{
    let {id} = req.params;
    let DeleteListing = await Listing.findByIdAndDelete(id);
    console.log(DeleteListing);
    res.redirect('/listings')
})
// app.get('/testListing',async (req,res)=>{
//     let sampleListing = new Listing({
//         title:"My new Villa",
//         description:"by the beach",
//         price:1200,
//         location:"cangutta, Goa",
//         country:"India",
//     });
//     await sampleListing.save();
//     console.log("sample saved successfully");
//     res.send('successful testing');
// })
app.get('/',(req,res)=>{
    res.redirect('/listings');
})
app.listen(8080,()=>{
    console.log('server is listening to the port 8080');
})
