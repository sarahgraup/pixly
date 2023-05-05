import { Link } from "react-router-dom";
/**ImageCard
 * Simple visual component displaying image
 *
 * props:
 *  - imgUrl = ["url"]
 */
//TODO: use Card class from bootsrap
//TODO: update props to take in data for alt
function ImageCard({ id, url, caption }) {
  return (
    <div className="ImageCard">
      <Link to={`/gallery/${id}`}>
        <img src={url} alt={id}></img>
        <p>{caption}</p>
      </Link>
    </div>
  )
}

export default ImageCard;