import "./ImageCard.css";
/**ImageCard
 * Simple visual component displaying image
 *
 * props:
 *  - image = {img_data, url}
 * 
 * state: none
 * 
 * { ImageList, ImagePage }->ImageCard
 */
//TODO: use Card class from bootsrap
//TODO: update props to take in data for alt
function ImageCard({ image }) {
  // console.log("Inside ImageCard");
  // console.log("image=", image);
  const imageData = image.image_data;
  // console.log("imgdata", imageData);

  return (
    <div className="ImageCard">
      <img src={image.url} alt={imageData.caption}></img>
    </div>
  )
}

export default ImageCard;