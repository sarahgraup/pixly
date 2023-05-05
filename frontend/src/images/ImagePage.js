import { Navigate, useParams } from "react-router";
import ImageCard from "./ImageCard";
import ExifData from "./ExifData";

/**
 * Display component for image page
 * props
 *  - images [{image_data, url},...]
 */
function ImagePage({ images }) {
    console.log("inside ImagePage");
    console.log("images=", images)
    const { id } = useParams();
    console.log("id=", id);
    const image = images.find(img => +img.image_data.id === +id);
    if (!image){
        return <Navigate to="/gallery"/>
    }

    // const image = images.filter(img => +img.image_data.id === +id)[0];
    console.log("image=", image);
    return (
        <div className="ImagePage">
            <ImageCard image={image} />
            <ExifData image={image}/>
        </div>

    );

}
export default ImagePage;