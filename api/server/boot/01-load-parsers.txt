'use strict';

var log = require('debug')('boot:01-load-parsers');

module.exports = function (app) {

  if (app.dataSources.db.name !== 'Memory' && process.env.INITDB != false) {
    return;
  }

  var Parser = app.models.Parser;

  function decodeSensit() {
    var payload;

    //private function
    function getBinaryFrame(payload) {
      var bytes = payload.match(/.{1,2}/g);
      if (bytes.length > 12) {
        console.log('Invalid frame, got %s bytes', bytes.length);
        return null;
      }
      var binaryString = '';
      bytes.forEach(function (byte) {
        binaryString += getBinaryFromHex(byte);

      });
      if (!binaryString.match(/^([0-9]*)$/)) {
        console.log('Unable to parse frame %s : %s', payload, binaryString);
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

  function decodeTutoGPS(){
    var payload;
    //Private functions

    function getBinaryFrame(payload) {
    //  console.log('getFrameBinary', payload);
      var bytes = payload.match(/.{1,2}/g);
      // if (bytes.length !== 12) {
      //   console.log('Invalid frame, got %s bytes', bytes.length);
      //   return null;
      // }
      var binaryString = '';
      bytes.forEach(function (byte) {
        binaryString += getBinaryFromHex(byte);

      });
      if (!binaryString.match(/^([0-9]*)$/)) {
        console.log('Unable to parse frame %s : %s', payload, binaryString);
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
    function getDecimalCoord(sigfoxFrame) {
      var degrees = Math.floor(sigfoxFrame);
      var minutes = sigfoxFrame % 1 / 60 * 100;
      minutes = Math.round(minutes * 10000) / 10000;
      return degrees + minutes;

    }

    //Main
    //console.log(message.data.length);

    var parsedData = [];
    var obj = {};

    if (message.data.length == 24) {
      obj.key = "message_type";
      obj.value = 'Normal';
      parsedData.push(obj);
      obj = {};

      var framePattern = /(.{1})(.{31})(.{1})(.{31})(.{2})(.{2})(.{4})(.{4})(.{4})(.{8})(.{8})/;
      var binaryFrame = getBinaryFrame(message.data);
      var frame = framePattern.exec(binaryFrame);


      var lat = (frame[1] === "1" ? -1 : 1) * getDecimalCoord(parseInt(frame[2], 2) / Math.pow(10, 6));
      //console.log('lat:', lat);

      obj.key = "lat";
      obj.value = lat;
      parsedData.push(obj);
      obj = {};

      var lng = (frame[3] === "1" ? -1 : 1) * getDecimalCoord(parseInt(frame[4], 2) / Math.pow(10, 6));
      //console.log('long:', lng);

      obj.key = "long";
      obj.value = lng;
      parsedData.push(obj);
      obj = {};

      message.geoloc = {
        gps:{
          lat: lat,
          long: lng
        }
      };

      var hdop = parseInt(frame[5], 2);
      //console.log('hdop:', frame[5]);
      //console.log('hdop:', hdop);
      obj.key = "hdop";
      switch (hdop) {
        case 3:
          obj.value = 600;
          break;
        case 2:
          obj.value = 200;
          break;
        case 1:
          obj.value =  100;
          break;
        case 0:
          obj.value =  0;
          break;
      }
      parsedData.push(obj);
      obj = {};


      var sat = parseInt(frame[6], 2);
      //console.log('nbSat:', frame[6]);
      //console.log('nbSat:', sat);
      obj.key = "sat";
      obj.value = sat * 2 + 2;
      parsedData.push(obj);
      obj = {};

      var gps_acq = parseInt(frame[8], 2);
      //console.log('gps_acq:', frame[8]);
      //console.log('gps_acq:', gps_acq);
      obj.key = "gps_acq";
      obj.value = gps_acq * 5;
      parsedData.push(obj);
      obj = {};

      var speed = parseInt(frame[9], 2);
      //console.log('speed:', frame[9]);
      //console.log('speed:', speed);
      obj.key = "speed";
      obj.value = speed * 5;
      parsedData.push(obj);
      obj = {};

      var battery = parseInt(frame[10], 2);
      //console.log('battery', frame[10]);
      //console.log('battery', battery);
      obj.key = "battery";
      obj.value = battery * 15 / 1000;
      parsedData.push(obj);
      obj = {};


      var alert = parseInt(frame[11], 2);
      //console.log('alert', frame[11]);
      //console.log('alert', alert);
      obj.key = "alert";
      obj.value = alert;
      parsedData.push(obj);
      obj = {};

      return parsedData;
    }

    if (message.data.length == 2 || message.data.length == 4) {
      obj.key = "message_type";
      obj.value = "Timeout";
      parsedData.push(obj);
      obj = {};
      if(message.data.length == 4){
        var battery = parseInt(message.data.substring(0,2), 16);
      }else{
        var battery = parseInt(message.data, 16);
      }
      //console.log('battery', message.data);
      //console.log('battery', battery);
      obj.key = "battery";
      obj.value = battery * 15 / 1000;
      parsedData.push(obj);

      //console.log(parsedData);
      return parsedData;
    }

  };

  function decodeHidenseek(){
    var payload = "000000000000000000000000000";
    // Get latitude - float 4 bytes
    var buffer = new ArrayBuffer(4);
    var bytes = new Uint8Array(buffer);
    bytes[0] = "0x" + payload.substring(0,2);
    bytes[1] = "0x" + payload.substring(2,4);
    bytes[2] = "0x" + payload.substring(4,6);
    bytes[3] = "0x" + payload.substring(6,8);
    var view = new DataView(buffer);
    var lat = view.getFloat32(0, true);
    // Get longitude - float 4 bytes
    buffer = new ArrayBuffer(4);
    bytes = new Uint8Array(buffer);
    bytes[0] = "0x" + payload.substring(8,10);
    bytes[1] = "0x" + payload.substring(10,12);
    bytes[2] = "0x" + payload.substring(12,14);
    bytes[3] = "0x" + payload.substring(14,16);
    view = new DataView(buffer);
    var lng = view.getFloat32(0, true);
    // Get options - uint 4 bytes 32 bit little endian
    buffer = new ArrayBuffer(4);
    bytes = new Uint8Array(buffer);
    bytes[0] = "0x" + payload.substring(16,18);
    bytes[1] = "0x" + payload.substring(18,20);
    bytes[2] = "0x" + payload.substring(20,22);
    bytes[3] = "0x" + payload.substring(22,24);
    view = new DataView(buffer);
    var cpx = view.getUint32(0, true);

    var alt = 0x1fff & cpx >> 19;
    var speed = (cpx >> 12) & 0xff;
    if (speed > 102) speed = (speed - 94) * 16;
    else if (speed > 90) speed = (speed - 60) * 3;
    var cap = (cpx >> 10) & 3;
    var bat = (cpx >> 3) & 0xff;
    var mod = cpx & 7;

    var parsedData = [];

    var obj = {};
    var gps = {};
    gps.lat = lat;
    gps.lng = lng;
    obj.gps = gps;
    obj.alt = alt;
    obj.speed = speed;
    obj.cap = cap;
    obj.bat = bat;
    obj.mod = mod;

    parsedData.push(obj);

    return parsedData;
  }

  function decodeTalkingPlant(){
    var payload = "000000000000000000000000000";
    var result = [
      {
        "key": "temperature",
        "value": parseInt('0x' + payload.substring(0,2))
      },
      {
        "key": "humidity",
        "value": parseInt('0x' + payload.substring(2,4))
      },
      {
        "key": "Battery",
        "value": parseInt('0x' + payload.substring(4,6))
      },
      {
        "key": "Alert",
        "value": parseInt('0x'+ payload.substring(6,8))
      }
    ];
    return result;
  }

  var parsers = [
    {
      "name": "Geoloc Wifi",
      "description": "Using the 2 strongest wifi MAC addresses near the device to call Google API to get geolocalisation position"
    },
    {
      "name": "Sensit",
      "description": "Decode the sensit sent data: Datasheet: https://api.sensit.io/resources/pdf/V2_uplink.pdf",
      "function": decodeSensit.toString()
    },
    {
      "name": "Tuto GPS",
      "description": "Decode the GPS data from the tutorial: https://www.instructables.com/id/Sigfox-GPS-Tracker/",
      "function": decodeTutoGPS.toString()
    },
    {
      "name": "Talking Plant",
      "description": "Get the plan information, first byte being humidity, second temperature and third brightness and forth alert",
      "function": decodeTalkingPlant().toString()
    },
    {
      "name": "Forest Fire Alarm",
      "description": "First byte is temperature, second humidity, third remaining voltage and fourth the alert"
    },
    {
      "name": "Hidenseek",
      "description": "https://github.com/hidnseek/hidnseek/blob/master/arduino/libraries/HidnSeek/Examples/HidnSeek_v3_28/HidnSeek_v3_28.ino",
      "function": decodeHidenseek().toString()
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
