var payload,
    battery,
    type,
    timeFrame,
    mode,
    humidity,
    temperature,
    light,
    alert,
    eventCount,
    state,
    firmwareVersion,
    parsedData = [],
    obj = {};

// Byte #1
var byte = parseInt(payload.slice(0, 2), 16).toString(2);
while (byte.length < 8)
    byte = '0' + byte;
battery = byte.slice(0, 1);
type = parseInt(byte.slice(1, 3), 2);

switch (type) {
    case 0:
        type = 'Classic';
        break;
    case 1:
        type = 'Button';
        alert = true;
        break;
    case 2:
        type = 'Alert';
        break;
    case 3:
        type = 'New Mode';
        break;
    default:
        type = 'Unknown {' + type + '}';
}
timeFrame = parseInt(byte.slice(3, 5), 2);
switch (timeFrame) {
    case 0:
        timeFrame = '10 minutes';
        break;
    case 1:
        timeFrame = '1 hour';
        break;
    case 2:
        timeFrame = '6 days';
        break;
    case 3:
        timeFrame = '24 hours';
        break;
    default:
        timeFrame = 'Unknown {' + timeFrame + '}';
}
mode = parseInt(byte.slice(5, 8), 2);
switch (mode) {
    case 0:
        mode = 'Button';
        break;
    case 1:
        mode = 'Temperature & Humidity';
        // Byte #2
        var byte = parseInt(payload.slice(2, 4), 16).toString(2);
        while (byte.length < 8)
            byte = '0' + byte;
        temperature = byte.slice(0, 4);
        // Byte #3
        var byte = parseInt(payload.slice(4, 6), 16).toString(2);
        while (byte.length < 8)
            byte = '0' + byte;
        temperature += byte.slice(2, 8);
        temperature = ((parseInt(temperature, 2) - 200) / 8).toFixed(2);

        if (type !== 'Button')
        // Byte #4
            humidity = parseInt(payload.slice(6, 8), 16) * 0.5;
        else {
            // Byte #4
            var byte = parseInt(payload.slice(6, 8), 16).toString(2);
            while (byte.length < 8)
                byte = '0' + byte;
            firmwareVersion = parseInt(byte.slice(0, 3), 2) + '.' + parseInt(byte.slice(4, 8), 2);
        }
        break;
    case 2:
        mode = 'Light';
        // Byte #3
        var byte = parseInt(payload.slice(4, 6), 16).toString(2);
        while (byte.length < 8)
            byte = '0' + byte;
        var multiplier = parseInt(byte.slice(0, 2), 2);
        switch (multiplier) {
            case 0:
                multiplier = 1;
                break;
            case 1:
                multiplier = 8;
                break;
            case 2:
                multiplier = 64;
                break;
            case 3:
                multiplier = 2014;
                break;
            default:
                multiplier = 'Unknown multiplier {' + multiplier + '}';
        }
        light = parseInt(byte.slice(2, 8), 2);
        light = multiplier * light * 0.01;
        break;
    case 3:
        mode = 'Door';
        eventCount = parseInt(payload.slice(6, 8), 16);
        break;
    case 4:
        mode = 'Move';
        eventCount = parseInt(payload.slice(6, 8), 16);
        break;
    case 5:
        mode = 'Reed switch';
        eventCount = parseInt(payload.slice(6, 8), 16);
        // Byte #3
        var byte = parseInt(payload.slice(4, 6), 16).toString(2);
        while (byte.length < 8)
            byte = '0' + byte;
        temperature = (parseInt(byte.slice(2, 8), 2) - 200) / -8;
        state = parseInt(byte.slice(1, 2), 2);
        break;
    default:
        mode = 'Unknown mode {' + mode + '}';
}

// Byte #2
var byte = parseInt(payload.slice(2, 4), 16).toString(2);
while (byte.length < 8)
    byte = '0' + byte;
battery += byte.slice(4, 8);
battery = (parseInt(battery, 2) * 0.05 + 2.7);
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

// Store objects in parsedData array
obj = {};
obj.key = 'type';
obj.value = type;
obj.type = 'string';
obj.unit = '';
parsedData.push(obj);
obj = {};
obj.key = 'timeFrame';
obj.value = timeFrame;
obj.type = 'string';
obj.unit = '';
parsedData.push(obj);
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
obj.key = 'eventCount';
obj.value = eventCount;
obj.type = 'number';
obj.unit = '';
parsedData.push(obj);
obj = {};
obj.key = 'state';
obj.value = state;
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
