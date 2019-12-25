import React, { useState } from 'react'
import Login from './login';
import { Nav } from 'react-bootstrap';
export default function LoginBtn() {
    const [show, setShow] = useState(false);
    const handleKickBack = () => {
        setShow(false);
    }
    return (
        <div>
            <Nav.Link onClick={() => setShow(true)} href="#">
                    Login
            </Nav.Link>
            <Login onClick={handleKickBack} temp={show} />
        </div>
    )
}
