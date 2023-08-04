const db = require("../models")
const Product = db.products
const Store = db.store
const ProductStock = db.productStock
// const ProductCategoryMapping = db.productCategoryMapping

// Create Product
const productCategoryMapping = async (req, res) => {

    try {

        // const store = await Store.findOne({ where: { outletId: req.body.outletId } })

        // const product = await Product.findOne({ where: { itemId: req.body.itemId} })
        const productStock = await ProductStock.findOne({ where: { itemId: req.body.itemId , outletId: req.body.outletId } })
        

        if (productStock) {
            const stockUpdated = await ProductStock.update({ Cat1: req.body.cat1, Cat2: req.body.cat2 }, { where: { itemId: req.body.itemId, outletId: req.body.outletId } })
        }
            console.log(123)
            const info = {
                itemId,
                outletId,
                stock,
                bufferStock,
                supplierName,
                mrp,
                salePrice,
                taxPercentage,
                itemReferenceCode,
                Cat1: req.body.cat1,
                Cat2: req.body.cat2,
                Cat3,
                Cat4,
                Cat5,
                Cat6,
                Cat7,
                Cat8,
                Cat9,
                Cat10,
                itemTimeStamp,
                appliesOnline,
                itemEANcode,
                hsnCode,
                packing,
                freeQty,
                purchasePrice,
                discountType,
                discount,
                others,
                recommended,
                variantName,
                shelf,
                specialPrice,
                costPriceWithoutTax,
                originalPrice,
                minSaleQuantity,
                pack,
                flatOffer,
                aliasCode
            } = req.body
    
            const addInProductStock = await ProductStock.create(info)
    
            console.log(addInProductStock)
            req.flash('message', 'Product added into productStock sucessfully');
        
       
        return res.redirect('/productCategoryMapping')
    }
    catch (err) {
        console.log(err.message)
        res.status(500).send({
            success: false,
            message: "something went wrong"
        })

    }

}


module.exports = {
    productCategoryMapping
}



