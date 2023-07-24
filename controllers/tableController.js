// Dependencies
const asyncHandler = require("express-async-handler");

const Table = require("../models/Table");

/*
 *   @Desc Add table
 *   @Route POST /tables
 *   @Access public
 */
const addTable = asyncHandler(async (req, res) => {
    const { id, capacity } = req.body;

    const table = await Table.create({ id, capacity });

    res.status(201).json(table);
});

/*
 *   @Desc Get all tables
 *   @Route GET /tables
 *   @Access public
 */
const getAllTables = asyncHandler(async (req, res) => {
    const tables = await Table.findAll({});

    res.status(200).json(tables);
});

/*
 *   @Desc Count number of empty seats
 *   @Route GET /seats_empty
 *   @Access public
 */
const countEmptySeat = asyncHandler(async (req, res) => {
    const tables = await Table.findAll({
        attributes: ["availableSeats"],
    });

    console.log(tables);
    const availableSeat = tables
        .map((table) => table.availableSeats)
        .reduce((a, b) => {
            return a + b;
        }, 0);

    res.status(200).json({ seats_empty: availableSeat });
});

// Export module
module.exports = { addTable, getAllTables, countEmptySeat };
