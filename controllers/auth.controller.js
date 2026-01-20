

const jwt = require("jsonwebtoken");
const User = require("../models/User");

const generateProfileId = (name, role, mongoId) => {
 
  const roleMap = {
    user: "USR",
    designer: "DES",
    agent: "AGN"
  };

  const initials = name
    .split(" ")
    .map(w => w[0])
    .join("")
    .toUpperCase();

  const shortId = mongoId.slice(-4).toUpperCase();

  return `${roleMap[role] || "USR"}${initials}${shortId}`;
};



const login = async (req, res) => {
  const { role, password } = req.body;

  if (!role || !password) {
    return res.status(400).json({ message: "Role and password required" });
  }

  if (role === "admin") {
    if (password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ message: "Invalid admin password" });
    }
  } else if (role === "user") {
    if (password !== process.env.USER_PASSWORD) {
      return res.status(401).json({ message: "Invalid user password" });
    }
  } else {
    return res.status(400).json({ message: "Invalid role" });
  }

  const token = jwt.sign({ role }, process.env.JWT_SECRET, {
    expiresIn: "1d"
  });

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "none", 
    secure: true
  });

  res.json({ role });
};


const me = (req, res) => {
  
  res.json({
    role: req.user.role
  });
};

const logout = (req, res) => {
  res.clearCookie("token", {
  secure: true,
  sameSite: "none",
});
  res.json({ message: "Logged out" });
};


const signup = async (req, res) => {
  console.log("SIGNUP BODY 👉", req.body);

  try {
    const {
      name,
      email,
      phone,
      role,          
      address,
      pincode,
      location,
      instagram,
      linkedin,
      referral,
      specialization,
      experience,
      projectVolume,
      registeredName,
      tagline
    } = req.body;

    
    if (!name || !email || !phone || !role) {
      return res.status(400).json({
        message: "Name, Email, Phone and Role are required"
      });
    }

    
    const allowedRoles = ["designer", "agent", "user"];
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({
        message: "Invalid role"
      });
    }

    
   
   const existingUser = await User.findOne({
  $or: [{ email }, { phone }]
});

if (existingUser) {
  return res.status(400).json({
    message:
      existingUser.email === email
        ? "Email already registered"
        : "Phone number already registered"
  });
}



      
const user = new User({
  name,
  email,
  phone,
  role,
  address,
  pincode,
  location,
  instagram,
  linkedin,
  referral,
  specialization,
  experience,
  projectVolume,
  registeredName,
  tagline,
  verified: false
});

await user.save();


user.profileId = generateProfileId(
  user.name,
  user.role,
  user._id.toString()
);


await user.save();


    return res.status(201).json({
      message: "Signup successful"
    });

  } catch (err) {
    console.error("SIGNUP ERROR:", err);
    return res.status(500).json({
      message: "Signup failed"
    });
  }
};


module.exports = {
login, 
signup,
logout, 
me
};