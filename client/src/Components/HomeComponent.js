import React, {useContext} from 'react';
import {UserContext} from "../Context/UserContext";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import HomePage from "./HomePage";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Profile from "./Profile";
import NotFound from "./NotFound";
import {Container} from "react-bootstrap";
import AddStore from "./AddStore";

const HomeComponent = () => {
    let {loggedInUser, setUser} = useContext(UserContext);
    return (

        <React.Fragment>
            <Header />
            <Container fluid className={"main-app"}>
                {
                    !loggedInUser.isLoggedIn ? <HomePage/>
                        :
                        <Router>
                            <Switch>
                                <Route exact path={"/"} component={Profile}/>
                                <Route exact path={"/addStore"} component={AddStore}/>
                                <Route component={NotFound}/>
                            </Switch>
                        </Router>
                }
            </Container>
            <Footer />
        </React.Fragment>
    );
};

export default HomeComponent;