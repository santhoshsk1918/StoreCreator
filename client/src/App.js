import React from 'react';
import UserContextProvider from "./Context/UserContext";
import HomeComponent from "./Components/HomeComponent";

function App() {
    return (
        <React.Fragment>
            <UserContextProvider>
                <HomeComponent />
            </UserContextProvider>
        </React.Fragment>
    );
}

export default App;
