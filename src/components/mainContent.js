import React, { Component } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import ControlledCarousel from './carousel';
import Products from './product/products';
import InfoUmbreon from './info/infoUmbreon';
import Cart from './cart/cart';
import Searchbar from './search/searchbar'
class MainContent extends Component {
    render() {
        return (
            <div>
                <Row style={{ marginBottom: "2rem" }}>
                    <Col sm={7}>
                        <ControlledCarousel />
                    </Col>
                    <Col>
                        <InfoUmbreon />
                    </Col>
                </Row>

                <Row>
                    <Col sm={9}>
                        {/* <Card>
                            <Card.Header>Trà sữa</Card.Header>
                            <Card.Body>
                                <Products />
                            </Card.Body>
                        </Card> */}
                        <Row>
                            <Col>
                                <Searchbar />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            <Products />
                            </Col>
                            
                        </Row>


                    </Col>
                    <Col>
                        <Cart />

                    </Col>
                </Row>

            </div>
        )
    }
}
export default MainContent