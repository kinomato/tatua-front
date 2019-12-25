/* eslint-disable react/no-typos */
import React, { Component, Fragment } from 'react'
import { Container, Button, Table, ButtonGroup } from 'react-bootstrap'
import { BeatLoader } from 'react-spinners';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTopping } from '../../../actions/toppingAction'


class ToppingDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            msg: null
        }
    }
    static PropTypes = {
        toppCT: PropTypes.object.isRequired,
        getTopping: PropTypes.func.isRequired,
        loading: PropTypes.bool.isRequired,
        error: PropTypes.object.isRequired
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.getTopping(id);
    }
    componentDidUpdate(prevProps) {
        const { error } = this.props;
        if (error !== prevProps.error) {
            if (error.id === 'GET_TOPPING_FAIL') {
                this.setState({ msg: error.msg.msg });
            } else {
                this.setState({ msg: null });
            }
        }
    }

    render() {
        const { toppCT } = this.props;
        if (toppCT !== null) {
            return (
                <div>
                    <h1>THÔNG TIN CHI TIẾT TOPPING</h1>
                    <p><b>Mã topping : </b>{toppCT._id}</p>
                    <p><b>Tên topping : </b>{toppCT.toppName}</p>
                    <p><b>Giá topping : </b>{toppCT.toppPrize}</p>
                </div>

            );
        }
        return false
    }
}
const mapStateToProps = state => ({
    toppCT: state.topping.toppCT,
    loading: state.topping.loading,
    error: state.error
})
export default connect(mapStateToProps, { getTopping })(ToppingDetail)