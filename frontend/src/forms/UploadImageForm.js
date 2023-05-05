import { useState } from "react";
import { useNavigate } from "react-router";
/**
 * UploadImageForm component
 * form to upload image with file and caption input 
 * catches errors and displays 
 *
 * State:
 * Form Data
 *
 * Props:
 * handleUpload parent function to update state of image array
 * 
 * App -> RoutesList -> UploadImageForm
 */

//TODO: FIX ERROR HANDLING  
function UploadImageForm({ handleUpload }) {
    const [formData, setFormData] = useState({
        file: null,
        caption: ""
    });

    const navigate = useNavigate();
    const [formErrors, setFormErrors] = useState(null);

    /**Handle form submission*/
    async function handleSubmit(evt) {
        evt.preventDefault();

        try {
            await handleUpload(formData);
            navigate("/gallery");


        } catch (err) {
            setFormErrors(err);

        }

    }

    /**handle form data changing */
    function handleChange(evt) {
        if (evt.target.name === "file") {
            // console.log("value of file", evt.target.files[0]);
            setFormData(f => ({
                ["caption"]: f["caption"],
                ["file"]: evt.target.files[0],
            }));
        }
        else {
            const { name, value } = evt.target;
            setFormData(f => ({
                ...f,
                [name]: value,
            }));
        }
    }

    return (
        <div className="UploadImageForm">
            <form onSubmit={handleSubmit}>
                <label> {`Selected Image: `}
                    <input
                        type="file"
                        name="file"
                        onChange={handleChange}>
                    </input>
                </label>
                <label> Caption
                    <input
                        type="text"
                        name="caption"
                        value={formData.caption}
                        onChange={handleChange}>
                    </input>
                </label>

                {formErrors !== null &&
                    <p>
                        Errors: {formErrors}
                    </p>
                }

                <button
                    type="submit"
                    className="UploadImageForm-uploadButton">
                    submit
                </button>
            </form>
        </div>
    );

}

export default UploadImageForm;