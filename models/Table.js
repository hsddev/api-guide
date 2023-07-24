// Dependencies
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Table = sequelize.define(
    "Table",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
        },
        capacity: {
            type: DataTypes.INTEGER,
            required: true,
            allowNull: false,
            validate: {
                min: 0,
                max: 10,
            },
            defaultValue: 10,
        },
        availableSeats: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 10,
        },
    },
    { timestamps: true }
);

module.exports = Table;
