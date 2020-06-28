import React from 'react';
import {Col, Container, Row} from 'react-bootstrap'

const NotFound = () => {
    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <h2 className={"mb-2"}>404</h2>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h4>Page Not Found</h4>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default NotFound;