import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export class History extends Component {
    static propTypes = {
        prop: PropTypes
    }

    render() {
        return (
            <div>
                hello history
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(History)
