import React, { Component, Fragment } from 'react';
import { Navbar, Nav, Dropdown, NavDropdown } from 'react-bootstrap';
import RegisterModal from './auth/register';
import Logout from './auth/logout';
import LoginBtn from './auth/loginBtn';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
class NavigationBar extends Component {
    static propTypes = {
        isAuthenticated: PropTypes.bool,
        user: PropTypes.object
    }
    // componentDidUpdate(Prevprops) {
    //     const {user} = this.props;
    //     if(user !== Prevprops.user) {
    //         console.log(user);
    //     }
    // }
    render() {
        const { user, isAuthenticated } = this.props;
        const guestLinks = (
            <Fragment>
                <Nav.Item>
                    <RegisterModal />
                </Nav.Item>
                <Nav.Item>
                    <LoginBtn />
                </Nav.Item>
            </Fragment>
        )
        const adminLink = (
            <>
                <NavDropdown title='Manage' id="basic-nav-dropdown">
                    <NavDropdown.Item>
                        <Link to={'/admin/users'} style={{textDecoration:'none',color:'black'}}>Manage user</Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                        <Link to={'/admin/products'} style={{textDecoration:'none',color:'black'}}>Manage product</Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                        <Link to={'/admin/toppings'} style={{textDecoration:'none',color:'black'}}>Manage topping</Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                        <Link to={'/admin/promos'} style={{textDecoration:'none',color:'black'}}>Manage promo</Link>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item >
                        About
                    </NavDropdown.Item>
                    <NavDropdown.Item >
                        Help
                    </NavDropdown.Item>
                </NavDropdown>

            </>
        )
        const authLinks = (
            <Fragment>
                <span className="mr-3">
                    {/* <strong>{this.props.user ? `Welcome ${this.props.user.userName}` : ''}</strong> */}
                    <NavDropdown
                        title={user ? `Welcome ${user.userName}` : ''}
                        id="basic-nav-dropdown">
                        <NavDropdown.Item>
                            <Link to='/account'>Thông tin cá nhân</Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                            <Link to='/'>Lịch sử giao dịch</Link>
                        </NavDropdown.Item>
                        {/* <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item> */}
                        <NavDropdown.Divider />
                        <NavDropdown.Item ><Logout /></NavDropdown.Item>
                    </NavDropdown>
                </span>

            </Fragment>
        )
        return (
            <div>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand>
                        
                            <Link to='/home'>
                            <strong> Umbreon</strong>
                        </Link>
                        
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link >
                                <Link to="/home">Home</Link>
                            </Nav.Link>
                        </Nav>

                        <Nav className="ml-auto">
                            {isAuthenticated && user.priority >=1 ? adminLink:null}
                            {isAuthenticated ? authLinks : guestLinks}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
})
export default connect(mapStateToProps, {})(NavigationBar);