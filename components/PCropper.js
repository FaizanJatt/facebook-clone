import React, { useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import Modal from "react-modal";

const CCropper = ({ src, getImg, closeModal }) => {
  const cropperRef = useRef(null);

  const onCrop = () => {};
  const getCroppedImg = () => {
    ("entering");
    const imageElement = cropperRef.current;
    const cropper = imageElement.cropper;

    getImg(cropper.getCroppedCanvas().toDataURL());
    closeModal();
  };

  return (
    <>
      <Cropper
        src={src}
        style={{ height: "100%", width: "100%" }}
        AspectRatio={1}
        // minContainerWidth={400}
        minCropBoxWidth={150}
        minCropBoxHeight={150}
        responsive={true}
        guides={false}
        crop={onCrop}
        ref={cropperRef}
      />
      <button onClick={getCroppedImg}>Crop</button>
    </>
  );
};

export default CCropper;
