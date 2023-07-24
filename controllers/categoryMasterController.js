const db = require("../models")
const Category = db.category;


const addCategory = async (req, res) => {

    try {

        let info = {
            shortDescription,
            longDescription
        } = req.body

        const category = await Category.create(info)
    
        console.log(category)
        req.flash('message', 'Category added sucessfully');
        return res.redirect('/category')

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
    addCategory
}