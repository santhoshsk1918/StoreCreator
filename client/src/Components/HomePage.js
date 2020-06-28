import React, {useContext, useEffect, useState} from 'react';
import {Col, Row, Card, Button, Image} from 'react-bootstrap';
import storeImg from "../Assets/Images/myshop.png"
import InputElement from "./Common/InputElement";
import {GoogleLogin} from "react-google-login";
import axios from 'axios'
import actions from "../Context/Actions/actions";
import {UserContext} from "../Context/UserContext";

const HomePage = () => {
    // eslint-disable-next-line
    let {loggedInUser, setLoggedInUser} = useContext(UserContext);
    let [login, setLogin] = useState({userName: "", password: "", userNameError: "", passwordError: "", name: "", nameError: "", isRegister: false})
    const clientID = "408275971342-gvk5hn6m7gqpqc5gmktootdaetrb225c.apps.googleusercontent.com"
    let [user, setUser] = useState({username: "", name: "", provider: "", providerId: "", password: ""})

    const googleSuccessLogin = (response) => {
        setUser({
            username: response.profileObj.email,
            name: response.profileObj.name,
            provider: "google",
            providerId: response.profileObj.googleId,
            password: ""
        });
    }



    useEffect(() => {
        if(user.username !== ""){
            saveNewUser();
        }
        return () => {
            console.log("Un mounting");
        }
        // eslint-disable-next-line
    }, [user])


    const saveNewUser = () => {
        axios.post("/users/signup", user)
            .then((resp) => {
                console.log(resp.data);
                setLoggedInUser({type: actions.LOGIN_USER, payload: resp.data})
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const googleErrorLogin = (response) => {
        console.log(response);
        window.alert("Some thing went wrong Please try again");
    }


    const loginDetailsChanged = (type, e) => {
        e.persist();
        console.log(type);
        if (type === "userName") {
            setLogin((prevState) => {
                return {
                    ...prevState, userName: e.target.value
                }
            })
        } else if (type === "name"){
            setLogin((prevState) => {
                return {
                    ...prevState, name: e.target.value
                }
            })
        }else {
            setLogin((prevState) => {
                return {
                    ...prevState, password: e.target.value
                }
            })
        }
    }

    const registerUser = () => {
        if(login.isRegister){
            setUser((prevState => {
                    return {...prevState, userName: login.userName, name: login.name, password: login.password}
                }
            ))
        }else{
            setLogin(prevState => {return {...prevState, isRegister: true}})
        }
    }

    const loginUser = () => {
        if(login.isRegister){
            setLogin(prevState => {return {...prevState, isRegister: false}})
        }else{
            setUser((prevState => {
                    return {...prevState, userName: login.userName, password: login.password}
                }
            ))

        }
    }

    return (
        <React.Fragment>
            <Row>
                <Col xs={12} md={7} sm={12} style={{"textAlign": "center"}}>
                    <Row className={"mt-4 mb-5"}>
                        <Col xs={12} md={12}>
                            <h4 className={"text-app-compliment-two"}>Welcome to Store Creator please login to create your own store</h4>
                        </Col>
                    </Row>
                    <Row className={"mt-5"}>
                        <Col xs={12} md={12}>
                            <Image src={storeImg} rounded style={{"maxWidth": "80%"}}/>
                        </Col>
                    </Row>
                </Col>
                <Col xs={12} md={5} sm={12} className={"mt-5 text-center"} >
                    <Card>
                        <Card.Body>

                            {login.isRegister ? <div><h4>Register</h4><InputElement type={"text"} name={"name"} value={login.name} id={"name"} label={"Name"} classes={""} onChangeHandler={loginDetailsChanged.bind(this, "name") } placeholder={"Enter Name"} error={login.nameError} /></div> : <h4>Login</h4>}
                            <InputElement type={"text"} name={"userName"} value={login.userName} id={"userName"} label={"Email"} classes={""} onChangeHandler={loginDetailsChanged.bind(this, "userName") } placeholder={"Enter Email"} error={login.userNameError} />
                            <InputElement type={"password"} name={"password"} value={login.password} id={"password"} label={"password"} classes={""} onChangeHandler={loginDetailsChanged.bind(this, "password")} placeholder={"Enter Password"} error={login.passwordError}/>

                        </Card.Body>
                        <Card.Footer>
                            {login.isRegister ?
                                <React.Fragment>
                                    <Button type={"submit"} className={"btn btn-app-primary mr-4"} onClick={registerUser}>Register</Button>
                                    <p className={"mt-2"}>--OR--</p>
                                    <Button className={"btn btn-app-primary mr-4"} onClick={loginUser}>Sign in</Button>
                                    <GoogleLogin clientId={clientID} buttonText="Sign in with Google" onSuccess={googleSuccessLogin} onFailure={googleErrorLogin} cookiePolicy={'single_host_origin'} />
                                </React.Fragment>
                                :
                                <React.Fragment>
                                    <Button className={"btn btn-app-primary mr-4"} onClick={loginUser}>Sign in</Button>
                                    <GoogleLogin clientId={clientID} buttonText="Sign in with Google" onSuccess={googleSuccessLogin} onFailure={googleErrorLogin} cookiePolicy={'single_host_origin'} />
                                    <p className={"mt-2"}>--OR--</p>
                                    <Button className={"btn btn-app-primary mr-4"} onClick={registerUser}>Register</Button>
                                </React.Fragment>
                            }
                        </Card.Footer>
                    </Card>

                </Col>
            </Row>

        </React.Fragment>
    );
};

export default HomePage;