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
    this.service = new google.maps.places.AutocompleteService(null, {
      types: ['geocode']
     });
    this.updateInput = this.updateInput.bind(this);
    this.populateData = this.populateData.bind(this);
    this.getCurrentDataState = this.getCurrentDataState.bind(this);
  }

  // getUserLocation () {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(position =>{
  //       let geolocation = {
  //         lat: position.coords.latitude,
  //         lng: position.coords.longitude,
  //       };
  //       let circle = new google.maps.Circle({
  //         center: geolocation,
  //         radius: position.coords.accuracy,
  //       });
  //       // autocomplete.setBounds(circle.getBounds());
  //       // console.log(position);
  //     });
  //   }
  // }
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
        // wait until state is populated
        // if (/\S/.test(this.state.searchText)) {
        console.log('input', this.state.searchText)
        this.service.getPlacePredictions({ input: this.state.searchText }, function(predictions, status) {
          // TODO:
          // handle case if it returns null
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

    render() {
      console.log(this.props.hintText);
      return (
        <div>
          <AutoComplete
            animated={this.props.animated}
            hintText={this.props.hintText}
            //Static vars for package / No user input
            searchText={this.state.searchText}
            //Provided by Google Places API
            onUpdateInput={this.updateInput}
            onChange={this.updateInput}
            dataSource={this.state.data.map((item) => {
              return {
                text: item.description,
                value: (
                  <MenuItem
                    // autoWidth={true}
                    style={{whiteSpace: 'normal'}}
                    primaryText={item.description}
                    leftIcon={<Marker />} />
                )}
            })}
            filter={AutoComplete.noFilter}
          />
        </div>
      );
    }
  }

export default GooglePlaceAutocomplete;
