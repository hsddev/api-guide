// Dependencies
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Guest = sequelize.define(
    "Guest",
    {
        table: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        accompanying_guests: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        time_arrived: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.NOW,
        },
    },
    { timestamps: true }
);

// Export Module
module.exports = Guest;
