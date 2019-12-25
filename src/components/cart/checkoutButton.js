import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import Login from '../auth/login'
import Checkout from '../paypal/checkout';
import CheckoutScreen from '../order/checkoutScreen';
export class checkoutButton extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showlogin: false,
            showcheckout: false,
        }
    }
    handleLoginKick = () => {
        this.setState({
            showlogin: false
        })
    }
    handleCheckoutKick = () => {
        this.setState({
            showcheckout: false
        })
    }
    render() {
        const {showlogin,showcheckout} = this.state;
        const {isAuthenticated} = this.props;
        if(isAuthenticated) {
            return (
                <div>
                    <Button block variant="outline-success" 
                    onClick={() => this.setState({showcheckout: true})}>Thanh toán</Button>
                    <CheckoutScreen onClick={this.handleCheckoutKick} temp = {showcheckout} />
                    {/* <Checkout /> */}
                </div>
            )
        } else {
            return (
                <div>
                    <Button block
                     variant="outline-success"
                    onClick={() => this.setState({showlogin: true})}>Thanh toán</Button>
                    <Login onClick={this.handleLoginKick} temp = {showlogin} />
                </div>
            )
        }
        
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(checkoutButton)
