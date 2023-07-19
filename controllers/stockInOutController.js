const db = require("../models")
const StockInOut = db.stockInOut
const ProductStock = db.productStock


const stockInOut = async (req, res) => {

    try {

        const info = {
            itemId: req.body.itemId,
            outletId: req.body.outletId,
            type: req.body.type,
            qty: req.body.qty,
            remarks: req.body.remarks
        }


        const productStock = await ProductStock.findOne({ where: { itemId: req.body.itemId  }})
       

        if(!productStock) {
            res.status(500).send({
                success: false,
                message: "ProductStock is not found"
            })
        }

        if (req.body.inOutFlag == "in") {

            const addproductStock = await ProductStock.update( { freeQty : productStock.freeQty + 1 }, {where : {itemId : req.body.itemId}} )
            
        }

        const removeProductStock = await ProductStock.update({ freeQty : productStock.freeQty - 1 }, {where : {itemId : req.body.itemId}})
        

        const stockInOut = await StockInOut.create(info)
        req.flash('message', 'Stock added sucessfully');
        return res.redirect('/stockInOut')

    }

    catch (err) {
        res.status(500).send({
            success: false,
            // message: "something went wrong",
            message: err.message

        })
        console.log(err)
    }

}
module.exports = {
    stockInOut
}