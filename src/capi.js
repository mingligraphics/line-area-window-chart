// docs: https://github.dowjones.net/newsroom-innovation/capi-generator
const { CapiGenerator, Image } = require('capi-generator');

module.exports = async function () {
  const cg = new CapiGenerator();

  const image = new Image({
    photoUrl: 'https://www.wsj.com/ai2html/9243e1b7-b1a3-4941-98ac-f517d3566662/fallback_app.jpg',
    width: 600,
    height: 1358,
    alternate_text: '',
    credit: '',
    caption: '',
  });
  cg.addToBody(image);

  return cg;
};