import axios from "axios";


// const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";
const BASE_URL = "http://127.0.0.1:5001";
/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class PixlyApi {

  static async request(endpoint, data = {}, method = "get", header = null) {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    console.log("url=", url);
    const params = (method === "get")
      ? data
      : {};
    console.log("params=", params);
    try {
      let res = null;
      if (header === null) {
        res = (await axios({ url, method, data, params }));
      }
      else {
        res = (await axios({ url, method, data, params }));
      }
      console.log("res=", res);
      const resData = res.data;
      console.log("resData=", resData);
      return res;
    } catch (err) {
      // console.error("API Error:", err.response);
      // let message = err.response.data.error.message;
      let message = err;
      // console.log("message", message);
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get url for aws images with optional search term. */

  static async getImagesWithUrlsOptionalSearch(search_term = null) {
    console.log("inside getImagesUrlsOptionalSearch");
    if (search_term !== null) {
      const res = await this.request("images", { search_term });
      console.log("inside searchterm res=", res);
      return res.data.images;
    }
    if (search_term === null) {
      const res = await this.request(`images`);
      console.log("inside null st res=", res);
      return res.data.images;
    }
  }
  /** Get image url by id  */

  static async getImageWithUrl(id) {
    console.log("inside getImageUrl");
    let res = await this.request(`images/${id}`);
    console.log("res=", res);
    return res.data.images;
  }

  /** Add new image to aws from form submission */

  static async addNewImage(data) {
    console.log("inside addNewImage");
    console.log("data=", data)
    // const header ={ "content-type":"multipart/form-data"};
    let res = await this.request(`images/upload`, data, "post");
    console.log("res=", res);
    return res.data.images;
  }
}

export default PixlyApi;
