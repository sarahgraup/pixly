import ImageList from "./images/ImageList";
function Gallery({images, handleSearch}){
    return(
        <div className="Gallery">
            <ImageList images={images}/>

        </div>
       
    );


}
export default Gallery;