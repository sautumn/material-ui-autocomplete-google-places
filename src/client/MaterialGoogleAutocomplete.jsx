import React, { Component } from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import {render} from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Marker from 'material-ui/svg-icons/maps/place';
injectTapEventPlugin();

class GooglePlaceAutocomplete extends Component {
  constructor(props) {
    super(props);
    // this.autocompleteService = new google.maps.places.AutocompleteService();
    this.state = {
      data: [],
      searchText: ''
    };
    this.geocoder = new google.maps.Geocoder;
    this.service = new google.maps.places.AutocompleteService(null, {
      componentRestrictions: {'country':'us'},
      types: 'geocode',
      language: 'fr'
     });
    // binding for functions
    this.updateInput = this.updateInput.bind(this);
    this.populateData = this.populateData.bind(this);
    this.getCurrentDataState = this.getCurrentDataState.bind(this);
    this.getLatLgn = this.getLatLgn.bind(this);

  }

  populateData (array) {

    this.setState({ data: array });
  }

  updateInput (searchText){
    if (searchText.length > 0){
      this.setState({
        searchText: searchText
      },
      () => {
        let outerScope = this;
        this.service.getPlacePredictions({ input: this.state.searchText }, function(predictions, status) {
          if (predictions) {
            outerScope.populateData(predictions);
          }
        });
      });
    }
  }

  getCurrentDataState() {
    return this.state.data;
  }

  getLatLgn(locationID, cb) {
    this.geocoder.geocode({ placeId: locationID }, (results, status) => {
      cb(results, status);
    });
  }

    render() {
      return (
        <div>
          <AutoComplete
            anchorOrigin={this.props.anchorOrigin || { vertical: 'bottom', horizontal: 'left',}}
            animated={this.props.animated || true }
            animation={this.props.animation}
            disableFocusRipple={this.props.disableFocusRipple || true}
            errorStyle={this.props.errorStyle}
            errorText={this.props.errorText}
            filter={this.props.filter}
            floatingLabelText={this.props.floatingLabelText}
            fullWidth={this.props.fullWidth || false}
            hintText={this.props.hintText || 'Enter search term here...'}
            listStyle={this.props.listStyle}
            maxSearchResults={this.props.maxSearchResults}
            menuCloseDelay={this.props.menuCloseDelay || 300}
            onClose={this.props.onClose}
            onNewRequest={this.props.onNewRequest}
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
              if (!dataItem){
                dataItem = this.state.data[0];
              }
              this.getLatLgn(dataItem.place_id, (results, status) => {
                console.log(results[0].geometry.location.lat(), results[0].geometry.location.lat());
              })
            }}
            dataSource={this.state.data.map((item) => {
              return {
                text: item.description,
                value: (
                  <MenuItem
                    style={this.props.menuItemStyle || { fontSize: '12px'}}
                    innerDivStyle={this.props.innerDivStyle || { paddingLeft: 38 }}
                    //Used by Google Places / No user input
                    primaryText={item.description}
                    // onTouchTap={console.log('item',item.place_id)}
                    leftIcon={<Marker
                      style={{ width: '20px'}}
                    />}
                  />
                )}
            })
          }
          />
        </div>
      );
    }
  }

export default GooglePlaceAutocomplete;

{/* <Menu disableAutoFocus={true}>
  <MenuItem leftIcon={<Search color='#fff'/>} disabled={true}>
    <AutoComplete hintText='Search'/>
  </MenuItem>
</Menu>  */}
