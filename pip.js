
function setPipButton(videoElement$, buttonElement$) {
  buttonElement$.disabled =
    videoElement$.readyState === 0 ||
    videoElement$.disablePictureInPicture;
}

async function togglePip(videoElement$) {
  try {
    if (document.pictureInPictureElement){
      await document.exitPictureInPicture();

    } else{
      await videoElement$.requestPictureInPicture();

    }
  } catch(error) {
    console.error(`> Error! ${error}`);
  } finally {}
};

const pipButton$ = document.querySelector('button#pipToggle');
const video$ = document.querySelector('video#video');

if ('pictureInPictureEnabled' in document) {
  setPipButton(video$, pipButton$);
  video$.addEventListener('loadedmetadata', setPipButton);
  video$.addEventListener('emptied', setPipButton);
  pipButton$.addEventListener('click', () => togglePip(video$));

} else {
  pipButton$.classList.add('hidden');
  pipButton$.hidden = true;

}


video$.addEventListener('leavepictureinpicture', () => {}, false);
video$.addEventListener('enterpictureinpicture', (event) => {
  // Video entered Picture-in-Picture mode.
  const pipWindow = event.pictureInPictureWindow;
  console.log(`Picture-in-Picture window width: ${pipWindow.width}`);
  console.log(`Picture-in-Picture window height: ${pipWindow.height}`);
});



navigator.mediaSession.setActionHandler('previoustrack', () => {});
