import ImageList from "./images/ImageList";
import SearchForm from "./forms/SearchForm";
function Gallery({images, handleSearch, currSearchTerm}){
    return(
        <div className="Gallery">
            <SearchForm handleSearch={handleSearch} currSearchTerm={currSearchTerm}/>
            <ImageList images={images}/>

        </div>
       
    );


}
export default Gallery;