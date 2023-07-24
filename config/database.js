const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    process.env.POSTGRES_DB,
    process.env.POSTGRES_USER,
    process.env.POSTGRES_PASSWORD,
    {
        host: "localhost",
        dialect: "postgres",
    }
);

//checking if connection is done
sequelize
    .sync({ logging: false, force: true })
    .catch((err) => console.log(err));

//exporting the module
module.exports = sequelize;
