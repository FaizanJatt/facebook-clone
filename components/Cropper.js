import React, { useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

const CCropper = ({ src, getImg, closeModal }) => {
  const cropperRef = useRef(null);

  const onCrop = () => {};
  const getCroppedImg = () => {
    const imageElement = cropperRef.current;
    const cropper = imageElement.cropper;
    getImg(cropper.getCroppedCanvas().toDataURL());
    closeModal();
  };

  return (
    <>
      <Cropper
        src={src}
        style={{ height: 400, width: "100%" }}
        AspectRatio={16 / 9}
        minCropBoxWidth={400}
        minCropBoxHeight={300}
        guides={false}
        crop={onCrop}
        ref={cropperRef}
      />
      <button onClick={getCroppedImg}>Crop</button>
    </>
  );
};

export default CCropper;
