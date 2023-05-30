const jimp = require('jimp')

const avatarOptimazation = async (path) => {
  const image = await jimp.read(path);
  image.resize(250, 250);
  await image.writeAsync(path);
}

module.exports = avatarOptimazation