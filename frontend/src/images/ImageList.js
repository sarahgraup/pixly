import ImageCard from "./ImageCard";
import { Link } from "react-router-dom";
/**ImageList
 * Visual component to render list of ImageCards
 *
 * props:
 *  -imgUrls [url,...]
 */

function ImageList({ images }) {
  console.log("inside ImageList");
  console.log("imgUrls=", images);

  return (
    <div className="ImageList">
      {images.map(i => (
        <Link key={i.image_data.id} to={`/gallery/${i.image_data.id}`}>
          <ImageCard image={i} />
        </Link>))}
    </div>
  );

}

export default ImageList;