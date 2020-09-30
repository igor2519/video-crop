const videoService = require("../services/videoService");
var Indexpath = require("path");
const uploadingPath = Indexpath.dirname(require.main.filename);
exports.cropVideo = async (req, res) => {
  try {
    if (videoService.validateFormat(req.files.video)) {
      let videoMetadata = await videoService.getResolution(
        req.files.video.path
      );
      let path = await videoService.cropFile(
        req.files.video,
        videoMetadata.width,
        videoMetadata.height
      );
      return res.status(200).send({
        success: true,
        croppedVideoUrl: `http://${process.env.HOST_NAME}:${process.env.PORT}${path}`,
      });
    }
  } catch (error) {
    return res.status(400).send({ success: false, message: error.message });
  }
};
exports.getVideo = async (req, res) => {
  try {
    return res
      .status(200)
      .sendFile(uploadingPath + "/uploads/" + req.params.imageName);
  } catch (error) {
    console.log(error.message);
    return res
      .status(400)
      .send({ success: false, message: "Something went wrong" });
  }
};
