import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { deleteCartItem, calculate } from '../../actions/cartAction';
// import { Button } from 'react-bootstrap';
import { IoIosCloseCircleOutline } from 'react-icons/io'
import { IconContext } from 'react-icons'

export class DeleteCartButton extends Component {
    static propTypes = {
        prop: PropTypes
    }
    handleClick = () => {
        const { id, cart } = this.props;
        this.props.deleteCartItem(id, cart);

    }
    render() {
        return (
            <div>
                
                <IconContext.Provider value={{ color: "red"  }}>
                    
                        <div style={{cursor: 'pointer'}}>
                        <IoIosCloseCircleOutline  variant="danger" onClick={() => this.handleClick()} />
                        </div>
                    
                    
                </IconContext.Provider>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    cart: state.cart.cart
})

const mapDispatchToProps = {
    deleteCartItem,
    calculate
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteCartButton)
