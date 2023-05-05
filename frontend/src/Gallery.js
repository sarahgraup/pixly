import ImageList from "./images/ImageList";
import SearchForm from "./forms/SearchForm";
import "./Gallery.css";
/**
 * Component for Gallery page
 * 
 * UI displays image gallery
 * Props:
 *  - images: array [0:{image_data:..., url:...},1:{...}, ...]
 *  - handleSearch: parent function that sets search term state
 *  - currSearchTerm input search term
 * 
 * State: none
 * 
 * RoutesList -> Gallery -> { SearchForm, ImageList }
*/
function Gallery({images, handleSearch, currSearchTerm}){
    return(
        <div className="Gallery">
            <SearchForm handleSearch={handleSearch} currSearchTerm={currSearchTerm}/>
            <ImageList images={images}/>

        </div>     
    );
}
export default Gallery;