import './App.css';
import React, { useState, useEffect, useNavigate } from "react";
import PixlyApi from './api';
import RoutesList from './routes-nav/RoutesList';
import NavBar from './routes-nav/NavBar';

/**Pixly application
 *
 * State:
 * - isLoading boolean
 * - imagesData: images array [0:{image_data:..., url:...},1:{...}, ...]
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
  const [imagesData, setImagesData] = useState(null);
  const [currSearchTerm, setCurrSearchTerm] = useState("");
  // console.log("state app=", "imagesUrls=", imagesData, "isLoading", isLoading);

  /**clears search term when navigating back to home */
  function handleBackToHome() {
    setCurrSearchTerm("");
  }

  useEffect(function loadImageUrls() {
    // console.log("Inside loadImageUrls");
    async function fetchUrls() {
      // console.log("Inside fetchUrls");
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
      setImagesData(urls);
    }
    fetchUrls();
  }, [currSearchTerm]);

  /**handleUpload:
   * handles formdata submission from UploadImageForm
   * formData = {file, caption}
   */
  async function handleUpload(formData) {
    // console.log("inside handleUpload");
    const { file, caption } = formData;
    // console.log("file", file, "caption", caption);
    const data = new FormData();

    data.append('file', file);
    data.append('caption', caption);
    // console.log("data=", data);
    try {
      const newImage = (await PixlyApi.addNewImage(data))[0];
      console.log("add new image", newImage);
      setImagesData(images => ([newImage, ...images]))
    } catch (err) {
      console.error(err);
    }
  }
  console.log("after adding new image", imagesData);
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
      {imagesData !== null &&
        <RoutesList handleUpload={handleUpload}
          images={imagesData}
          handleSearch={handleSearch}
          currSearchTerm={currSearchTerm}
          setCurrSearchTerm={setCurrSearchTerm} />
      }
    </div>
  );
}

export default App;
