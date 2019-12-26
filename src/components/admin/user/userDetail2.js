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
    const { userCT } = props;
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
                    <Modal.Title>THÔNG TIN CHI TIẾT KHÁCH HÀNG</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    

                    <div>
                    <p><b>Mã khách hàng :</b> {userCT._id}</p>
                    <p><b>Tên khách hàng :</b> {userCT.userName}</p>
                    <p><b>Địa chỉ :</b> {userCT.userAddress}</p>
                    <p><b>Giới tính :</b> {userCT.userGender ? userCT.userGender:"không"}</p>
                    <p><b>Email : </b>{userCT.userEmail}</p>
                    {/* <p><b>Ngày sinh : </b>{userCT.userBirthDay}</p> */}
                    <p><b>Số điện thoại :</b> {userCT.userPhone}</p>
                    <p><b>Mật khẩu :</b> {userCT.userPassword}</p>
                    <p><b>priority :</b> {userCT.priority}</p>
                    </div>
                </Modal.Body>

            </Modal>
        </>
    )
}

export default ToppDetails2
