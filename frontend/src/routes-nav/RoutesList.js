import { Routes, Route, Navigate } from 'react-router-dom';
import Gallery from '../Gallery';
import ImagePage from '../images/ImagePage';
import UploadImageForm from '../forms/UploadImageForm';

/**Component for RoutesList
 *
 * Routes to all site paths
 *
 * Props:
 *  - images array of objects [{image_data:.., url:..}, ...]
 *  - handleUpload: parent function for upload image form
 *  - handleSearch: calls parent fn to update search term
 *  - currSearchTerm: term in SearchForm
 *
 * State:none
 *
 * App -> RoutesList -> { Gallery, ImagePage, UploadImageForm}
 *
 * connects links to components:
 *  - Gallery /gallery
 *  - ImagePage /gallery/id
 *  - UploadImageForm /images/upload
 *  - handles not found path back to /gallery page
 * */
function RoutesList({ handleUpload, images, handleSearch, currSearchTerm }) {
    return (
        <Routes>
            <Route
                path="/gallery"
                element={<Gallery images={images}
                    handleSearch={handleSearch}
                    currSearchTerm={currSearchTerm} />}>
            </Route>
            <Route
                path="/gallery/:id"
                element={<ImagePage images={images} />}>
            </Route>
            <Route
                path="/images/upload"
                element={<UploadImageForm handleUpload={handleUpload} />}>
            </Route>
            <Route path="*" element={<Navigate to="/gallery" />} />
        </Routes>
    );
}

export default RoutesList;