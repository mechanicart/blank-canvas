
const cameraButton$ = document.querySelector('button#cameraToggle');

cameraButton$.addEventListener('click', async () => {
  // const video= document.createElement('video');
  const video = document.querySelector('video#video');
  video.muted = true;
  video.srcObject = await navigator.mediaDevices.getUserMedia({ video: true });
  video.play();
  video.addEventListener('loadedmetadata', () => {
    video.requestPictureInPicture()
    .catch(console.error)
  });
});