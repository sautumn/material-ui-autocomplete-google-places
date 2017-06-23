import React, { Component } from 'react';
import { AutoComplete, MenuItem } from 'material-ui';
import Marker from 'material-ui/svg-icons/maps/place';
import PropTypes from 'prop-types';

class GooglePlaceAutocomplete extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      searchText: '',
    };

    const google = window.google;
    this.geocoder = new google.maps.Geocoder;

    // Documentation for AutocompleteService
    // https://developers.google.com/maps/documentation/javascript/places-autocomplete#place_autocomplete_service
    this.service = new google.maps.places.AutocompleteService(null);

    // binding for functions
    this.updateInput = this.updateInput.bind(this);
    this.populateData = this.populateData.bind(this);
    this.getCurrentDataState = this.getCurrentDataState.bind(this);
    this.getLatLgn = this.getLatLgn.bind(this);
  }

  getCurrentDataState() {
    return this.state.data;
  }

  getLatLgn(locationID, cb) {
    this.geocoder.geocode({ placeId: locationID }, (results, status) => {
      cb(results, status);
    });
  }

  updateInput(searchText) {
    if (searchText.length > 0) {
      this.setState({
        searchText,
      },
      () => {
        const outerScope = this;
        this.service.getPlacePredictions({
          input: this.state.searchText,
          componentRestrictions: this.props.componentRestrictions,
          types: this.props.types,
        },
          (predictions) => {
            if (predictions) {
              outerScope.populateData(predictions);
            }
          });
      });
    }
  }

  populateData(array) {
    this.setState({ data: array });
  }
  render() {
    return (
      <div>
        <AutoComplete
          anchorOrigin={this.props.anchorOrigin}
          animated={this.props.animated || true}
          animation={this.props.animation}
          errorStyle={this.props.errorStyle}
          errorText={this.props.errorText}
          floatingLabelText={this.props.floatingLabelText}
          fullWidth={this.props.fullWidth || true}
          hintText={this.props.hintText || ' '}
          listStyle={this.props.listStyle}
          maxSearchResults={this.props.maxSearchResults}
          menuCloseDelay={this.props.menuCloseDelay}
          menuStyle={this.props.menuStyle}
          onClose={this.props.onClose}
          open={this.props.open || false}
          style={this.props.style}
          targetOrigin={this.props.targetOrigin}
          textFieldStyle={this.props.textFieldStyle}
          // Used by Google Places API / No user input
          searchText={this.state.searchText}
          onUpdateInput={this.updateInput}
          onChange={this.updateInput}
          filter={AutoComplete.noFilter}
          onNewRequest={(chosenRequest, index) => {
            let dataItem = this.state.data[index];
            // indexing bug
            if (!dataItem) {
              dataItem = this.state.data[0];
            }
            this.getLatLgn(dataItem.place_id, (results) => {
              this.props.results(
                results[0].geometry.location.lat(),
                results[0].geometry.location.lng(),
              );
            });
          }}
          dataSource={this.state.data.map((item, i, a) => {
            if (i === a.length - 1) {
              return {
                text: '',
                value: (
                  <MenuItem
                    style={{ cursor: 'default' }}
                    disabled
                    children={
                      <div style={{ paddingTop: 20 }}>
                        <img
                          style={{ float: 'right' }}
                          width={96}
                          height={12}
                          src="https://developers.google.com/places/documentation/images/powered-by-google-on-white.png"
                          alt="presentation"
                        />
                      </div>
                    }
                  />
                ) };
            }
            return {
              text: item.description,
              value: (
                <MenuItem
                  style={this.props.menuItemStyle || {
                    fontSize: 13,
                    display: 'block',
                    paddingRight: 20,
                    overflow: 'hidden',
                  }}
                  innerDivStyle={this.props.innerDivStyle || { paddingRight: 38, paddingLeft: 38 }}
                  // Used by Google Places / No user input
                  primaryText={item.description}
                  leftIcon={
                    <Marker
                      style={{ width: '20px' }}
                    />
                  }
                />
              ) };
          })
        }
        />
      </div>
    );
  }
  }

GooglePlaceAutocomplete.propTypes = {
  // Google componentRestrictions
  componentRestrictions: PropTypes.object,
  types: PropTypes.array,
  // AutoComplete properties
  anchorOrigin: PropTypes.object,
  animated: PropTypes.bool,
  animation: PropTypes.func,
  errorStyle: PropTypes.object,
  errorText: PropTypes.any,
  floatingLabelText: PropTypes.string,
  fullWidth: PropTypes.bool,
  hintText: PropTypes.string,
  listStyle: PropTypes.object,
  maxSearchResults: PropTypes.number,
  menuCloseDelay: PropTypes.number,
  menuProps: PropTypes.object,
  menuStyle: PropTypes.object,
  onClose: PropTypes.func,
  onNewRequest: PropTypes.func,
  onUpdateInput: PropTypes.func,
  open: PropTypes.bool,
  openOnFocus: PropTypes.bool,
  popoverProps: PropTypes.object,
  searchText: PropTypes.string,
  style: PropTypes.object,
  targetOrigin: PropTypes.object,
  textFieldStyle: PropTypes.object,
  // Prop types for dataSource
  innerDivStyle: PropTypes.object,
  menuItemStyle: PropTypes.object,
  results: PropTypes.func,
};

export default GooglePlaceAutocomplete;
