export const createVideoThumbnail = (url) => {
  const video = document.createElement("video");

  video.src = url;

  const canvas = document.createElement("canvas");
  canvas.width = 360;
  canvas.height = 240;

  video.addEventListener("loadedmetadata", function () {
    setTimeout(() => draw(video, canvas), 500);
  });

  video.currentTime = 0;
  video.load();

  function draw(video, canvas) {
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);

    console.log(canvas.toDataURL());

    return canvas.toDataURL();
  }
};
