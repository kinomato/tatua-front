import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { PayPalButton } from "react-paypal-button-v2";
import { toast } from 'react-toastify';
import { saveOrder } from '../../actions/userAction'

export class Checkoutv2 extends Component {
    static propTypes = {
        tongtien: PropTypes.number.isRequired
    }

    render() {
        const {user,cart,tongtien} = this.props;
        return (
            <div>
                <PayPalButton
                    amount={this.props.tongtien}
                    // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                    onSuccess={(details, data) => {
                        toast("Transaction completed by " + details.payer.name.given_name);
                        // alert("Transaction completed by " + details.payer.name.given_name);
                        // console.log(details);
                        // console.log(data);
                        // OPTIONAL: Call your server to save the transaction
                        const orderData = {
                            userId: user._id,
                            items: [...cart],
                            name: user.userName,
                            email: user.userEmail,
                            phone: user.userPhone,
                            prizeOrigin: tongtien,
                            prizeWithPromo:tongtien,
                            create_time:details.create_time
                        }
                        return this.props.saveOrder(orderData,user.id)
                    }}
                    options={{
                        clientId: "AVV055FllZSqjk4tm-QBwxlUF0ltBAlUHUti_DWDpKzVomSX4ItUK8OdjKqTChqWeTuL1kMTzwBayD2z"
                    }}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    cart: state.cart.cart,
    tongtien: state.cart.tongtien
})

const mapDispatchToProps = {
    saveOrder
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkoutv2)
