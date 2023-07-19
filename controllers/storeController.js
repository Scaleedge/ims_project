const db = require("../models")
const Store = db.store;


const createStore = async (req, res) => {

    try {

        let info = {
            outletId,
            storeName,
            storeAddress
        } = req.body

        const store = await Store.create(info)
        req.flash('message', 'Store added sucessfully');
        return res.redirect('/storeMaster')

    }

    catch (err) {
        res.status(500).send({
            success: false,
            message: "something went wrong"
        })
        console.log(err)
    }

}

// Get All Store Details
const getAllStoreDetails = async (req, res) => {
    const stores = await Store.findAll()
    res.status(200).send({
        success: true,
        stores
    })
}



module.exports = {
    createStore,
    getAllStoreDetails
}