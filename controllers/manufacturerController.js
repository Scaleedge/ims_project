const db = require("../models")
const Manufacturer = db.manufacturer;


const addManufacturer = async (req, res) => {

    try {

        let info = {
            shortDescription,
            longDescription
        } = req.body

        const manufacturer = await Manufacturer.create(info)
    
        console.log(manufacturer)
        req.flash('message', 'Manufacturer added sucessfully');
        return res.redirect('/manufacturer')

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
    addManufacturer
}