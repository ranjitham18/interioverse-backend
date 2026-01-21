//defines auth endpoints
//rotes only decides where request goes, logic is in controller



const router = require("express").Router();
const { login, signup, logout, me } = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth");


router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", logout);
router.get("/me", authMiddleware, me); //  MUST HAVE auth middleware

module.exports = router;


