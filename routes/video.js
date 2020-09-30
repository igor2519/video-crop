const router = require("express").Router();
const videoController = require("../controllers/VideoController");

router.post("/video", videoController.cropVideo);

// you can use express static files to serve uploaded video
router.get("/uploads/:imageName", videoController.getVideo);
router.get("", function (req, res) {
  res.send({ message: "test api", version: "1.1", success: true });
});

module.exports = router;
