import { useState } from "react";
import { useNavigate } from "react-router";
import "./UploadImageForm.css";
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

//TODO: FIX ERROR HANDLING WITH BETTER MESSAGE
function UploadImageForm({ handleUpload }) {
    const [formData, setFormData] = useState({
        file: null,
        caption: ""
    });
    const [formErrors, setFormErrors] = useState(null);
    const navigate = useNavigate();

    /**Handle form submission*/
    async function handleSubmit(evt) {
        evt.preventDefault();
        try {
            formData.caption = formData.caption.trim();
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
            <h1>Upload an Image to Pix.ly</h1>
            <form className="UploadImageForm-form" onSubmit={handleSubmit}>
                <div>
                <label> Selected Image:
                    <input
                        type="file"
                        name="file"
                        onChange={handleChange}
                        required>
                    </input>
                </label>
                </div>
                <div>
                <label> Caption:
                    <input
                        type="textbox"
                        name="caption"
                        value={formData.caption}
                        onChange={handleChange}
                        pattern={{ value: "^[^\s]+(\s+[^\s]+)*$" }}
                        required>
                    </input>
                </label>
                </div>

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