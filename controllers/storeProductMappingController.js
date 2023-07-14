const db = require("../models")
const StoreProductMapping = db.storeProductMapping;
const Store = db.store
const Product = db.products


const addStoreProductMapping = async (req,res) => {

    try {
        const info = {
            itemId : req.body.itemId,
            storeId : req.body.storeId,
            mrp : req.body.mrp,
            price : req.body.price
        } 
        
        const storeProductMap = await StoreProductMapping.create(info) 

        req.flash('message', 'MRP and Price Added.');
        return res.redirect('/dashboard')
        
    }

    catch (err){
        res.status(500).send({
            success: false,
            message: "something went wrong"
        })
        console.log(err)
    }

}





module.exports = {
   addStoreProductMapping
}