const db = require("../models")
const ProductStock = db.productStock

// Add Category product and store wise and create productAtock

const productCategoryMapping = async (req, res) => {

    try {

        if(req.body.store_selection == 'applied_to_all'){
            const sameCategoryForAllStore = await ProductStock.update({ Cat1: req.body.cat1, Cat2: req.body.cat2 }, { where: { itemId: req.body.itemId } })
        }

        const productStock = await ProductStock.findOne({ where: { itemId: req.body.itemId, outletId: req.body.outletId } })

        if (productStock) {
            await ProductStock.update({ Cat1: req.body.cat1, Cat2: req.body.cat2 }, { where: { itemId: req.body.itemId, outletId: req.body.outletId } })
        }
        else {
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
                Cat1,
                Cat2,
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

            req.flash('message', 'Product added into productStock sucessfully');
        }
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



