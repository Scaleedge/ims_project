const { DataTypes } = require("sequelize");
const { sequelize, user } = require(".");

module.exports = (sequelize, DataTypes) => {
    
    const StockInOut = sequelize.define('stock_ledger', {
        id: {
            type: DataTypes.BIGINT(20),
            allowNull: false,
            primaryKey: true,
            autoIncrement : true
        },
        itemId : {
            type : DataTypes.STRING(255),
        },
        outletId : {
            type : DataTypes.STRING(255),
        },
        type : {
            type : DataTypes.STRING,
            defaultValue : "in"
        },
        qty : {
            type : DataTypes.STRING,
        },
        remarks : {
            type : DataTypes.STRING,
        },
    
    })

    return StockInOut
}