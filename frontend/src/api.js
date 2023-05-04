const axios = require("axios");

// const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";
const BASE_URL = "http://localhost:5001";
/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class PixlyApi {

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    console.log("url=", url);
    const params = (method === "get")
      ? data
      : {};
    console.log("params=", params);
    try {
      const res = (await axios({ url, method, data, params }))
      console.log("res=", res)
      const resData = res.data
      console.log("resData=", resData)
      return res;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get url for aws images with optional search term. */

  static async getImagesUrlsOptionalSearch(search_term = null) {
    console.log("inside getImagesUrlsOptionalSearch");
    if (search_term !== null) {
      const res = await this.request("images", { search_term });
      console.log("inside searchterm res=", res);
      return res.data.urls;
    }
    if (search_term === null) {
      const res = await this.request(`/`);
      console.log("inside null st res=", res);
      return res.data.urls;
    }
  }
  /** Get image url by id  */

  static async getImageUrl(id) {
    console.log("inside getImageUrl");
    let res = await this.request(`images/${id}`);
    console.log("res=", res);
    return res.data.url;
  }

  /** Add new image to aws from form submission */

  static async addNewImage(formData) {
    console.log("inside addNewImage");
    let res = await this.request(`images/upload`, { formData }, "post");
    console.log("res=", res);
    return res.data.image;
  }
}

async function test(){
  const url = await PixlyApi.getImageUrl(1);
  console.log("url inside test", url);
}

test();

// export default PixlyApi;