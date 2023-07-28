const db = require("../models")
const Product = db.products
const ProductCategoryMapping = db.productCategoryMapping

// Create Product
const productCategoryMapping = async (req, res) => {
   
    try {
        const addedProduct = await Product.findOne({ where: { id: req.body.itemId } })
      
        if (!addedProduct) {
            return res.status(200).json({
                status: false,
                message: 'Product Not Found'
            })
        }
        const info = {
            itemId : req.body.itemId,
            cat1 : req.body.cat1,
            cat2 : req.body.cat2
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



