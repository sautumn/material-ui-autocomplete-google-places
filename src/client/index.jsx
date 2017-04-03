import React from 'react';
import {render} from 'react-dom';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import GooglePlaceAutocomplete from './MaterialGoogleAutocomplete.jsx';

class App extends React.Component {
  //Results from clicking on location
  getCoords(lat, lng){
    console.log(lat, lng);
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <GooglePlaceAutocomplete
          //Function to return lat and lng
          results={this.getCoords}

          //OPTIONAL
          //AutocompletionRequest object specification
          // componentRestrictions={{
          //   // types: ['(address)']
          //   country: 'au'
          // }}
          // types={['establishment']}


          //Search term text
          // hintText={'Enter search term here...'}
          //Set input bar to full width

        />
      </MuiThemeProvider>
    );
  }
}

render(<App />, document.getElementById('app'));

export default App;
