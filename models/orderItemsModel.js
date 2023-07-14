const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const OrderItems = sequelize.define('orderItems', {
        order_item_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true
        },
        orderid: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        rowNo: {
            type: DataTypes.STRING(250),
        },
        id : {
            type : DataTypes.STRING(250),
        },
        itemId : {
            type : DataTypes.STRING(250)
        },
        itemName : {
            type : DataTypes.STRING(250)
        },
        itemReferenceCode : {
            type : DataTypes.STRING(250)
        },
        salePrice : {
            type : DataTypes.STRING(250)
        },
        quantity : {
            type : DataTypes.STRING(250)
        },
        suppliedQty : {
            type : DataTypes.STRING(250)
        },
        itemAmount : {
            type : DataTypes.STRING(250)
        },
        iBarU : {
            type : DataTypes.STRING(255)
        },
        taxPercentage : {
            type : DataTypes.STRING(250)
        },
        itemTaxType : {
            type : DataTypes.STRING(250)
        },
        discountPercentage : {
            type : DataTypes.STRING(250)
        },
        itemRemarks : {
            type : DataTypes.STRING(250)
        },
        itemMarketPrice : {
            type : DataTypes.STRING(250)
        },
        freeQty : {
            type : DataTypes.STRING(250)
        },
        orderPK : {
            type : DataTypes.STRING(250)
        },
        aggregatorPaid : {
            type : DataTypes.STRING(250)
        },
        created_at : {
            type : DataTypes.DATE
        },
        updated_at : {
            type : DataTypes.DATE
        },
    })

    return OrderItems
}





























