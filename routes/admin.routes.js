// admin only routes

const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const {
  getAllUsers,
  verifyUser,
  deleteUser
} = require("../controllers/admin.controller");

router.get("/users", auth, getAllUsers);
router.put("/verify/:id", auth, verifyUser);
router.delete("/delete/:id", auth, deleteUser);

module.exports = router;

