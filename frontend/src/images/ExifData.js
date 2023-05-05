/**ExifData
 * Visual component to display exif data
 *
 * props:
 *  - image
 */
//TODO: create function to remove spaces
function ExifData ({image}){
  console.log("inside ExifData");
  console.log("image=", image);
  const imageData = image.image_data
  console.log("imagedata=", imageData);


  return(
    <div className="ExifData">
      {Object.keys(imageData).map(key => (
        <p><b>{key.split("_").join(" ")}</b>: {imageData[key]}</p>
      ) )}
    </div>
  )

}

export default ExifData;