const db = require("../models")
// const Product = db.products
const ProductStock = db.productStock
const ProductCategoryMapping = db.productCategoryMapping

// Create Product
const productCategoryMapping = async (req, res) => {

    try {
        const productStock = await ProductStock.findOne({ where: { itemId: req.body.itemId } })

        if (!productStock) {
            return res.status(200).json({
                status: false,
                message: 'Product Stock Not Found'
            })
        }
        console.log(req.body.itemId)

        const stockUpdated = await ProductStock.update({ Cat1: req.body.cat1, Cat2: req.body.cat2 }, { where: { itemId: req.body.itemId } })

        console.log(stockUpdated)

        const info = {
            itemId: req.body.itemId,
            cat1: req.body.cat1,
            cat2: req.body.cat2
        }

        const productAndCategory = await ProductCategoryMapping.create(info)

        console.log(productAndCategory)
        return res.status(200).send({
            message: "product and category added sucessfully",
            productAndCategory
        })
    }
    catch (err) {
        res.status(500).send({
            success: false,
            message: "something went wrong"
        })
        console.log(err)
    }

}


module.exports = {
    productCategoryMapping
}



