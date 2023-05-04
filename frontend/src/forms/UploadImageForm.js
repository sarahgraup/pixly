import { useState } from "react";
/**
 * UploadImageForm component
 * 
 * State:
 * Form Data
 * 
 * Props:
 * handleUpload
 */

function UploadImageForm({ handleUpload }) {
    const [formData, setFormData] = useState({
        file: null,
        caption: ""
    });

    /**Handle form submission*/
    function handleSubmit(evt) {
        evt.preventDefault();

        handleUpload(formData);
    }

    /**handle form data changing */
    function handleChange(evt) {
        if (evt.target.name === "file") {
            setFormData.file(evt.target.files[0]);
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
                <label> Image
                    <input
                        type="file"
                        name="file"
                        value={formData.file}
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
            </form>
        </div>
    )

}

export default UploadImageForm;