const mongoose = require("mongoose");
const Module = require("./Module"); // Import the Module model

const facultySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Faculty name is required"],
            trim: true,
            unique: true,
        },
        description: {
            type: String,
            required: [true, "Faculty description is required"],
            trim: true,
        },
        modules: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Module",
            },
        ],
    },
    { timestamps: true }
);

// Pre-delete hook to cascade delete modules
facultySchema.pre("deleteOne", { document: true, query: false }, async function (next) {
    try {
        // Delete all modules associated with this faculty
        await Module.deleteMany({ faculty: this._id });
        next();
    } catch (error) {
        next(error);
    }
});

const Faculty = mongoose.model("Faculty", facultySchema);
module.exports = Faculty;