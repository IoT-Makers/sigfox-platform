var payload,
    battery,
    type,
    period,
    mode,
    humidity,
    temperature,
    light,
    alert,
    state,
    firmwareVersion,
    parsedData = [],
    obj = {};

// Byte #1
var byte = parseInt(payload.slice(0, 2), 16).toString(2);
while (byte.length < 8)
    byte = '0' + byte;
battery = byte.slice(0, 1);
type = byte.slice(1, 3);
switch (type) {
    case '00':
        type = 'Periodic';
        break;
    case '01':
        type = 'Button';
        break;
    case '10':
        type = 'Alert';
        break;
    case '11':
        type = 'New Mode';
        break;
    default:
        type = 'Unknown {' + type + '}';
}
period = byte.slice(3, 5);
switch (period) {
    case '00':
        period = '10 minutes';
        break;
    case '01':
        period = '1 hour';
        break;
    case '10':
        period = '6 days';
        break;
    case '11':
        period = '24 hours';
        break;
    default:
        period = 'Unknown {' + period + '}';
}
mode = byte.slice(5, 8);
switch (mode) {
    case '000':
        mode = 'Button';
        break;
    case '100':
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
    case '010':
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
    case '110':
        mode = 'Door';
        alert = parseInt(payload.slice(6, 8), 16);
        break;
    case '001':
        mode = 'Move';
        alert = parseInt(payload.slice(6, 8), 16);
        break;
    case '101':
        mode = 'Magnet';
        // Byte #3
        var byte = parseInt(payload.slice(4, 6), 16).toString(2);
        while (byte.length < 8)
            byte = '0' + byte;
        state = parseInt(byte.slice(1, 2), 2);
        alert = parseInt(payload.slice(6, 8), 16);
        break;
    default:
        mode = 'Unknown mode {' + mode + '}';
}

// Byte #2
var byte = parseInt(payload.slice(2, 4), 16).toString(2);
while (byte.length < 8)
    byte = '0' + byte;
battery += byte.slice(4, 8);
battery = (parseInt(battery, 2) * 0.05 + 2.7).toFixed(2);

// Store objects in parsedData array
obj = {};
obj.key = 'type';
obj.value = type;
obj.type = 'string';
obj.unit = '';
parsedData.push(obj);
obj = {};
obj.key = 'period';
obj.value = period;
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
obj.key = 'state';
obj.value = state;
obj.type = 'number';
obj.unit = '';
parsedData.push(obj);
obj = {};
obj.key = 'alert';
obj.value = alert;
obj.type = 'number';
obj.unit = '';
parsedData.push(obj);
obj = {};
obj.key = 'battery';
obj.value = battery;
obj.type = 'number';
obj.unit = 'V';
parsedData.push(obj);

//console.log(parsedData);
return parsedData;
