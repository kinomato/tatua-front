import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux';
import { addCartItem, incrCartItem, calculate } from '../../actions/cartAction';

class AddCartButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            localcart: []
        }
        // this.CheckDuplicate = this.CheckDuplicate.bind(this);
    }

    CheckDuplicate = (data) => {
        let isduplicate = false;
        const { cart } = this.props;
        this.setState({
            localcart: cart
        })
        //  console.log(this.props.kiboi);
        cart.forEach(item => {
            if (item.product._id === data.product._id) {
                isduplicate = true;
                if(item.topps.length !== data.topps.length)
                return isduplicate = false;
                let tempitem = null;
                item.topps.forEach(top => {
                    tempitem = data.topps.find(topp => topp._id === top._id)
                    if (!tempitem) return isduplicate = false;
                });
                if(isduplicate) {
                    const newitem = { ...item, sl: item.sl++ }
                    item = newitem;
                    this.props.incrCartItem(cart);
                    return this.props.onClick();
                }
                // const newitem = { ...item, sl: item.sl++ }
                // item = newitem;
                // temp = true;
                // return this.props.incrCartItem(cart);

            }
        });
        // console.log('from asd' + isduplicate)
        if(isduplicate === false) {
            const newitem = { ...data };
            this.props.addCartItem(newitem, cart);
            return this.props.onClick();
        }

    }
    render() {
        const { item } = this.props;
        return (
            <Button block variant="outline-primary" onClick={() => this.CheckDuplicate(item)}>Đặt</Button>
        )
    }


}

AddCartButton.propTypes = {
    addCartItem: PropTypes.func.isRequired,
    incrCartItem: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    cart: state.cart.cart
})
export default connect(mapStateToProps, { addCartItem, incrCartItem, calculate })(AddCartButton)

