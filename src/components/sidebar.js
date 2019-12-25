import React, { Component, Fragment } from 'react';
import './css/sidebar.css';
import { Nav, Accordion, Card, Button, Navbar } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
class SideBar extends Component {
    static propTypes = {
        isAuthenticated: PropTypes.bool,
        user: PropTypes.object
    }
    render() {
        const { isAuthenticated, user } = this.props;
        const auth = (
            <Fragment>
                <Accordion>

                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                Account
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <Nav.Link href="#">
                                    Profile
                                    </Nav.Link>
                                <Nav.Link href="#">
                                    History
                                    </Nav.Link>
                                <Nav.Link href="#">
                                    Setting
                                    </Nav.Link>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </Fragment>
        )
        const admin = (
            <Fragment>
                <Accordion>
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                Management
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="1">
                            <Card.Body>

                                {/* <Nav.Link href="/admin/dashboard">
                                    Dashboard
                                    </Nav.Link> */}
                                <Nav.Link>
                                    <Link to="/admin/dashboard">Dashboard</Link>
                                </Nav.Link>

                                <Nav.Link>
                                    <Link to="/admin/orders">Order</Link>
                                </Nav.Link>
                                <Nav.Link>
                                    <Link to="/admin/">User</Link>
                                </Nav.Link>
                                <Nav.Link>
                                    <Link to="/admin/">Driver</Link>
                                </Nav.Link>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </Fragment>
        )
        return (
            <div className="shadow-lg" style={{ height: '100vh', overflowY: "scroll" }}>
                <Nav defaultActiveKey="/home" className="flex-column" >
                    <Navbar.Brand href="/home" style={{ marginLeft: '2rem' }}>Wazamove</Navbar.Brand>
                    <Nav.Link eventKey="link-1">Link</Nav.Link>
                    <Nav.Link eventKey="link-2">Link</Nav.Link>
                    <Card>
                        <Card.Header>
                            <Nav.Link>
                                <Link to="/home">Home</Link>
                            </Nav.Link>
                        </Card.Header>
                    </Card>
                    {isAuthenticated ? auth : null}
                    {(isAuthenticated && user !== null && user.priority >= 1) ? admin : null}
                    <Card>
                        <Card.Header>
                            <Nav.Link>
                                <Link to="/info/about">About us</Link>
                            </Nav.Link>
                        </Card.Header>
                    </Card>
                    <Card>
                        <Card.Header>
                            <Nav.Link>
                                <Link to="/info/contact">Contact</Link>
                            </Nav.Link>
                        </Card.Header>
                    </Card>
                    <Card>
                        <Card.Header>
                            <Nav.Link>
                                <Link to="/info/help">Help</Link>
                            </Nav.Link>
                        </Card.Header>
                    </Card>
                </Nav>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
})
export default connect(mapStateToProps, {})(SideBar);