const BACKGROUND_COLOR = '#262626'; 
const TEXT_COLOR = '#9f9f9f';
const CANVAS_WIDTH = 800; // px;
const ELLIPSIS = '…';

function fittingText(ctx, str, maxWidth,) {
  let text = str;

  let widthText = ctx.measureText(text).width;
  let lengthText = text.length;
  const widthEllipsis = ctx.measureText(ELLIPSIS).width;

  if (widthText <= maxWidth || widthText <= widthEllipsis) {
    return text;
  }

  while (widthText >= maxWidth - widthEllipsis && (lengthText -= 1) > 0) {
    text = text.substring(0, lengthText);
    widthText = ctx.measureText(text).width;
  }

  return text + ELLIPSIS;
}

function drawCanvasText (text) {
  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  if (!canvas) return;
  if (!ctx) return;

  ctx.beginPath();

  // Background draw
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = BACKGROUND_COLOR;
  ctx.fill();

  // Text draw
  ctx.fillStyle = TEXT_COLOR;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const fittedText = fittingText(ctx, text, CANVAS_WIDTH);
  ctx.font = `${fittedText.length <= 30 ? 80 : 40}px`;
  ctx.fillText(
    fittedText,
    canvas.width / 2,
    canvas.height / 2,
    canvas.width - 16,
  );
}

(function main(){
  drawCanvasText ('Hello world')
})()
