const Child_process = require("child_process");
var Indexpath = require("path");

const uploadingPath = Indexpath.dirname(require.main.filename);

exports.ensureFormat = function (video) {
  if (
    (video.type !== "video/mp4" && video.type !== "video/x-msvideo") ||
    video.size > process.env.MAX_VIDEO_SIZE
  ) {
    throw { message: "Invalid format or size" };
  }
};

exports.cropFile = async (video, width, height) => {
  try {
    const size = Math.max(width, height);

    const path = "/uploads/" + Date.now().toString() + video.name;
    Child_process.execSync(
      `ffmpeg -i ${
        video.path
      } -s ${width}x${height} -vf crop=${size}:${size},setdar=1:1,setsar=1:1 ${
        uploadingPath + path
      }`
    );
    return path;
  } catch (error) {
    throw { message: "Something went wrong" };
  }
};

exports.getResolution = async (path) => {
  const cliResult = Child_process.execSync(
    "ffprobe -v quiet -print_format json -show_format -show_streams " + path
  );
  result = JSON.parse(cliResult.toString());
  return result.streams[0];
};
