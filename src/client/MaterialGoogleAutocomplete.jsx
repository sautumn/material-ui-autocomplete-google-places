import React, { Component } from 'react';
import { AutoComplete, MenuItem } from 'material-ui';
import Marker from 'material-ui/svg-icons/maps/place';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

class GooglePlaceAutocomplete extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      searchText: '',
    };

    const google = window.google;
    this.geocoder = new google.maps.Geocoder;

    //Documentation for AutocompleteService
    //https://developers.google.com/maps/documentation/javascript/places-autocomplete#place_autocomplete_service
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

  updateInput (searchText){
    if (searchText.length > 0){
      this.setState({
        searchText: searchText,
      },
      () => {
        let outerScope = this;
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

  populateData (array) {
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
          //Used by Google Places API / No user input
          searchText={this.state.searchText}
          onUpdateInput={this.updateInput}
          onChange={this.updateInput}
          filter={AutoComplete.noFilter}
          onNewRequest={(chosenRequest, index)=>{
            let dataItem = this.state.data[index];
            // indexing bug
            if (!dataItem) {
              dataItem = this.state.data[0];
            }
            this.getLatLgn(dataItem.place_id, (results) => {
              this.props.results(results[0].geometry.location.lat(), results[0].geometry.location.lat());
            });
          }}
          dataSource={this.state.data.map((item, i, a) => {
            if (i === a.length - 1) {
              return {
                text: '',
                value: (
                  <MenuItem
                    style={{cursor: 'default'}}
                    disabled
                    children={
                      <div style={{paddingTop: 20}}>
                        <img
                          style={{float: 'right'}}
                          width={96}
                          height={12}
                          src={'./poweredbyGoogle.png'}
                          alt="presentation"
                        />
                      </div>
                    }
                  />
                )};
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
                  //Used by Google Places / No user input
                  primaryText={item.description}
                  leftIcon={
                    <Marker
                      style={{ width: '20px'}}
                    />
                  }
                />
              )};
          })
        }
        />
      </div>
    );
  }
  }

GooglePlaceAutocomplete.propTypes = {
  //Google componentRestrictions
  componentRestrictions: React.PropTypes.object,
  types: React.PropTypes.array,
  //AutoComplete properties
  anchorOrigin: React.PropTypes.object,
  animated: React.PropTypes.bool,
  animation: React.PropTypes.func,
  errorStyle: React.PropTypes.object,
  errorText: React.PropTypes.any,
  floatingLabelText: React.PropTypes.string,

  fullWidth: React.PropTypes.bool,

  hintText: React.PropTypes.string,
  listStyle: React.PropTypes.object,
  maxSearchResults: React.PropTypes.number,
  menuCloseDelay: React.PropTypes.number,
  menuProps: React.PropTypes.object,
  menuStyle: React.PropTypes.object,
  onClose: React.PropTypes.func,
  onNewRequest: React.PropTypes.func,
  onUpdateInput: React.PropTypes.func,
  open: React.PropTypes.bool,
  openOnFocus: React.PropTypes.bool,
  popoverProps: React.PropTypes.object,
  searchText: React.PropTypes.string,
  style: React.PropTypes.object,
  targetOrigin: React.PropTypes.object,
  textFieldStyle: React.PropTypes.object,
  //Prop types for dataSource
  innerDivStyle: React.PropTypes.object,
  menuItemStyle: React.PropTypes.object,
  results: React.PropTypes.func,
};

export default GooglePlaceAutocomplete;
