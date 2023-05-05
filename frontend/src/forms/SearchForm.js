import { useState } from "react";
/** SearchForm
 *
 * Form to search for companies or jobs
 *
 * props:
 *    - handleSearch
 *
 * state:
 *    - formData
 *
 * {CompanyList, JobList} ==> SearchForm
 */

function SearchForm({ handleSearch, currSearchTerm }) {
  // console.log("SearchForm ran");
  // console.log("currSearchTerm", currSearchTerm);
  const [formData, setFormData] = useState({ searchTerm: currSearchTerm });
  // console.log("formData", formData);

  /** Update form input. */
  function handleChange(evt) {
    const input = evt.target;
    setFormData(formData => ({
      ...formData,
      [input.name]: input.value,
    }));
  }

  /** Call parent function and clear form. */
  function handleSubmit(evt) {
    evt.preventDefault();
    if(formData.searchTerm === undefined){
      handleSearch(formData.searchTerm);
    } else {
      handleSearch(formData.searchTerm.trim());
    }
  }
  return (
    <form className="SearchForm" onSubmit={handleSubmit}>
      <div className="SearchForm-form">
        <input
          id="search-term"
          name="searchTerm"
          className="form-control"
          placeholder="Enter a search term"
          onChange={handleChange}
          value={formData.searchTerm}
        />
      </div>
      <button className="SearchForm-button">Search</button>
    </form>
  );
}

export default SearchForm;