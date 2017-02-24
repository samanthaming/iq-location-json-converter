var sampleLocations = [{ "LocationType": null, "LocationSubType": null, "Address": { "AddressLine1": "9915-108A Avenue", "AddressLine2": null, "City": "Edmonton", "StateCode": "AB", "StateName": "Alberta", "CountryCode": "CA", "CountryName": "Canada", "Zip": "T5H4L6" }, "Contacts": [], "StorePhoneNumbers": [{ "Description": null, "Number": "7804460866", "Extension": null }], "Area": null, "StoreHours": { "Monday": { "Open": { "Hour": 8, "Minute": 0 }, "Close": { "Hour": 17, "Minute": 0 } }, "Tuesday": { "Open": { "Hour": 8, "Minute": 0 }, "Close": { "Hour": 17, "Minute": 0 } }, "Wednesday": { "Open": { "Hour": 8, "Minute": 0 }, "Close": { "Hour": 17, "Minute": 0 } }, "Thursday": { "Open": { "Hour": 8, "Minute": 0 }, "Close": { "Hour": 17, "Minute": 0 } }, "Friday": { "Open": { "Hour": 8, "Minute": 0 }, "Close": { "Hour": 17, "Minute": 0 } }, "Saturday": null, "Sunday": null }, "Geography": null, "TimeZone": null, "Id": 45356, "Name": "AirTouch Communications Ltd", "DisplayName": "", "Description": "", "Roles": [{ "Name": "Location" }], "Role": "Location", "SortName": "airtouch communications ltd", "Attributes": { "Abbreviation": "ATCDT" }, "Relationships": [{ "Id": 70535, "Definition": 11, "Source": 56876, "Destination": 45356, "CreatedUtc": "2015-06-09T10:19:08.539Z", "Version": 1 }], "Version": 427, "CreatedUtc": "2015-05-06T15:25:44.732Z", "LastModifiedUtc": "2017-02-22T09:30:44.101Z", "CorrelationId": "2", "ClientEntityId": null, "TypeId": 4122, "Logo": null }, { "LocationType": null, "LocationSubType": null, "Address": { "AddressLine1": "9915-108A Ave.", "AddressLine2": null, "City": "Edmonton", "StateCode": "AB", "StateName": "Alberta", "CountryCode": "CA", "CountryName": "Canada", "Zip": "T5H4L6" }, "Contacts": [], "StorePhoneNumbers": [{ "Description": null, "Number": "7804252355", "Extension": null }], "Area": null, "StoreHours": { "Monday": { "Open": { "Hour": 8, "Minute": 0 }, "Close": { "Hour": 17, "Minute": 0 } }, "Tuesday": { "Open": { "Hour": 8, "Minute": 0 }, "Close": { "Hour": 17, "Minute": 0 } }, "Wednesday": { "Open": { "Hour": 8, "Minute": 0 }, "Close": { "Hour": 17, "Minute": 0 } }, "Thursday": { "Open": { "Hour": 8, "Minute": 0 }, "Close": { "Hour": 17, "Minute": 0 } }, "Friday": { "Open": { "Hour": 8, "Minute": 0 }, "Close": { "Hour": 17, "Minute": 0 } }, "Saturday": null, "Sunday": null }, "Geography": null, "TimeZone": null, "Id": 45355, "Name": "Head Office", "DisplayName": "", "Description": "", "Roles": [{ "Name": "Location" }], "Role": "Location", "SortName": "head office", "Attributes": { "Abbreviation": "AMLDT" }, "Relationships": [{ "Id": 70534, "Definition": 11, "Source": 56876, "Destination": 45355, "CreatedUtc": "2015-06-09T10:19:05.816Z", "Version": 1 }], "Version": 437, "CreatedUtc": "2015-05-06T15:25:44.069Z", "LastModifiedUtc": "2017-02-22T09:30:43.397Z", "CorrelationId": "1", "ClientEntityId": null, "TypeId": 4122, "Logo": null }];

$(document).ready(function () {

  $('#json-form').on('submit', (e) => {
    e.preventDefault();
    let value = $('#json-textarea').val().trim();

    if (!value && !isJSON(value.toString())) {
      $('#json-form .form-group').addClass('has-error');
      $('#json-form .help-block').html('Invalid JSON');
    }
    else {
      $('#json-form .form-group').removeClass('has-error');
      $('#json-form .help-block').html('');

      generateTable(JSON.parse(value));
    }

  });

  $('#clear-form').on('click', (e) => {
    e.preventDefault();
    $('#json-textarea').val('');
  });

  $('#load-sample').on('click', (e) => {
    e.preventDefault();
    $('#json-textarea').val(JSON.stringify(sampleLocations));
  });

});


function defaultCategories() {
  let categories = ['Address', 'StorePhoneNumbers', 'Name', 'Id'];
  return categories;
}

function fetchLocation(locations, categories) {
  categories = categories || defaultCategories();

  return locations.map(location => {
    let {AddressLine1, City, StateName, CountryName, Zip} = location.Address;

    return categories.reduce((prev, cat) => {
      if (cat === 'Address') {
        prev[cat] = `${AddressLine1}, ${City} ${StateName} ${CountryName} ${Zip}`;
      }
      else if (cat === 'StorePhoneNumbers') {
        prev[cat] = location.StorePhoneNumbers[0] ? `${location.StorePhoneNumbers[0].Number}` : '';
      }
      else {
        prev[cat] = location[cat];
      }
      return prev;
    }, {});

  });
}

function generateTable(locations) {
  let categories = defaultCategories();
  let locs = fetchLocation(locations);

  let template = $('#csv-table-template').html();
  let compiled = _.template(template)({
    categories,
    locs
  });
  $('#csv-table').html(compiled);
}

function selectElementContents(el) {
    var body = document.body, range, sel;
    if (document.createRange && window.getSelection) {
        range = document.createRange();
        sel = window.getSelection();
        sel.removeAllRanges();
        try {
            range.selectNodeContents(el);
            sel.addRange(range);
        } catch (e) {
            range.selectNode(el);
            sel.addRange(range);
        }
    } else if (body.createTextRange) {
        range = body.createTextRange();
        range.moveToElementText(el);
        range.select();
    }
}
