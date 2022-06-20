const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const Log = require("./log")
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Worker must have a name"],
        unique: true,
    },
    email: {
        type: String,
        required: false,
        unique: false,
    },
    phoneNumber: {
        type: String,
        required: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isSuper: {
        type: Boolean,
        default: false
    },
    logs: [
        {
            type: Schema.Types.ObjectId,
            ref: "Log"
        }
    ]
});

userSchema.post("findOneAndDelete", async function (user) {
    if (user.logs.length) {
        await Log.deleteMany({ _id: { $in: user.logs } })
    }
})

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

module.exports = User;


