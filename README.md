# Current Status of Project
Sadly this project has been neglected as our jobs have taken all of our attention. Sorry 😞

I've recently fixed breaking issues for **Material UI 0.17.0**, **the package currently only works with this legacy version**.

# The Good News 🎉
Some free time has come up and our goal is to do a complete rewrite with support for the latest Material UI (3.8.x as of this writing)

# material-ui-autocomplete-google-places

React component that uses Google Places API AutocompleteService, Google Maps Geocoder, and Material-UI AutoComplete to replicate Google Places Autocomplete search dropdown in Material-UI. Returns latitude and longitude from selected item.

Useful Links:
* [Material-UI Autocomplete](http://www.material-ui.com/#/components/auto-complete)
* [Google Places AutocompleteService](https://developers.google.com/maps/documentation/javascript/reference#AutocompleteService)

### To get started:

Include script tag in html file:
```html
<head>
  <script src="https://maps.googleapis.com/maps/api/js?libraries=places"></script>
</head>
```

Install package:

```
$ npm install material-ui-autocomplete-google-places
```


Basic Use Case:
```js
import GooglePlaceAutocomplete from 'material-ui-autocomplete-google-places';

class App extends React.Component {
  // Results from clicking on location
  getCoords(lat, lng){
    console.log(lat, lng);
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <GooglePlaceAutocomplete
        	// Function to return lat and lng
        	results={this.getCoords}
        />
      </MuiThemeProvider>
    );
  }
}
```

### Optional Parameters for Google Places AutocompletionRequest object:

```js
<GooglePlaceAutocomplete
  // Function to return lat and lng
  results={this.getCoords}

  // AutocompletionRequest object specification
  componentRestrictions={{country: 'au'}}
  types={['establishment']}
/>
```

### Available properties for GooglePlaceAutocomplete:

* anchorOrigin
* animated - default: true
* animation
* errorStyle
* errorText
* floatingLabelText
* fullWidth - default: true
* hintText - default: ' '
* listStyle
* maxSearchResults
* menuCloseDelay
* menuStyle
* onClose
* open - default: false
* style
* targetOrigin
* textFieldStyle

Edit dropdown menu via:

* menuItemStyle

Defaults for menuItemStyle
```
style={this.props.menuItemStyle || {
  fontSize: 13,
  display: 'block',
  paddingRight: 20,
  overflow: 'hidden',
 }
```
See [repo](https://github.com/sautumn/material-ui-autocomplete-google-places) for more details.


### License
This package is licensed under the terms of MIT License. See the LICENSE file for further information.
