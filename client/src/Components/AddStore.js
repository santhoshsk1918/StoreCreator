import React, {useContext, useState} from 'react';
import {Col, Row, Card, Button} from "react-bootstrap";
import InputElement from "./Common/InputElement";
import axios from 'axios';
import {UserContext} from "../Context/UserContext";
import actions from "../Context/Actions/actions";

const AddStore = (props) => {
    let [shop, setShop] = useState({shopName: "", shopPath: "", shopImage: "", shopNameError: "", shopPathError: ""})
    let {loggedInUser, setLoggedInUser} = useContext(UserContext);
    const shopDetailsChanged = (type, e) => {
        e.persist();
        if(type === "shopName"){
            setShop((prevState => {return {...prevState, shopName: e.target.value}}))
        }else if(type === "shopPath") {
            setShop((prevState => {return {...prevState, shopPath: e.target.value.replace(/\s/g,'')}}))
        }else {
            setShop((prevState => {return {...prevState, shopImage: e.target.files[0]}}))
        }
    }

    const saveShop = () => {
       let fd = new FormData();
       if(shop.shopImage != ""){
           fd.append('image', shop.shopImage, shop.shopImage.name);
       }

       fd.append('shopName', shop.shopName);
       fd.append('shopPath', shop.shopPath);
        axios.post('/shop/createShop', fd, {
            headers: {
                auth: loggedInUser.jwt
            }
        }).then((resp) => {
            props.history.push("/")
        }).catch((err) => {
            if(err.response.status === 401){
                window.alert("Session Timedout");
                setLoggedInUser({type: actions.LOGOUT_USER})
            }
        })
    }


    return (
        <React.Fragment>
            <Row className={"ml-5 pl-5"}><h3>Add Store</h3></Row>
            <Row className={"mt-3"}>
                <Col md={3} xs={12}></Col>
                <Col md={6} xs={12}>
                    <Card>
                        <Card.Body>
                            <InputElement type={"text"} name={"shopName"} value={shop.shopName} id={"shopName"} label={"Store Name"} classes={""} onChangeHandler={shopDetailsChanged.bind(this, "shopName") } placeholder={"Enter Store Name"} error={shop.shopNameError} />
                            <InputElement type={"text"} name={"shopPath"} value={shop.shopPath} id={"shopPath"} label={"Store Path"} classes={""} onChangeHandler={shopDetailsChanged.bind(this, "shopPath") } placeholder={"Enter Store Path"} error={shop.shopPathError} />
                            <InputElement type={"file"} name={"shopImage"} id={"shopImage"} label={"Store Image"} classes={""} onChangeHandler={shopDetailsChanged.bind(this, "shopImage") } placeholder={"Enter Store Name"} error={shop.shopPathError} />
                        </Card.Body>
                        <Card.Footer>
                            <Button className={"btn btn-app-primary mr-4"} onClick={saveShop}>Save</Button>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default AddStore;