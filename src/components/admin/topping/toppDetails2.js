import React, { useState } from 'react'
import { Modal, Image } from 'react-bootstrap'
import DetailsIcon from '@material-ui/icons/Details';
import IconButton from '@material-ui/core/IconButton'
import { Link } from 'react-router-dom'

const ToppDetails2 = (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        console.log("fuck")
        setShow(true);
    }
    const { toppCT } = props;
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
                    <Modal.Title>THÔNG TIN CHI TIẾT TOPPING</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    

                    <div>
                    <p><b>Mã topping : </b>{toppCT._id}</p>
                    <p><b>Tên topping : </b>{toppCT.toppName}</p>
                    <p><b>Giá topping : </b>{toppCT.toppPrize}</p>
                        {/* <img src={productCT.prodURL} alt="hinh" /> */}
                    </div>
                </Modal.Body>

            </Modal>
        </>
    )
}

export default ToppDetails2
