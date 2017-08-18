'use strict';

module.exports = function (app) {

  if (app.dataSources.db.name !== 'Memory' && !process.env.INITDB) {
    return;
  }

  var Parser = app.models.Parser;

  function loadDefault() {
    console.error('Creating default parsers');

    var parsers = [
      {
        "name": "Geoloc Wifi",
        "description": "Using the 2 strongest wifi MAC addresses near the device to call Google API to get geolocalisation position"
      },
      {
        "name": "Sensit",
        "description": "Decode the sensit sent data"
      },
      {
        "name": "Tuto GPS",
        "description": "Decode the GPS data from the tutorial: https://www.instructables.com/id/Sigfox-GPS-Tracker/"
      },
      {
        "name": "Talking Plant",
        "description": "Get the plan information, first byte being humidity, second temperature and third brightness and forth alert"
      },
      {
        "name": "Forest Fire Alarm",
        "description": "First byte is temperature, second humidity, third remaining voltage and fourth if there is an alert"
      }
    ];

    parsers.forEach(function (parser) {
      Parser.create(parser, function (err) {
        if (err) {
          console.error(err);
        }
      });
    });
  }

  function loadExisting() {
    console.error('Loading existing parsers');

    Parser.find(function (data) {
      log(data);
    });
  }


  Parser.count(function (err, result) {
    if (err) {
      console.error(err);
    }
    if (result < 1) {
      loadDefault();
    } else {
      loadExisting();
    }
  });


};
