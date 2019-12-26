import React, { useState } from 'react'
import { Modal, Image, Row, Col } from 'react-bootstrap'
import DetailsIcon from '@material-ui/icons/Details';
import IconButton from '@material-ui/core/IconButton'
import { Link } from 'react-router-dom'
import OrderProductList from '../../user/orderProductList'
const OrderDetail = (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        console.log("fuck")
        setShow(true);
    }
    const { orderCT } = props;
    return (
        <>
            <IconButton
                onClick={handleShow}
                color="primary"
                variant="contained"
                size="small">
                <DetailsIcon style={{ textTransform: 'none', color: 'green' }} />
            </IconButton>
            <Modal size={"lg"} show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>THÔNG TIN CHI TIẾT HOÁ ĐƠN</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <div>
                                <p><b>Mã  :</b> {orderCT._id}</p>
                                <p><b>Tổng giá :</b> {orderCT.prizeWithPromo}</p>
                                <p><b>Ngày tạo :</b> {orderCT.create_time}</p>
                                <p><b>Tình trạng :</b> {orderCT.isDeleted}</p>
                                <hr />
                                <p><b>Mã người mua :</b> {orderCT.userId}</p>
                                <p><b>Tên người mua :</b> {orderCT.name}</p>
                                <p><b>Email : </b>{orderCT.email}</p>
                                {/* <p><b>Ngày sinh : </b>{orderCT.userBirthDay}</p> */}
                                <p><b>Số điện thoại :</b> {orderCT.phone}</p>
                            </div>
                        </Col>
                        <Col>
                            <OrderProductList items={orderCT.items} />
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default OrderDetail
