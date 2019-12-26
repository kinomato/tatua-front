import React from 'react'
import PropTypes from 'prop-types'
import { ListGroup } from 'react-bootstrap'
import OrderProductItem from './orderProductItem'
function OrderProductList(props) {
    const { items } = props;
    return (
        <ListGroup variant="flush">
            <div style={{ maxHeight: '45vh', overflowY: "scroll" }}>
                {/* eslint-disable-next-line array-callback-return */}
                {items.map(item => {
                    return (
                        <OrderProductItem item={item}/>
                    )
                })}
            </div>
        </ListGroup>
    )
}

OrderProductList.propTypes = {

}

export default OrderProductList

