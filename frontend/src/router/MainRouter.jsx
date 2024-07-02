import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,

} from "react-router-dom";
import PageNotFound from "../pages/PageNotFound";

export const MainRouter = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            
            <Route path="*" element={<PageNotFound />} />

        </Route>

    )
)