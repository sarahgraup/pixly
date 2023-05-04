import './App.css';
import React, { useState, useEffect } from "react"
import PixlyApi from './api';
import UploadImageForm from './forms/UploadImageForm';
import axios from "axios";

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
    console.log("inside handleUpload");
    const {file, caption} = formData;
    console.log("file", file, "caption", caption);
    const data = new FormData();

    data.append('file', file);
    data.append('caption', caption);
    console.log("data=", data);
    try {
      const newImage = await PixlyApi.addNewImage(data);
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
