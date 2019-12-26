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
                <div className="d-flex flex-column justify-content-around">
                    {/* <IncrementBtn id={item.id} /> */}
                    <p>${item.tongtien}</p>
                <small>total: {item.sl}</small>
                    
                    {/* <DecrementBtn id={item.id} /> */}
                </div>
                
            </div>
        </ListGroup.Item>
    )
}

export default OrderProductItem
