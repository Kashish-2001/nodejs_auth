// A random post api to test the protected route using jwt

const router = require("express").Router();
const verify = require("../verifyToken");
router.get("/", verify, (req, res) => {
  res.json({
    post: {
      user_details: req.user,
      description: "random data you shoudn't access without logging in",
    },
  });
});

module.exports = router;
