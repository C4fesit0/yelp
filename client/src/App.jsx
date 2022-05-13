import React from "react";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import { RestaurantsContextProvider } from "./context/RestaurantsContext";

import Home from "./routes/Home";
import RestaurantDetailPage from "./routes/RestaurantDetailPage";
import Update from "./routes/Update";


const App=() =>{

    return(
        <RestaurantsContextProvider>
            <div className="container">
        <Router>
            <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/restaurants/:id" element={<RestaurantDetailPage/>} />
            <Route exact path="/restaurants/:id/update" element={<Update/>} />
            </Routes>
        </Router>
    </div>
        </RestaurantsContextProvider>
        
    );

}

export default App;