const db = require("../models")
const ProductRaise = db.productRaise;
const ProductStock = db.productStock;



const addProductRaise = async (req,res) => {

    try {

        const productStock = await ProductStock.findOne({ where: { itemId: req.body.itemId  }})
       

        if(!productStock) {
            res.status(500).send({
                success: false,
                message: "ProductStock is not found"
            })
        }

        const addMrpPriceInStock = await ProductStock.update( { mrp : req.body.mrp, salePrice : req.body.price }, {where : {itemId : req.body.itemId}} )


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