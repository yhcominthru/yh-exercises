import images from "./data/images.js";
import { useState, useEffect } from "react";

function ImageGallery() {
  const [imageId, setImageId] = useState(1);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        console.log("Trying to -1 on ID");
        setImageId((prev) => prev - 1);
      }

      if (e.key === "ArrowRight") {
        console.log("Trying to +1 on ID");
        setImageId((prev) => prev + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <div>
        {images.map(
          (image) =>
            image.id === imageId && (
              <div key={image.id}>
                <h3>{image.name}</h3>
                <img src={image.image} alt={image.name} />
              </div>
            ),
        )}
        ;
      </div>
    </>
  );
}

export default ImageGallery;
