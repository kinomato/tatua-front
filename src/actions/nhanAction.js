

import {
    SET_XY_NHAN,
    SET_INFO_NHAN,
    CLEAR_INFO_NHAN
} from '../actions/types';

export const setInfoNhan = (nguoiGui) =>{
    return {
        type: SET_INFO_NHAN,
        payload: nguoiGui
    }
}
export const setXYNhan = ({address,lat, lng}) => {
    return {
        type: SET_XY_NHAN,
        payload: {address,lat,lng}
    }
}
export const clearInfoNhan = () => {
    return {
        type: CLEAR_INFO_NHAN
    }
}