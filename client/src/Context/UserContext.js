import React, {useEffect, useReducer} from 'react';
import userReducer from './Reducers/userReducer'
import actions from "./Actions/actions";

export const UserContext = React.createContext({isLoggedIn: false});


const UserContextProvider = (props) => {
    let initialState = JSON.parse(localStorage.getItem("user")) || {isLoggedIn: false};
    console.log(initialState);
    const [loggedInUser, setLoggedInUser] = useReducer(userReducer, initialState);

    useEffect(() => {

        const localUser = localStorage.getItem("user") || "";
        console.log(localUser);
        if(localUser !== ""){
            setLoggedInUser({type: actions.SAVE_NEW_USER, payload: JSON.parse(localUser)})
        }

    }, [])

    return (

        <UserContext.Provider value={{loggedInUser, setLoggedInUser}} >
            {props.children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;