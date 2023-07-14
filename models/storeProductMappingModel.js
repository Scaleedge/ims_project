const { DataTypes } = require("sequelize");
const { sequelize, user } = require(".");

module.exports = (sequelize, DataTypes) => {
    
    const StoreProductMapping = sequelize.define('store_products_mapping', {
    
        id: {
            type: DataTypes.BIGINT(20),
            allowNull: false,
            primaryKey: true,
            autoIncrement : true
        },
        itemId : {
            type : DataTypes.STRING(255),
            allowNull : false,
            unique : true
        },
        storeId : {
            type : DataTypes.STRING(255),
            allowNull : false,
        },
        mrp : {
            type : DataTypes.FLOAT(10,2),
            allowNull : false,
        },
        price : {
            type : DataTypes.FLOAT(10,2),
            allowNull : false,
        },
    
    })

    return StoreProductMapping
}