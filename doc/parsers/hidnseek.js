// 12 octets = 96 bits payload
// lat: 32, lon: 32, alt: 13 , spd: 7, bat: 7, mode: 3, cap: 2
// lat: 32, lon: 32, alt:0-8192m, spd:0-127Km/h, bat:0-100%, mode:0-7, cap: N/E/S/W
// int is 16 bits, float is 32 bits. All little endian

// Example payload: 6b89434295621340e43ed042 | 0000000000000000ee0d0000
// https://github.com/hidnseek/hidnseek/tree/master/arduino/libraries/HidnSeek/Examples/HidnSeek_v3_28

var payload,
    lat,
    lng,
    altitude,
    speed,
    battery,
    mode,
    pressure,
    temperature,
    cap,
    parsedData = [],
    obj = {};

// Lat - float 4 bytes - 32 bits little endian
var buffer = new ArrayBuffer(4);
var bytes = new Uint8Array(buffer);
bytes[0] = parseInt(payload.slice(0, 2), 16);
bytes[1] = parseInt(payload.slice(2, 4), 16);
bytes[2] = parseInt(payload.slice(4, 6), 16);
bytes[3] = parseInt(payload.slice(6, 8), 16);
var view = new DataView(buffer);
var bits_16 = view.getFloat32(0, true);

// Lng - float 4 bytes - 32 bits little endian
var buffer = new ArrayBuffer(4);
var bytes = new Uint8Array(buffer);
bytes[0] = parseInt(payload.slice(8, 10), 16);
bytes[1] = parseInt(payload.slice(10, 12), 16);
bytes[2] = parseInt(payload.slice(12, 14), 16);
bytes[3] = parseInt(payload.slice(14, 16), 16);
var view = new DataView(buffer);
var bits_32 = view.getFloat32(0, true);

// Cpx - uint 4 bytes - 32 bits little endian
var buffer = new ArrayBuffer(4);
var bytes = new Uint8Array(buffer);
bytes[0] = parseInt(payload.slice(16, 18), 16);
bytes[1] = parseInt(payload.slice(18, 20), 16);
bytes[2] = parseInt(payload.slice(20, 22), 16);
bytes[3] = parseInt(payload.slice(22, 24), 16);
var view = new DataView(buffer);
cpx = view.getUint32(0, true);

// Mode
mode = cpx & 7;

// Battery
battery = (cpx >> 3) & 0x7f;

// Altitude
altitude = 0x1fff & cpx >> 19;
if (altitude > 4096 && mode < 3) altitude = (altitude - 3840) * 16;

// Speed
speed = (cpx >> 12) & 0x7f;
if (speed > 102) speed = (speed - 94) * 16;
else if (speed > 90) speed = (speed - 60) * 3;

// Cap
cap = (cpx >> 10) & 3;
switch (cap) {
    case 0:
        cap = "N";
        break;
    case 1:
        cap = "E";
        break;
    case 2:
        cap = "S";
        break;
    case 3:
        cap = "W";
        break;
}

// Store objects in parsedData array
if (mode === 4 && altitude === 0) {
    temperature = bits_16.toFixed(2);
    pressure = bits_32.toFixed(2);
} else if (mode < 3) {
    lat = bits_16;
    lng = bits_32;
}

switch (mode) {
    case 3:
        mode = "MSG_PUSH_BUTTON";
        break;
    case 4:
        mode = "MSG_NO_MOTION";
        break;
    case 5:
        mode = "MSG_NO_GPS";
        break;
    case 6:
        mode = "MSG_MOTION_ALERT";
        break;
    case 7:
        mode = "MSG_WEAK_BAT";
        break;
    default:
        mode = "MSG_POSITION";
}
obj = {};
obj.key = "mode";
obj.value = mode;
obj.type = "string";
obj.unit = "";
parsedData.push(obj);
obj = {};
obj.key = "temperature";
obj.value = temperature;
obj.type = "number";
obj.unit = "°C";
parsedData.push(obj);
obj = {};
obj.key = "pressure";
obj.value = pressure;
obj.type = "number";
obj.unit = "hPa";
parsedData.push(obj);
obj = {};
obj.key = "speed";
obj.value = speed;
obj.type = "number";
obj.unit = "km/h";
parsedData.push(obj);
obj = {};
obj.key = "altitude";
obj.value = altitude;
obj.type = "number";
obj.unit = "m";
parsedData.push(obj);
obj = {};
obj.key = "lat";
obj.value = lat;
obj.type = "number";
obj.unit = "";
parsedData.push(obj);
obj = {};
obj.key = "lng";
obj.value = lng;
obj.type = "number";
obj.unit = "";
parsedData.push(obj);
obj = {};
obj.key = "cap";
obj.value = cap;
obj.type = "string";
obj.unit = "";
parsedData.push(obj);
obj = {};
obj.key = "battery";
obj.value = battery;
obj.type = "number";
obj.unit = "%";
parsedData.push(obj);

//console.log(parsedData);
return parsedData;
