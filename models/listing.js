const mongoose = require('mongoose');

const Scheman=mongoose.Schema;


const listingSchema=new Scheman({
    title:{
        type:String,
        required:true,
    },
    description : {
        type:String,
    },  
       
    image: {
    filename: {
        type: String,
        default: "listingimage"
    },
    url: {
        type: String,
        default: "https://plus.unsplash.com/premium_photo-1772565796583-edcb448a9752?q=80&w=1186&auto=format&fit=crop"
    }
    },

    price: {
        type:Number,
    },
    location: {
        type:String,
    },
    country: {
        type:String,
    }
});  


const Listing = mongoose.model('Listing',listingSchema);

module.exports=Listing; 



