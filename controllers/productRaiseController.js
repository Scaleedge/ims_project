const db = require("../models")
const ProductRaise = db.productRaise;


const addProductRaise = async (req,res) => {

    try {

        const info = {
            itemId : req.body.itemId,
            outletId : req.body.outletId,
            mrp : req.body.mrp,
            price : req.body.price
        }
         const addProductRaise = await ProductRaise.create(info) 

        req.flash('message', 'MRP and Price Added.');
        return res.redirect('/productRaise')
        
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
    addProductRaise
}