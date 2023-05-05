import ImageCard from "./ImageCard";
/**ImageList
 * Visual component to render list of ImageCards
 *
 * props:
 *  -imgUrls [url,...]
 */

function ImageList ({images}){
  console.log("inside ImageList");
  console.log("imgUrls=", images);
  
  return (
    <div className="ImageList">
    {images.map(u => (<ImageCard key={u.image_data.id} url={u.url} caption={u.image_data.caption}/>))}
    </div>
  )

}

export default ImageList;