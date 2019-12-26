import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { IconContext } from 'react-icons'

import { AiOutlineMinusCircle } from 'react-icons/ai'
import { decrement } from '../../actions/cartAction';
export class DecrementBtn extends Component {
    static propTypes = {
        prop: PropTypes
    }
    handleClick = () => {
        const { cart, id } = this.props;
        this.props.decrement(id,cart);
    }
    render() {
        return (
            <IconContext.Provider value={{ color: "red" }}>
                <div style={{cursor: 'pointer'}}>
                    <AiOutlineMinusCircle onClick={() => this.handleClick()} />
                </div>
            </IconContext.Provider>
        )
    }
}

const mapStateToProps = (state) => ({
    cart: state.cart.cart
})

const mapDispatchToProps = {
    decrement
}

export default connect(mapStateToProps, mapDispatchToProps)(DecrementBtn)
