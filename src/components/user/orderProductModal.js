import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Modal, Button } from 'react-bootstrap'
import OrderProductList from './orderProductList'
const OrderProductModal = (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const {items} = props;
    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                See items
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Items</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <OrderProductList items={items}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

OrderProductModal.propTypes = {
    items: PropTypes.array.isRequired
}

export default OrderProductModal

