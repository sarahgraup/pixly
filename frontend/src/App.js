import './App.css';
import React, { useState, useEffect } from "react"
import PixlyApi from './api';
import UploadImageForm from './forms/UploadImageForm';

/**Pixly application
 * 
 * State:
 * - isLoading boolean
 * - images array of image urls
 * - currSearchTerm string
 * 
 * Props:
 * - none
 * 
 * App -> { RoutesList, NavBar }
 */
function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [imagesUrls, setImagesUrls] = useState(null);
  const [currSearchTerm, setCurrSearchTerm] = useState(null);
  const [uploadImage, setUploadImage] = useState(null);


  useEffect(function loadImageUrls() {
    async function fetchUrls() {
      setIsLoading(true);
      try {
        if (currSearchTerm !== null) {
          const urls = PixlyApi.getImagesUrlsOptionalSearch(currSearchTerm);
          setImagesUrls(urls);

        }
        if (currSearchTerm === null) {
          const urls = PixlyApi.getImagesUrlsOptionalSearch();
          setImagesUrls(urls);

        }


      } catch (err) {
        console.error("fetchUrls problem fetching", err);

      }
      setIsLoading(false);
    }
  }, [imagesUrls, currSearchTerm]);

  async function handleUpload(formData) {
    try {
      const newImage = await PixlyApi.addNewImage(formData);
      setUploadImage(newImage);
    } catch (err) {
      console.error(err);
    }
  }




  return (
    <div className="App">
      <UploadImageForm handleUpload={handleUpload}></UploadImageForm>

    </div>
  );
}

export default App;
