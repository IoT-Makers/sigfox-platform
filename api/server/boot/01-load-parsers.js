'use strict';

var log = require('debug')('boot:01-load-parsers');

module.exports = function (app) {

  if (app.dataSources.db.name !== 'Memory' && !process.env.INITDB) {
    return
  }

  var Parser = app.models.Parser;

  function decode(message) {

    //private function
    function getBinaryFrame(frameHex) {
      var bytes = frameHex.match(/.{1,2}/g);
      if (bytes.length > 12) {
        console.log('Invalid frame, got %s bytes', bytes.length);
        return null;
      }
      var binaryString = '';
      bytes.forEach(function (byte) {
        binaryString += getBinaryFromHex(byte);

      });
      if (!binaryString.match(/^([0-9]*)$/)) {
        console.log('Unable to parse frame %s : %s', frameHex, binaryString);
        return null;
      }
      return binaryString;
    }

    function getBinaryFromHex(byte) {
      var num = Number(parseInt(byte, 16));
      if (isNaN(num)) {
        console.log('Invalid byte %s', byte);
        return null;
      }
      var binary = num.toString(2);

      //Fill the byte with zeros
      while (binary.length < 8) {
        binary = '0' + binary;
      }
      return binary;
    }

    //Declaration
    var parsedData = [];
    var obj = {};

    var framePattern = /(.{1})(.{2})(.{2})(.{3})(.{4})(.{4})/;
    var binaryFrame = getBinaryFrame(message.data);
    var frame = framePattern.exec(binaryFrame);
    console.log(frame);

    var type = parseInt(frame[2], 2);
    obj.key = "type";
    switch (type) {
      case 0:
        obj.value = "regular";
        break;
      case 1:
        obj.value = "button call";
        break;
      case 2:
        obj.value = "alert";
        break;
      case 3:
        obj.value = "new mode";
        break;
    }
    parsedData.push(obj);
    obj = {};


    var timeframe = parseInt(frame[3], 2);
    obj.key = "timeframe";
    switch (timeframe) {
      case 0:
        obj.value = "10 min";
        break;
      case 1:
        obj.value = "1 hour";
        break;
      case 2:
        obj.value = "6 hours";
        break;
      case 3:
        obj.value = "24 hours";
        break;
    }
    parsedData.push(obj);
    obj = {};


    var mode = parseInt(frame[4], 2);
    obj.key = "mode";
    switch (mode) {
      case 0:
        obj.value = "button";
        break;
      case 1:
        obj.value = "temperature and humidity";
        break;
      case 2:
        obj.value = "light";
        break;
      case 3:
        obj.value = "door";
        break;
      case 4:
        obj.value = "move";
        break;
      case 5:
        obj.value = "magnet";
        break;
    }
    parsedData.push(obj);
    obj = {};

    var temp = parseInt(frame[5], 2);
    obj.key = "temp";
    obj.value = (temp * 6.4) - 20;
    parsedData.push(obj);
    console.log(obj.value);
    obj = {};

    console.log(parsedData);
    return parsedData;

  };
  var parsers = [
    {
      "name": "Geoloc Wifi",
      "description": "Using the 2 strongest wifi MAC addresses near the device to call Google API to get geolocalisation position"
    },
    {
      "name": "Sensit",
      "description": "Decode the sensit sent data: Datasheet: https://api.sensit.io/resources/pdf/V2_uplink.pdf",
      "function": decode.toString()
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
      "description": "First byte is temperature, second humidity, third remaining voltage and fourth the alert"
    }
  ];

  function loadDefault() {
    console.error('Creating default parsers');

    parsers.forEach(function (parser) {
      Parser.findOrCreate(parser, function (err, createdParser, created) {
        if (err) {
          console.error(err);
        }
        (created) ? log('created parser', createdParser.name)
          : log('found parser', createdParser.name);
      });
    });
  }

  loadDefault();

};
