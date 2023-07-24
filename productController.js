const db = require("../models")
const Product = db.products
var fs = require('fs');

// Create Product
const createProduct = async (req, res) => {

    try {
        if (req.file) {
            var tmp_path = req.file.path;
            req.body.newFileName = `${new Date().getTime()}_${req.file.originalname}`
            /** The original name of the uploaded file
                stored in the variable "originalname". **/
            var target_path = `public/uploads/${req.body.newFileName}`;

            /** A better way to copy the uploaded file. **/
            var src = fs.createReadStream(tmp_path);
            var dest = fs.createWriteStream(target_path);
            src.pipe(dest);
            src.on('end', function () { });
            src.on('error', function (err) { });
        }

        let info = {
            externalitemId: req.body.externalitemId,
            itemName: req.body.itemName,
            shortName: req.body.shortName,
            length: req.body.length,
            breadth: req.body.breadth,
            height: req.body.height,
            weight: req.body.weight,
            width: req.body.width,
            box: req.body.box,
            rack: req.body.rack,
            foodType: req.body.foodType,
            taxId: req.body.taxId,
            imageUrl: req.body.newFileName,
            decimalsAllowed: req.body.decimalsAllowed,
            status: req.body.status,
            itemProductTaxType: req.body.itemProductTaxType,
            fulfilmentMode: req.body.fulfilmentMode,
            isReturnable: req.body.isReturnable,
            isCancellable: req.body.isCancellable,
            returnPeriod: req.body.returnPeriod,
            description: req.body.description,
            detailedDescription: req.body.detailedDescription,
            weightGrams: req.body.weightGrams,
            appliesOnline: req.body.appliesOnline,
            itemProductType: req.body.itemProductType,
            itemTaxType: req.body.itemTaxType,
            iBarU: req.body.iBarU,
            manufacturer: req.body.manufacturer,
            pageN: req.body.pageN,
            isDeleted: req.body.isDeleted
        }

        const product = await Product.create(info)
        res.send(product)
        req.flash('message', 'Product Sucessfully Created.');
        return res.redirect('/product')
    }
    catch (err) {
        console.log(err)
        res.status(500).send({
            success: false,
            message: err.message
        })
    }
}


// Get All Product Details
const getAllProduct = async (req, res) => {
    const products = await Product.findAll()
    res.status(200).send({
        success: true,
        products
    })
}

// Get Single Product Details
const getSingleProduct = async (req, res) => {
    const product = await Product.findOne({ where: { id: req.params.id } })
    if (!product) {
        res.status(200).send({
            success: false,
            message: "Product Not Found"
        })
    }
    res.status(200).send({
        success: true,
        product
    })
}

// Update Product Details
const updateProduct = async (req, res) => {
    const product = await Product.update(req.body, { where: { id: req.params.id } })
    if (!product) {
        res.status(200).send({
            success: false,
            message: "Product Not Found"
        })
    }
    res.status(200).send({
        message: "Details updated sucessfully"
    })
}

// Delete Product Details
const deleteProduct = async (req, res) => {
    const product = await Product.destroy({ where: { id: req.params.id } })
    if (!product) {
        res.status(200).send({
            success: false,
            message: "Product Not Found"
        })
    }
    res.status(200).send({
        message: "Product Deleted Sucessfully"
    })
}




module.exports = {
    createProduct,
    getAllProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct
}