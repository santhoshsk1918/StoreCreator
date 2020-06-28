import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import {UserContext} from "../Context/UserContext";
import actions from "../Context/Actions/actions";
import {Row, Col} from "react-bootstrap";
import {Link} from "react-router-dom";
import Shop from "./Shop";


const Profile = () => {
    let [shopList, shopListUpdater] = useState([]);
    let {loggedInUser, setLoggedInUser} = useContext(UserContext);
    console.log(loggedInUser);
    useEffect(() => {
        axios(`/shop/shopList?userId=${loggedInUser.username}`, {
            headers: {
                auth: loggedInUser.jwt
            }
        }).then((resp) => {
            shopListUpdater((prevState => {
                console.log(resp)
                return resp.data;
            }))
        }).catch((err) => {
            if (err.response.status === 401) {
                window.alert("Session Timed out please Re Login");
                setLoggedInUser({type: actions.LOGOUT_USER})
            }else{
                window.alert("Some thing wen wrong please try again")
            }
        })
    }, [])
    let shopMap = shopList.map((item) => <Shop key={item._id} value={item}/>)
    return (
        <React.Fragment>
            {(shopList.length === 0) ?
                <Row className={"text-center"}>
                    <Col className={"mt-5"}>
                        No Shops Yet Please add Shop
                        <br />
                        <Link to={"/addStore"} className={"btn btn-app-primary text-app-secondary"}>
                            Add Store
                        </Link>
                    </Col>

                </Row>
                :
                <React.Fragment>
                    <Row className={"float=right mt-2"}>
                        <Col>
                            <Link to={"/addStore"} className={"btn btn-app-primary text-app-secondary"}>
                                Add Store
                            </Link>
                        </Col>
                    </Row>
                    <Row className={"mt-5"}>
                        {shopMap}
                    </Row>
                </React.Fragment>
            }
        </React.Fragment>

    );
};

export default Profile;