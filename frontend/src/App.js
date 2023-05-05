import './App.css';
import React, { useState, useEffect, useNavigate } from "react";
import { BrowserRouter, Navigate } from "react-router-dom";
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
  const [currSearchTerm, setCurrSearchTerm] = useState("");
  const [uploadImage, setUploadImage] = useState(null);
  console.log("state app=", "imagesUrls=", imagesUrls, "isLoading", isLoading);
  // const navigate= useNavigate();

  function handleBackToHome(){
    console.log("in handle back");

    setCurrSearchTerm("");
  }


  useEffect(function loadImageUrls() {
    console.log("Inside loadImageUrls");
    async function fetchUrls() {
      console.log("Inside fetchUrls");
      setIsLoading(true);
      let urls = null;
      try {
        if (currSearchTerm.length !== 0) {
          urls = await PixlyApi.getImagesWithUrlsOptionalSearch(currSearchTerm);
        }
        if (currSearchTerm.length === 0) {
          urls = await PixlyApi.getImagesWithUrlsOptionalSearch();
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
      const newImage = (await PixlyApi.addNewImage(data))[0];
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


      <div className="App">
        <NavBar handleBackToHome={handleBackToHome} />
        {imagesUrls !== null &&
          <RoutesList handleUpload={handleUpload}
          images={imagesUrls}
          handleSearch={handleSearch}
          currSearchTerm={currSearchTerm}
          setCurrSearchTerm={setCurrSearchTerm}/>
        }
      </div>

  );
}

export default App;
