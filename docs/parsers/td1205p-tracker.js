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

if (payload.length == 24) {
    obj.key = "message_type";
    obj.value = 'Normal';
    obj.type = "string";
    obj.unit = "";
    parsedData.push(obj);
    obj = {};

    var framePattern = /(.{1})(.{31})(.{1})(.{31})(.{2})(.{2})(.{4})(.{4})(.{4})(.{8})(.{8})/;
    var binaryFrame = getBinaryFrame(payload);
    var frame = framePattern.exec(binaryFrame);


    var lat = (frame[1] === "1" ? -1 : 1) * getDecimalCoord(parseInt(frame[2], 2) / Math.pow(10, 6));
    //console.log('lat:', lat);

    obj.key = "lat";
    obj.value = lat;
    obj.type = "number";
    obj.unit = "";
    parsedData.push(obj);
    obj = {};

    var lng = (frame[3] === "1" ? -1 : 1) * getDecimalCoord(parseInt(frame[4], 2) / Math.pow(10, 6));
    //console.log('long:', lng);

    obj.key = "lng";
    obj.value = lng;
    obj.type = "number";
    obj.unit = "";
    parsedData.push(obj);
    obj = {};

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
    obj.type = "number";
    obj.unit = "";
    parsedData.push(obj);
    obj = {};

    var sat = parseInt(frame[6], 2);
    //console.log('nbSat:', frame[6]);
    //console.log('nbSat:', sat);
    obj.key = "sat";
    obj.value = sat * 2 + 2;
    obj.type = "number";
    obj.unit = "";
    parsedData.push(obj);
    obj = {};

    var gps_acq = parseInt(frame[8], 2);
    //console.log('gps_acq:', frame[8]);
    //console.log('gps_acq:', gps_acq);
    obj.key = "gps_acq";
    obj.type = "number";
    obj.unit = "seconds";
    obj.value = gps_acq * 5;
    parsedData.push(obj);
    obj = {};

    var speed = parseInt(frame[9], 2);
    //console.log('speed:', frame[9]);
    //console.log('speed:', speed);
    obj.key = "speed";
    obj.value = speed * 5;
    obj.type = "number";
    obj.unit = "km/h";
    parsedData.push(obj);
    obj = {};

    var battery = parseInt(frame[10], 2);
    //console.log('battery', frame[10]);
    //console.log('battery', battery);
    obj.key = "battery";
    obj.value = battery * 15 / 1000;
    obj.type = "number";
    obj.unit = "V";
    parsedData.push(obj);
    obj = {};


    var alert = parseInt(frame[11], 2);
    //console.log('alert', frame[11]);
    //console.log('alert', alert);
    obj.key = "alert";
    obj.value = alert;
    obj.type = "number";
    obj.unit = "";
    parsedData.push(obj);
    obj = {};

    return parsedData;
}

if (payload.length == 2 || payload.length == 4) {
    obj.key = "message_type";
    obj.value = "Timeout";
    obj.type = "string";
    obj.unit = "";
    parsedData.push(obj);
    obj = {};
    if(payload.length == 4){
        var battery = parseInt('0x'+payload.substring(0,2));
        var alert = parseInt('0x'+payload.substring(2,4))
    }else{
        var battery = parseInt(payload, 16);
    }

    obj.key = "lat";
    obj.value = null;
    obj.type = "number";
    obj.unit = "";
    parsedData.push(obj);
    obj = {};


    obj.key = "lng";
    obj.value = null;
    obj.type = "number";
    obj.unit = "";
    parsedData.push(obj);
    obj = {};


    obj.key = "hdop";
    obj.value = null;
    obj.type = "number";
    obj.unit = "";
    parsedData.push(obj);
    obj = {};


    obj.key = "sat";
    obj.value = null;
    obj.type = "number";
    obj.unit = "";
    parsedData.push(obj);
    obj = {};


    obj.key = "gps_acq";
    obj.type = "number";
    obj.unit = "seconds";
    obj.value = null;
    parsedData.push(obj);
    obj = {};

    obj.key = "speed";
    obj.value = null;
    obj.type = "number";
    obj.unit = "km/h";
    parsedData.push(obj);
    obj = {};

    //console.log('battery', message.data);
    //console.log('battery', battery);
    obj.key = "battery";
    obj.value = battery * 15 / 1000;
    obj.type = "number";
    obj.unit = "V";
    parsedData.push(obj);
    obj = {};

    obj.key = "alert";
    obj.value = alert;
    obj.type = "number";
    obj.unit = "";
    parsedData.push(obj);
    obj = {};

    //console.log(parsedData);
    return parsedData;
}