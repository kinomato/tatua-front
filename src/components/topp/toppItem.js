import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {  Form } from 'react-bootstrap'
import {addCartTopp, removeCartTopp} from '../../actions/toppingAction'

export class ToppItem extends Component {
    constructor(props) {
        super(props)
        // this.handleChange = this.handleChange.bind(this);
        // this.handleIsItChecked = this.handleIsItChecked.bind(this);
        // this.handleToggle = this.handleToggle.bind(this);
        this.state = {
            checkboxChecked: false,
            isdisabled: false
        }
       
    }
    static propTypes = {
        prop: PropTypes
    }
    async handleChange(evt) {
        const { topp, carttopps } = this.props;
        await this.setState({ 
            checkboxChecked: evt.target.checked 
        })
        const tempcart = carttopps;
        const {checkboxChecked} = this.state;
        // console.log(this.state.checkboxChecked)
        if (checkboxChecked) {
            await this.props.addCartTopp(topp,tempcart)
        }else {
            await this.props.removeCartTopp(topp._id,tempcart)
        }
        
    }
    checkToDisable() {
        const newtopps = this.props.carttopps;
        console.log(newtopps.length)
        if(newtopps.length >2) {
            this.setState({
                isdisabled: true
            })
        } else {
            this.setState({
                isdisabled: false
            })
        }
    }
    
    handleIsItChecked() {
        console.log(this.state.checkboxChecked ? 'Yes' : 'No');
    }

    handleToggle() {
        this.setState({ checkboxChecked: !this.state.checkboxChecked });
    }
    componentDidUpdate(prevprops) {
        if(this.props.carttopps !== prevprops.carttopps)
        this.checkToDisable();
    }
    render() {
        const { topp } = this.props;
        return (
            <>
             <Form.Check
                checked={ this.state.checkboxChecked}
                onChange={(e) => this.handleChange(e)}
                type="checkbox"
                disabled = {this.state.isdisabled && !this.state.checkboxChecked}
                id={`yolo-${topp.toppName}`}
                label={`${topp.toppName} - ${topp.toppPrize}`}
            />
            {/* <Button variant="primary" onClick={() => this.handleIsItChecked()}>test</Button>
            <Button variant="primary" onClick={() => this.handleToggle()}>test1</Button> */}
            </>
           
        )
    }
}

const mapStateToProps = (state) => ({
    carttopps: state.topping.carttopps
})

const mapDispatchToProps = {
    addCartTopp,
    removeCartTopp
}

export default connect(mapStateToProps, mapDispatchToProps)(ToppItem)
