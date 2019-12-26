import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { IconContext } from 'react-icons'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { increment } from '../../actions/cartAction';
export class IncrementBtn extends Component {
    static propTypes = {
        prop: PropTypes
    }
    handleClick = () => {
        const { cart, id } = this.props;
        this.props.increment(id,cart);
    }
    render() {
        
        return (
            <IconContext.Provider value={{ color: "blue" }}>
                <div style={{cursor: 'pointer'}}>
                    <IoIosAddCircleOutline onClick={() => this.handleClick()} />
                </div>
            </IconContext.Provider>
        )
    }
}

const mapStateToProps = (state) => ({
    cart: state.cart.cart
})

const mapDispatchToProps = {
    increment
}

export default connect(mapStateToProps, mapDispatchToProps)(IncrementBtn)
