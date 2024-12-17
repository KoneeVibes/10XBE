const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ['Super Admin', 'Admin', 'Support', "User"],
    },
    status: {
        type: String,
        required: true,
        default: "active",
        enum: ["active", "inactive"]
    },
}, { timestamps: true });

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});

module.exports = mongoose.model("User", userSchema);
