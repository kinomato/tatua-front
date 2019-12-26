import React from 'react'
import { connect } from 'react-redux'
import { Form } from 'react-bootstrap'
import {searchProduct} from '../../actions/productAction'
const Searchbar = (props) => {
    function handleOnchange(event) {
        console.log('from searchbar' + event.target.value)
        props.searchProduct(event.target.value)
    }
    return (
        <div>
            <Form >
                <Form.Group controlId="formBasicsearch">
                    {/* <Form.Label>search:</Form.Label> */}
                    <Form.Control type="text" name="txtsearch" onChange={(event) => handleOnchange(event)} placeholder="Search product" />
                </Form.Group>

            </Form>
            {/* <Form.Control type="text" placeholder="search product"
            onChange={handleOnchange(event)} /> */}
        </div>
    )
}
const mapStateToProps = (state, ownProps) => ({

})


const mapDispatchToProps = {
    searchProduct

}
export default connect(mapStateToProps, mapDispatchToProps)(Searchbar)