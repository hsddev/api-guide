// Dependencies
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");

const Guest = require("../models/Guest");
const Table = require("../models/Table");

/*
 *   @Desc Add a guest to the gestlist
 *   @Route POST /guest_list/name
 *   @Access public
 */
const addGuest = asyncHandler(async (req, res, next) => {
    const { table, accompanying_guests } = req.body;

    const tables = await Table.findOne({ where: { id: table } });

    if (!tables) {
        return next(new ApiError(`No table with provided id ${table}`, 404));
    }

    if (tables.availableSeats < accompanying_guests + 1) {
        return next(
            new ApiError(
                `Table capacity is not sufficient for ${accompanying_guests} guests`,
                400
            )
        );
    }

    await Guest.create({
        name: req.params.name,
        table,
        accompanying_guests,
    });

    await Table.update(
        { availableSeats: tables.availableSeats - (accompanying_guests + 1) },
        { where: { id: table } }
    );

    res.status(200).json({ name: req.params.name });
});

/*
 *   @Desc Delete a guest from gestlist
 *   @Route DELETE /guests/name
 *   @Access public
 */
const deleteGuest = asyncHandler(async (req, res, next) => {
    const { name } = req.params;

    const guestToDelete = await Guest.findOne({ where: { name } });

    if (!guestToDelete) {
        return next(new ApiError(`Guest with name ${name} not found.`, 404));
    }

    const { table, accompanying_guests } = guestToDelete;

    await Guest.destroy({
        where: {
            name,
        },
    });

    const tableToUpdate = await Table.findOne({ where: { id: table } });

    if (!tableToUpdate) {
        return next(new ApiError(`Table with id ${table} not found.`, 404));
    }

    const updatedAvailableSeats =
        tableToUpdate.availableSeats + (accompanying_guests + 1);
    await Table.update(
        { availableSeats: updatedAvailableSeats },
        { where: { id: table } }
    );

    res.status(204).json({});
});

/*
 *   @Desc Get the guest list
 *   @Route GET /guest_list
 *   @Access public
 */
const getGuestList = asyncHandler(async (req, res, next) => {
    const guests = await Guest.findAll({
        attributes: ["name", "table", "accompanying_guests"],
    });

    res.status(200).json({ guestsList: guests });
});

/*
 *   @Desc Get arrived guests
 *   @Route GET /guests
 *   @Access public
 */
const getArrivedGuests = asyncHandler(async (req, res) => {
    const guests = await Guest.findAll({
        attributes: ["table", "name", "accompanying_guests", "time_arrived"],
    });

    if (!guests) {
        return next(new ApiError(`There is no guests arrived`, 404));
    }

    res.status(200).json({ guests: guests });
});

/*
 *   @Desc Update arrived guests list
 *   @Route PUT /guests/:name
 *   @Access public
 */
const updateArrivedGuests = asyncHandler(async (req, res, next) => {
    const { name } = req.params;
    const { accompanying_guests } = req.body;

    // Get the guest associated with the name provided
    const guest = await Guest.findOne({ name });

    if (!guest) {
        return next(new ApiError(`Guest with name ${name} not found.`, 404));
    }

    // Get the table associated to the guest
    const table = await Table.findOne({ id: guest.table });

    if (!table) {
        return next(
            new ApiError(`Table with id ${guest.table} not found.`, 404)
        );
    }

    // table.capacity == 6  |  accompanying_guests == 8
    // Check if there is seats available
    if (table.availableSeats < accompanying_guests) {
        return next(
            new ApiError(
                `Table capacity is not sufficient for ${accompanying_guests} guests`,
                400
            )
        );
    } else {
        // Update the guest
        await Guest.update({ accompanying_guests }, { where: { name } });

        // Update the table's capacity
        const updatedAvailableSeats =
            table.availableSeats - accompanying_guests;
        await Table.update(
            { availableSeats: updatedAvailableSeats },
            { where: { id: guest.table } }
        );
    }

    res.status(200).json({ name });
});

// Export module
module.exports = {
    addGuest,
    deleteGuest,
    getArrivedGuests,
    getGuestList,
    updateArrivedGuests,
};
