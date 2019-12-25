import React from 'react'
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
function GoBackBtn(props) {
    let history = useHistory();
    return (
        <div className="mt-2">
            <Button className="backBtn" style={{left:'5vh'}} onClick={() => history.goBack()}><ArrowBackIosIcon/>Back</Button>
        </div>
    )
}

export default GoBackBtn