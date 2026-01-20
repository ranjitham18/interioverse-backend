// admin only routes

/*const router = require("express").Router();
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
*/
const router = require("express").Router();

const auth = require("../middleware/auth.middleware");
const adminOnly = require("../middleware/admin.middleware");

const {
  getAllUsers,
  verifyUser,
  deleteUser
} = require("../controllers/admin.controller");

// 🔒 ADMIN-ONLY ROUTES
router.get("/users", auth, adminOnly, getAllUsers);
router.put("/verify/:id", auth, adminOnly, verifyUser);
router.delete("/delete/:id", auth, adminOnly, deleteUser);

module.exports = router;

