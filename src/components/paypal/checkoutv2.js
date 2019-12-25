import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { PayPalButton } from "react-paypal-button-v2";

export class Checkoutv2 extends Component {
    static propTypes = {
        tongtien: PropTypes.number.isRequired
    }

    render() {
        return (
            <div>
                <PayPalButton
                    amount={this.props.tongtien}
                    // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                    onSuccess={(details, data) => {
                        alert("Transaction completed by " + details.payer.name.given_name);

                        // OPTIONAL: Call your server to save the transaction
                        return fetch("/paypal-transaction-complete", {
                            method: "post",
                            body: JSON.stringify({
                                orderID: data.orderID
                            })
                        });
                    }}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    tongtien: state.cart.tongtien
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Checkoutv2)
