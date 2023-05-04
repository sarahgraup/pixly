/**ImageCard
 * Simple visual component displaying image
 *
 * props:
 *  - imgUrl = ["url"]
 */
//TODO: use Card class from bootsrap
//TODO: update props to take in data for alt
function ImageCard({id, url}){
  return (
    <div className="ImageCard">
      <img src={url} alt={id}></img>
    </div>
  )
}

export default ImageCard;