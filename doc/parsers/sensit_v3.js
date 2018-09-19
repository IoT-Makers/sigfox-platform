var payload,
    battery,
    mode,
    humidity,
    temperature,
    light,
    door,
    vibration,
    magnet,
    alert,
    state,
    eventCount,
    firmwareVersion,
    parsedData = [],
    obj = {};

// Byte #0
var byte = parseInt(payload.slice(0, 2), 16).toString(2);
while (byte.length < 8)
    byte = '0' + byte;
battery = ((parseInt(byte.slice(0, 5), 2) * 0.05) + 2.7);
if (battery >= 4.15) {
    battery = 100;
} else if (battery >= 3.8 && battery < 4.15) {
    battery = Math.round((battery - 3.275) * 114);
} else if (battery >= 3.6 && battery < 3.8) {
    battery = Math.round((battery - 3.56) * 250);
} else if (battery > 3 && battery < 3.6) {
    battery = Math.round((battery - 3) * 16);
}
battery = battery < 0 ? 0 : battery;

// Byte #1
var byte = parseInt(payload.slice(2, 4), 16).toString(2);
while (byte.length < 8)
    byte = '0' + byte;

mode = parseInt(byte.slice(0, 5), 2);
switch (mode) {
    case 0:
        mode = 'Standby';
        break;
    case 1:
        mode = 'Temperature & Humidity';
        break;
    case 2:
        mode = 'Light';
        break;
    case 3:
        mode = 'Door';
        break;
    case 4:
        mode = 'Vibration';
        break;
    case 5:
        mode = 'Magnet';
        break;
    default:
        mode = 'Unknown mode {' + mode + '}';
}

alert = Boolean(parseInt(byte.slice(5, 6), 2));


// Standby mode
if (mode === 'Standby') {
    // Byte #2
    var byte = parseInt(payload.slice(4, 6), 16).toString(2);
    while (byte.length < 8)
        byte = '0' + byte;
    firmwareVersion = byte;
    // Byte #3
    var byte = parseInt(payload.slice(6, 8), 16).toString(2);
    while (byte.length < 8)
        byte = '0' + byte;
    firmwareVersion += byte;

    firmwareVersion = parseInt(firmwareVersion.slice(0, 4), 2) + '.' + parseInt(firmwareVersion.slice(4, 10), 2) + '.' + parseInt(firmwareVersion.slice(10, 16), 2);
}

// Temperature & Humidity
if (mode === 'Temperature & Humidity') {
    // Byte #1
    var byte = parseInt(payload.slice(2, 4), 16).toString(2);
    while (byte.length < 8)
        byte = '0' + byte;
    temperature = byte.slice(6, 8);
    // Byte #2
    var byte = parseInt(payload.slice(4, 6), 16).toString(2);
    while (byte.length < 8)
        byte = '0' + byte;
    temperature += byte;

    temperature = ((parseInt(temperature, 2) - 200) / 8).toFixed(2);
    // Byte #3
    humidity = parseInt(payload.slice(6, 8), 16) * 0.5;
}


// Light
if (mode === 'Light') {
    // Byte #2
    var byte = parseInt(payload.slice(4, 6), 16).toString(2);
    while (byte.length < 8)
        byte = '0' + byte;
    light = byte;
    // Byte #3
    var byte = parseInt(payload.slice(6, 8), 16).toString(2);
    while (byte.length < 8)
        byte = '0' + byte;
    light += byte;

    light = (parseInt(light, 2) / 96).toFixed(2);
}



// Door
if (mode === 'Door') {
    // Byte #1
    var byte = parseInt(payload.slice(2, 4), 16).toString(2);
    while (byte.length < 8)
        byte = '0' + byte;
    door = parseInt(byte.slice(6, 8), 2);
    switch (door) {
        case 0:
            door = 'The calibration of the Door mode has not been done';
            break;
        case 1:
            door = 'Unused value';
            break;
        case 2:
            door = 'Door is closed';
            state = 1;
            break;
        case 3:
            door = 'Door is open';
            state = 0;
            break;
        default:
            door = 'Unknown door status {' + door + '}';
    }
}


// Vibration
if (mode === 'Vibration') {
    // Byte #1
    var byte = parseInt(payload.slice(2, 4), 16).toString(2);
    while (byte.length < 8)
        byte = '0' + byte;
    vibration = parseInt(byte.slice(6, 8), 2);
    switch (vibration) {
        case 0:
            vibration = 'No vibration detected';
            state = 0;
            break;
        case 1:
            vibration = 'A vibration is detected';
            state = 1;
            break;
        case 2:
            vibration = 'Unused value';
            break;
        case 3:
            vibration = 'Unused value';
            break;
        default:
            vibration = 'Unknown vibration status {' + vibration + '}';
    }
}


// Magnet
if (mode === 'Magnet') {
    // Byte #1
    var byte = parseInt(payload.slice(2, 4), 16).toString(2);
    while (byte.length < 8)
        byte = '0' + byte;
    magnet = parseInt(byte.slice(6, 8), 2);
    switch (magnet) {
        case 0:
            magnet = 'No magnet detected';
            state = 0;
            break;
        case 1:
            magnet = 'A magnet is detected';
            state = 1;
            break;
        case 2:
            magnet = 'Unused value';
            break;
        case 3:
            magnet = 'Unused value';
            break;
        default:
            magnet = 'Unknown magnet status {' + magnet + '}';
    }
}


// Event count (Door - Vibration - Magnet)
if (mode === 'Door' || mode === 'Vibration' || mode === 'Magnet') {
    // Byte #2
    var byte = parseInt(payload.slice(4, 6), 16).toString(2);
    while (byte.length < 8)
        byte = '0' + byte;
    eventCount = byte;
    // Byte #3
    var byte = parseInt(payload.slice(6, 8), 16).toString(2);
    while (byte.length < 8)
        byte = '0' + byte;
    eventCount += byte;
    eventCount = parseInt(eventCount, 2);
}



// Store objects in parsedData array
obj = {};
obj.key = 'mode';
obj.value = mode;
obj.type = 'string';
obj.unit = '';
parsedData.push(obj);
obj = {};
obj.key = 'firmwareVersion';
obj.value = firmwareVersion;
obj.type = 'string';
obj.unit = '';
parsedData.push(obj);
obj = {};
obj.key = 'temperature';
obj.value = temperature;
obj.type = 'number';
obj.unit = '°C';
parsedData.push(obj);
obj = {};
obj.key = 'humidity';
obj.value = humidity;
obj.type = 'number';
obj.unit = '%';
parsedData.push(obj);
obj = {};
obj.key = 'light';
obj.value = light;
obj.type = 'number';
obj.unit = 'lux';
parsedData.push(obj);
obj = {};
obj.key = 'alert';
obj.value = alert;
obj.type = 'boolean';
obj.unit = '';
parsedData.push(obj);
obj = {};
obj.key = 'door';
obj.value = door;
obj.type = 'string';
obj.unit = '';
parsedData.push(obj);
obj = {};
obj.key = 'vibration';
obj.value = vibration;
obj.type = 'string';
obj.unit = '';
parsedData.push(obj);
obj = {};
obj.key = 'magnet';
obj.value = magnet;
obj.type = 'string';
obj.unit = '';
parsedData.push(obj);
obj = {};
obj.key = 'state';
obj.value = state;
obj.type = 'number';
obj.unit = '';
parsedData.push(obj);
obj = {};
obj.key = 'eventCount';
obj.value = eventCount;
obj.type = 'number';
obj.unit = '';
parsedData.push(obj);
obj = {};
obj.key = 'battery';
obj.value = battery;
obj.type = 'number';
obj.unit = '%';
parsedData.push(obj);

//console.log(parsedData);
return parsedData;
