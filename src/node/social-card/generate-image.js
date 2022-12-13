const { createCanvas, loadImage } = require('canvas')
const { join } = require('path')

exports.generateImage = async (title) => {
  const canvas = createCanvas(1200, 600)
  const context = canvas.getContext('2d')
  context.fillStyle = '#0C102B'
  context.fillRect(0, 0, 1200, 600)
  context.font = '63pt Inter'
  context.textAlign = 'left'
  context.fillStyle = '#FFFFFF'
  showText(context, title, 63, 525, 1074, 92)
  await addImage(context, join('src', 'node', 'social-card', 'assets', 'fpjs.png'), 63, 64, 83, 87)
  return canvas.toBuffer('image/png')
}

function showText(context, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ')
  let currentLine = ''
  let currentY = y
  let linesWords = []
  let linesY = []

  words.forEach((word) => {
    const testLine = currentLine + word + ' '
    const { width: testWidth } = context.measureText(testLine)
    if (testWidth > maxWidth) {
      linesWords.push(currentLine)
      linesY.push(currentY)
      currentY -= lineHeight
      currentLine = word + ' '
    } else {
      currentLine = testLine
    }
  })
  linesWords.push(currentLine)
  linesY.push(currentY)

  linesY.forEach((lineY, index) => {
    context.fillText(linesWords[linesWords.length - index - 1], x, lineY)
  })
}

async function addImage(context, path, x, y, width, height) {
  const image = await loadImage(path)
  context.drawImage(image, x, y, width, height)
}
