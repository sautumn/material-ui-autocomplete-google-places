# material-ui-google-places

React component that uses Google Places API AutocompleteService, Google Maps Geocoder, and Material-UI AutoComplete to replicate Google Places Autocomplete search dropdown in Material-UI. Returns latitude and longitude from selected item.

### To get started:

Include script tag in html file:
```
<head>
	<script src="https://maps.googleapis.com/maps/api/js?libraries=places"></script>
</head>
```

Install package:

```
$ npm install material-ui-google-places
```


Basic Use Case:
```
import GooglePlaceAutocomplete from 'material-ui-google-places';

class App extends React.Component {
  //Results from clicking on location
  getCoords(lat, lng){
    console.log(lat, lng);
  }

  render() {
    return (
      <GooglePlaceAutocomplete
      	//Function to return lat and lng
      	results={this.getCoords}
      />
    );
  }
}
```

### Optional Parameters for Google Places AutocompletionRequest object:

```
<GooglePlaceAutocomplete
  //Function to return lat and lng
  results={this.getCoords}

  //AutocompletionRequest object specification
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
* open - default: false}
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
