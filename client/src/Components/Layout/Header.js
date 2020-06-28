import React, {useContext} from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import {UserContext} from "../../Context/UserContext";
import actions from "../../Context/Actions/actions";

const Header = () => {
    const {loggedInUser, setLoggedInUser} = useContext(UserContext);
    const logoutUser = () => {
        setLoggedInUser({type: actions.LOGOUT_USER, payload: null});
    }
    return (

        <React.Fragment>
            <Navbar bg="app-primary" expand="lg">
                <Navbar.Brand href="#home" id={"storeHeader"} className={"text-app-secondary"}>Store Creator</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link to={"/"} className={"text-app-secondary"}>Home</Nav.Link>
                        {loggedInUser.isLoggedIn ?
                            <Nav.Link onClick={logoutUser} className={"text-app-secondary"}>Logout</Nav.Link>
                            :
                            null
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </React.Fragment>
    );
};

export default Header;