import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,

} from "react-router-dom";
import PageNotFound from "../pages/PageNotFound";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import Instructors from "../pages/Instructors";
import Classes from "../pages/Classes";

export const MainRouter = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path = "/" element = {<MainLayout/>}>
                <Route index element = {<Home/>}/>
                <Route path = "instructors" element = {<Instructors/>}/>
                <Route path = "classes" element = {<Classes/>}/>

            </Route>
            <Route path="*" element={<PageNotFound />} />

        </Route>

    )
)