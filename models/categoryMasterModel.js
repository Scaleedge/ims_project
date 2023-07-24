const { DataTypes } = require("sequelize");
const { sequelize, user } = require(".");

module.exports = (sequelize, DataTypes) => {
    
    const Category = sequelize.define('category_master', {
        id: {
            type: DataTypes.BIGINT(20),
            allowNull: false,
            primaryKey: true,
            autoIncrement : true
        },
        shortDescription : {
            type : DataTypes.TEXT,
            
        },
        longDescription : {
            type : DataTypes.TEXT,
           
        },
    
    })

    return Category
}