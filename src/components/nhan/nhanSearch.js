import React, { Component } from 'react';
import { connect} from 'react-redux';
import {setXYNhan} from '../../actions/nhanAction';
import LocationSearchInput from '../google/searchInput'; 

class NhanSearch extends Component {
    render() {
        return (
            <LocationSearchInput path={"/nhan/form"} onClick={this.props.setXYNhan}/>
        )
    }
}
export default connect(null,{setXYNhan})(NhanSearch)
