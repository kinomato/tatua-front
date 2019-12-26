import React, { useState } from 'react'
import { Modal, Image } from 'react-bootstrap'
import DetailsIcon from '@material-ui/icons/Details';
import IconButton from '@material-ui/core/IconButton'
import { Link } from 'react-router-dom'

const ProductDetails2 = (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        console.log("fuck")
        setShow(true);
    }
    const { productCT } = props;
    return (
        <>
            <IconButton
                onClick={handleShow}
                color="primary"
                variant="contained"

                size="small">
                <DetailsIcon style={{ textTransform: 'none', color: 'green' }} />
            </IconButton>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>THÔNG TIN CHI TIẾT CỦA SẢN PHẨM</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{ textAlign: "center", marginBottom:"1rem" }} >
                        <Image src={productCT.prodURL} thumbnail />
                    </div>

                    <div>
                        <p>Mã sản phẩm : {productCT._id}</p>
                        <p>Tên sản phẩm : {productCT.prodName}</p>
                        <p>Giá sản phẩm : {productCT.prodPrize}</p>
                        {/* <img src={productCT.prodURL} alt="hinh" /> */}
                    </div>
                </Modal.Body>

            </Modal>
        </>
    )
}

export default ProductDetails2
