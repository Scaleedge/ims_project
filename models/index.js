
const dbConfig = require("../config/database");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
   dbConfig.dbName,
   dbConfig.user,
   dbConfig.password,
   {
      host: dbConfig.host,
      dialect: dbConfig.dialect
   }
);

sequelize.authenticate().then(() => {
   console.log('Connection has been established successfully.');
}).catch((error) => {
   console.error('Unable to connect to the database: ', error);
});

db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.products = require("./productModel")(sequelize, DataTypes)
db.productStock = require("./productStockModel")(sequelize, DataTypes)
db.user = require("./userModel")(sequelize, DataTypes)
db.store = require('./storeModel')(sequelize, DataTypes)
db.productRaise = require('./productRaiseModel')(sequelize, DataTypes)
db.stockInOut = require('./stockInOutModel')(sequelize, DataTypes)

db.sequelize.sync({ force: false })
   .then(() => {
      console.log("yes re-sync done")
   })

module.exports = db;
