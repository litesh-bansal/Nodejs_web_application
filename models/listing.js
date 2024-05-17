const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ListingSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
    Image:{
        type:String,
        default:"https://images.unsplash.com/photo-1578645510447-e20b4311e3ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fGNhbXBpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
        set:(v)=> v===""? "https://images.unsplash.com/photo-1578645510447-e20b4311e3ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fGNhbXBpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60":v
    },
    price:Number,
    location:String,
    country:String,
});

const Listing = mongoose.model("Listing",ListingSchema);
module.exports = Listing;
