import React from 'react'
import { ListGroup, Image } from 'react-bootstrap'
const OrderProductItem = (props) => {
    const { item } = props;
    return (
        <ListGroup.Item>
            <div className="d-flex flex-row justify-content-between">
                <div >
                    <Image style={{ height: "5rem", width: "6rem" }} src={item.product.prodURL} thumbnail />
                </div>
                <div className="d-flex flex-column">
                    <small><strong>
                        {item.product.prodName}
                    </strong></small>
                    {item.topps.map(topp => (
                        <small>{topp.toppName}-</small>
                    ))}
                </div>
                <div className="d-flex flex-row">
                    {/* <IncrementBtn id={item.id} /> */}
                    <small>total:</small>
                    <small>{item.sl}</small>
                    {/* <DecrementBtn id={item.id} /> */}
                </div>
                <p>${item.tongtien}</p>
            </div>
        </ListGroup.Item>
    )
}

export default OrderProductItem
