import React, { Component } from 'react';
import {render} from 'react-dom';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import GooglePlaceAutocomplete from './MaterialGoogleAutocomplete.jsx';

class App extends React.Component {
  //Results from clicking on location
  getCoords(lat, lng){
    console.log(lat, lng);
  };

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <GooglePlaceAutocomplete
            googlePlacesType={'(regions)'}
            hintText={"Enter search term here..."}
            results={this.getCoords}
            // fullWidth={true}
        />
      </MuiThemeProvider>
    );
  }
}

render(<App/>, document.getElementById('app'));

export default App;
