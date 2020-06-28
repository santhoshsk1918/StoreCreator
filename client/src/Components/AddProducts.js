import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router";
import {Button, Card, Col, Row} from "react-bootstrap";
import InputElement from "./Common/InputElement";
import axios from "axios";
import actions from "../Context/Actions/actions";
import {UserContext} from "../Context/UserContext";

const AddProducts = (props) => {
    let [product, setProducts] = useState({
        productId: "",
        productName: "",
        productPrice: "",
        productImage: "",
        shopId: ""
    })

    let {id} = useParams();
    let {loggedInUser, setLoggedInUser} = useContext(UserContext);

    useEffect(() => {
        setProducts((prevState => {
            return {...prevState, shopId: id}
        }))
    }, [])

    const productDetailsChanged = (type, e) => {
        e.persist();
        if(type === "productName"){
            setProducts((prevState => {return {...prevState, productName: e.target.value}}))
        }else if(type === "productPrice") {
            setProducts((prevState => {return {...prevState, productPrice: e.target.value}}))
        }else {
            setProducts((prevState => {return {...prevState, productImage: e.target.files[0]}}))
        }
    }

    const saveProduct = () => {
        let fd = new FormData();
        if(product.productImage != ""){
            fd.append('image', product.productImage, product.productImage.name);
        }

        fd.append('productName', product.productName);
        fd.append('productPrice', product.productPrice);
        fd.append('shopId', product.shopId);
        axios.post('/product/createProduct', fd, {
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
            <Row className={"ml-5 pl-5"}><h3>Add Product</h3></Row>
            <Row className={"mt-3"}>
                <Col md={3} xs={12}></Col>
                <Col md={6} xs={12}>
                    <Card>
                        <Card.Body>
                            <InputElement type={"text"} name={"productName"} value={product.productName} id={"productName"} label={"Product Name"} classes={""} onChangeHandler={productDetailsChanged.bind(this, "productName") } placeholder={"Enter Product Name"} error={""}/>
                            <InputElement type={"number"} name={"productPrice"} value={product.productPrice} id={"productPrice"} label={"Product Price"} classes={""} onChangeHandler={productDetailsChanged.bind(this, "productPrice") } placeholder={"Enter Product Price"} error={""}/>
                            <InputElement type={"file"} name={"productImage"} id={"productImage"} label={"Product Image"} classes={""} onChangeHandler={productDetailsChanged.bind(this, "productImage") } placeholder={"Select Product Image"} />
                        </Card.Body>
                        <Card.Footer>
                            <Button className={"btn btn-app-primary mr-4"} onClick={saveProduct}>Save</Button>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>

        </React.Fragment>
);
};

export default AddProducts;