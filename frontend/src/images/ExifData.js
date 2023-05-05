/**ExifData
 * Visual component to display exif data
 *
 * props:
 *  - image {image_data. url}
 *
 * state:none
 */
//TODO: create function to remove spaces
function ExifData ({image}){
  // console.log("inside ExifData");
  // console.log("image=", image);
  const imageData = image.image_data
  // console.log("imagedata=", imageData);

  return(
    <div className="ExifData">
      {Object.keys(imageData).map(k => ( imageData[k] &&
        <p key={k}><b>{k.split("_").join(" ")}</b>: {imageData[k]}</p>
      ) )}
    </div>
  )

}

export default ExifData;