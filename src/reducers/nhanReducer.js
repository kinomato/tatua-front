import {
    SET_INFO_NHAN,
    CLEAR_INFO_NHAN,
    SET_XY_NHAN
} from '../actions/types';

const initialState = {
    diaChiM: '',
    latM: null,
    lngM: null,
    hoTenNhan: '',
    sdtNhan: '',
    diaChiNhan: '',
    diaChiCTNhan: '', 
    latNhan: null,
    lngNhan: null,
    
}
export default function (state = initialState, action) {
    switch (action.type) {
        case SET_INFO_NHAN:
            return {
                ...state,
                hoTenNhan: action.payload.hoTenNhan,
                sdtNhan: action.payload.sdtNhan,
                diaChiCTNhan: action.payload.diaChiCTNhan
            }
        case SET_XY_NHAN:
            return {
                ...state,
                diaChiNhan: action.payload.address,
                latNhan: action.payload.lat,
                lngNhan: action.payload.lng

            }
        case CLEAR_INFO_NHAN:
            return {
                ...state,
            }
        default:
            return state;
    }
}