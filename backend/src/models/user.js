const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            lowercase: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error("Email is invalid!");
                }
            },
        },
        gender: {
            type: String,
            trim: true,
            lowercase: true,
            validate(value) {
                if (
                    !(
                        validator.equals(value, "nam") ||
                        validator.equals(value, "nu") ||
                        validator.equals(value, "khac")
                    )
                ) {
                    throw new Error("Gender is invalid!");
                }
            },
        },
        phone: {
            type: String,
            trim: true,
            validate(value) {
                if (!validator.isNumeric(value)) {
                    throw new Error("Phone is invalid!");
                }
            },
        },
        birthday: {
            day: {
                type: Number,
                default: 0,
                validate(value) {
                    if (value < 0) {
                        throw new Error("Day must be a positive number");
                    }
                },
            },
            month: {
                type: Number,
                default: 0,
                validate(value) {
                    if (value < 0) {
                        throw new Error("Month must be a positive number");
                    }
                },
            },
            year: {
                type: Number,
                default: 0,
                validate(value) {
                    if (value < 0) {
                        throw new Error("Year must be a positive number");
                    }
                },
            },
        },

        password: {
            type: String,
            required: true,
            minlength: 7,
            trim: true,
            validate(value) {
                if (value.toLowerCase().includes("password")) {
                    throw new Error('Password cannot contain "password"');
                }
            },
        },
        tokens: [
            {
                token: {
                    type: String,
                    required: true,
                },
            },
        ],
        avatar: {
            type: Buffer,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);

    user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;
};

// overide toJSON method
userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    // delete private fields
    delete userObject.password;
    delete userObject.tokens;
    delete userObject.avatar;

    return userObject;
};

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error("Unable to login");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error("Unable to login");
    }

    return user;
};

// Hash the plain text password before save
userSchema.pre("save", async function (next) {
    const user = this;

    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
});

//Delete user tasks when user is removed
userSchema.pre("remove", async function (next) {
    const user = this;

    await Task.deleteMany({ owner: user._id });

    next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
