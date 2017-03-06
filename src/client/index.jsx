import React, { Component } from 'react';
import {render} from 'react-dom';
import GooglePlaceAutocomplete from './MaterialGoogleAutocomplete.jsx';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends React.Component {

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <GooglePlaceAutocomplete />
      </MuiThemeProvider>
    );
  }
}

render(<App/>, document.getElementById('app'));


export default App;
