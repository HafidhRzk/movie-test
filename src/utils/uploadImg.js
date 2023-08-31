const fs = require("fs");
const crypto = require("crypto");
const path = require("path");

const appRoot = path.resolve("./");

const uploadImage = async (image) => {
  const pic = image;

  const base64Data = pic.replace(
    /^data:image(?:\/jpeg;base64,|\/webp;base64,|\/png;base64,)/,
    ""
  );

  // generate random name
  const randomStr = crypto.randomBytes(10).toString("hex");
  const time = new Date().getTime();
  const randomName = `${randomStr}_${time}`;

  const filename = `${randomName}.jpeg`;
  const directory = `${appRoot}/uploads/${filename}`;
  const imgPath = process.env.PATH_FILE ? process.env.PATH_FILE + `${filename}` : directory;

  const isUploadSuccess = await fs.promises
    .writeFile(directory, base64Data, "base64")
    .then((res) => {
      return { status: true, msg: "Success" };
    })
    .catch((e) => {
      return { status: false, msg: e.message };
    });

  if (!isUploadSuccess.status) throw new Error(isUploadSuccess.msg);

  return imgPath;
};

module.exports = uploadImage;
