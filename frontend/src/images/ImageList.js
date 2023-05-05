import ImageCard from "./ImageCard";
/**ImageList
 * Visual component to render list of ImageCards
 *
 * props:
 *  -imgUrls [url,...]
 */

function ImageList ({imgUrls}){
  console.log("inside ImageList");
  console.log("imgUrls=", imgUrls);
  
  return (
    <div className="ImageList">
    {imgUrls.map(u => (<ImageCard key={u.image_data.id} url={u.url} caption={u.image_data.caption}/>))}
    </div>
  )

}

export default ImageList;