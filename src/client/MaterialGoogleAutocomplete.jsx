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
    // console.log('populate data called');
    // console.log('data', array);
    // let formattedArray = array.map((item)=>{
    //   return item.description;
    // })
    // if (formattedArray !== this.state.formattedArray){
    //   this.setState({
    //     data: formattedArray
    //   }, ()=>{
    //     console.log('updated:', this.state.data);
    //   });
    // }
    // console.log(this.state.data);
  }

  updateInput (searchText){
    console.log('updateInput', this.state.data);
    this.setState({
      searchText: searchText
    },
    () => {
      let outerScope = this;
      // wait until state is populated
      // if (/\S/.test(this.state.searchText)) {
      this.service.getPlacePredictions({ input: this.state.searchText }, function(predictions, status) {
        // TODO:
        // handle case if it returns null
        console.log('updating predictions', predictions)
        console.log('current searchText', searchText);
        outerScope.populateData(predictions)
      });
      // }
    });
  }

  getCurrentDataState() {
    return this.state.data;
  }

    render() {
      // this.getUserLocation();
      return (
        <div>
          <AutoComplete
            animated={false}
            hintText="Type 'r', case insensitive"
            searchText={this.state.searchText}
            onUpdateInput={this.updateInput}
            onChange={this.updateInput}
            // onNewRequest={this.handleNewRequest}
            dataSource={this.state.data.map((item) => {
              return {
                text: item.description,
                value: (
                  <MenuItem
                    primaryText={item.description}
                    leftIcon={<Marker />} />
                )}
            })}
            filter={AutoComplete.noFilter}
            openOnFocus={true}
          />
        </div>
      );
    }
  }

export default GooglePlaceAutocomplete;
