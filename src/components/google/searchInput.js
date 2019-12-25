import React, { Component } from 'react'
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import { ListGroup } from 'react-bootstrap';
import { Redirect, Link, withRouter } from 'react-router-dom'


 class LocationSearchInput extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            address: '',
            redirect: false
         };
    }

    handleChange = address => {
        this.setState({ address });
    };

    handleSelect = address => {
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => {
                console.log('Success', latLng);
                this.props.onClick({ address, ...latLng });
                this.setState({
                    redirect: true
                })
            })
            .catch(error => console.error('Error', error));
        // console.log(address)
        // this.handleChange(address);
        // console.log(this.props.path);
    };
    render() {
        if(this.state.redirect === false) {
            return (
                <div>
                    <PlacesAutocomplete
                        value={this.state.address}
                        onChange={this.handleChange}
                        onSelect={this.handleSelect}
                    >
                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                            <div>
                                <input className="form-control"
                                    {...getInputProps({
                                        placeholder: 'Search Places ...',
                                        className: 'form-control',
                                    })}
                                />
    
                                <div className="autocomplete-dropdown-container">
                                    {loading && <div>Loading...</div>}
                                    <ListGroup>
                                        {suggestions.map(suggestion => {
                                            const className = suggestion.active
                                                ? 'suggestion-item--active'
                                                : 'suggestion-item';
                                            // inline style for demonstration purpose
                                            const style = suggestion.active
                                                ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                                : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                                // console.log(suggestion)
                                            return (
                                                
                                                    <ListGroup.Item key={suggestion.id}>
                                                        
                                                        <div
                                                            {...getSuggestionItemProps(suggestion, {
                                                                className,
                                                                style,
                                                            })}
                                                        >
                                                            <span>{suggestion.description}</span>
                                                        </div>
                                                        
                                                    </ListGroup.Item>
                                               
    
                                            );
                                        })}
                                    </ListGroup>
    
    
                                </div>
                            </div>
                        )}
                    </PlacesAutocomplete>
                </div>
            )
        } else {
            return <Redirect to={{ pathname: this.props.path }} />
        }
        
    }
}
export default withRouter(LocationSearchInput)
// const mapStateToProps = state => ({

// })
// export default connect(null,{setXYGui})(LocationSearchInput)
