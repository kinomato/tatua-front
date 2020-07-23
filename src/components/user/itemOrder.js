import React from 'react'
import { Card } from 'react-bootstrap'
import OrderProductModal from './orderProductModal'

const ItemOrder = (props) => {
    const { item } = props;
    return (
        <Card >
            <Card.Header>{item.create_time}</Card.Header>
            <Card.Body>
                
                <Card.Title>Name: {item.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Email: {item.email}</Card.Subtitle>
                <Card.Text>
                    Phone: {item.phone}
                </Card.Text>
                <Card.Text>
                    Total: {item.prizeWithPromo}
                </Card.Text>
                <Card.Footer>
                    <OrderProductModal items={item.items}/>
                </Card.Footer>
            </Card.Body>
        </Card>
    )
}
export default ItemOrder
