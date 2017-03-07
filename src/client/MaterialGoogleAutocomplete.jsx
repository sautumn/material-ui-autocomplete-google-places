import React, { Component } from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import {render} from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const colors = [
  'Red',
  'Orange',
  'Yellow',
  'Green',
  'Blue',
  'Purple',
  'Black',
  'White',
];

class GooglePlaceAutocomplete extends Component {
  constructor(props) {
    super(props);
    // this.autocompleteService = new google.maps.places.AutocompleteService();
    this.state = {
      dataSource: [],
      data: [],
      searchText: ''
    };
    this.service = new google.maps.places.AutocompleteService(null, {
      types: ['geocode']
     });
    this.updateInput = this.updateInput.bind(this);
    // this.handleNewRequest = this.handleNewRequest.bind(this);
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


  updateInput (searchText){
    this.setState({
      searchText: searchText
    },
    () => {
      // wait until state is populated
      if (/\S/.test(this.state.searchText)) {
        this.service.getPlacePredictions({ input: this.state.searchText }, function(predictions, status) {
          // TODO:
          // handle case if it returns null
          console.log(predictions[0])
        });
      }
    });
  }

    // handleNewRequest(){
    //   console.log('on change triggered handlenewrequest');
    //   this.setState({
    //     searchText: this.state.searchText,
    //   });
    // };

    render() {
      // this.getUserLocation();
      return (
        <div>
          <AutoComplete
            hintText="Type 'r', case insensitive"
            searchText={this.state.searchText}
            onUpdateInput={this.updateInput}
            // onChange={this.handleNewRequest}
            // onNewRequest={this.handleNewRequest}
            dataSource={colors}
            filter={(searchText, key) => (key.indexOf(searchText) !== -1)}
            openOnFocus={true}
          />
        </div>
      );
    }
  }

export default GooglePlaceAutocomplete;
