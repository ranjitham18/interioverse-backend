// mongoDB schema  + model(DB blueprint)
// defines how user data looks in DB

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    profileId: { type: String, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },

    
    role: { type: String, required: true },

    address: String,
    pincode: String,
    location: String,

    instagram: String,
    linkedin: String,
    referral: String,
    specialization: String,
    experience: String,
    projectVolume: String,
    registeredName: String,
    tagline: String,

    verified: { type: Boolean, default: false }
  },
  { timestamps: true }
);


module.exports = mongoose.model("User", userSchema);
