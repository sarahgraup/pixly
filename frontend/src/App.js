import './App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import PixlyApi from './api';
// import UploadImageForm from './forms/UploadImageForm';
// import ImageList from './images/ImageList';
// import axios from "axios";
import RoutesList from './routes-nav/RoutesList';
import NavBar from './routes-nav/NavBar';

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
  console.log("Inside app");
  const [isLoading, setIsLoading] = useState(false);
  const [imagesUrls, setImagesUrls] = useState(null);
  const [currSearchTerm, setCurrSearchTerm] = useState(null);
  const [uploadImage, setUploadImage] = useState(null);
  console.log("state app=", "imagesUrls=", imagesUrls, "isLoading", isLoading);


  useEffect(function loadImageUrls() {
    console.log("Inside loadImageUrls");
    async function fetchUrls() {
      console.log("Inside fetchUrls");
      setIsLoading(true);
      let urls = null;
      try {
        if (currSearchTerm !== null) {
          urls = await PixlyApi.getImagesUrlsOptionalSearch(currSearchTerm);
        }
        if (currSearchTerm === null) {
          urls = await PixlyApi.getImagesUrlsOptionalSearch();
        }
      } catch (err) {
        console.error("fetchUrls problem fetching", err);
      }
      setIsLoading(false);
      setImagesUrls(urls);
    }
    fetchUrls();
  }, [currSearchTerm]);

  /**handleUpload:
   * handles formdata submission from UploadImageForm
   * formData = {file, caption}
   */
  async function handleUpload(formData) {
    console.log("inside handleUpload");
    const { file, caption } = formData;
    console.log("file", file, "caption", caption);
    const data = new FormData();

    data.append('file', file);
    data.append('caption', caption);
    console.log("data=", data);
    try {
      const newImage = await PixlyApi.addNewImage(data);
      console.log("add new image", newImage);
      // const newUrl = newImage.url;
      setUploadImage(newImage);
      setImagesUrls(images=>([...images, newImage]))
    } catch (err) {
      console.error(err);
    }
  }
  console.log("after adding new image", imagesUrls);
  if (isLoading === true) {
    return "Im looking...";
  }

  function handleSearch(formData) {
    setCurrSearchTerm(formData);
  }


  if (isLoading) {
    return (
      <p>isLoading</p>
    );
  }
  return (

    <BrowserRouter>
      <div className="App">
        <NavBar />
        {imagesUrls !== null &&
          <RoutesList handleUpload={handleUpload} images={imagesUrls} handleSearch={handleSearch} />
        }
      </div>
    </BrowserRouter>
  );
}

export default App;
