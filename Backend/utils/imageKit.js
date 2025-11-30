// imageKit.js
import ImageKit from "imagekit";

const initImageKit = function () {
  var imagekit = new ImageKit({
    publicKey: "public_bejh3MK0Sa4+/NI9wmdBfERbyYU=",
    privateKey: "private_6rvTsbRGR7xnYrmZtFpud23XBk0=",
    urlEndpoint: "https://ik.imagekit.io/lwjnzkd41/",
  });

  return imagekit;
};

export { initImageKit };  
