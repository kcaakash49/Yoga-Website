import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,

} from "react-router-dom";
import PageNotFound from "../pages/PageNotFound";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";

export const MainRouter = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path = "/" element = {<MainLayout/>}>
                <Route index element = {<Home/>}/>
            </Route>
            <Route path="*" element={<PageNotFound />} />

        </Route>

    )
)