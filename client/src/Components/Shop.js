import React from 'react';
import {Row, Card, Col, Button} from "react-bootstrap";
import {FacebookShareButton, FacebookIcon, WhatsappIcon, WeiboShareButton} from 'react-share'
let shophost = "http://localhost:5000/shop/"

const Shop = (props) => {
    let {value} = props;
    console.log(value);
    const {shopPath, shopName}  = value
    return (
       <Col xs={12} md={6} className={"text-left mt-2"}>
           <Card>
               <Card.Body>
                   <Row><Col><b>Shop Name</b>: {shopName}</Col></Row>
                   <Row><Col><b>Shop Path</b>: {shophost + shopPath.toLowerCase()}</Col></Row>
                   <Row className={"mt-3"}><Col >
                            <FacebookShareButton quote={"My new Store" + shophost + shopPath.toLowerCase()}><FacebookIcon size={32} round={true}/></FacebookShareButton>
                            <WeiboShareButton title={"My new Store" + shophost + shopPath.toLowerCase()}><WhatsappIcon size={32} round={true} /></WeiboShareButton>
                   </Col>
                       <Col className={"float-right"}>
                           <Button className={"btn btn-app-primary"} size="sm">Preview</Button>
                           <Button className={"btn btn-app-primary ml-2"} size="sm">Add Products</Button>
                       </Col>
                   </Row>
               </Card.Body>
           </Card>
       </Col>
    );
};

export default Shop;