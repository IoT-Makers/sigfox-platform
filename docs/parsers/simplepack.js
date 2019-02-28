var payload,
    event,
    mode,
    armed,
    firmwareVersion,
    aX,
    aY,
    aZ,
    parsedData = [],
    obj = {};

// Byte #1
// Mode
mode = payload.slice(0, 1);
switch (mode) {
    case '0':
        mode = 'Heartbeat';
        break;
    case '1':
        mode = 'Press Me';
        break;
    case '2':
        mode = 'Guard Me';
        break;
    case '3':
        mode = 'Track Me';
        break;
    case '4':
        mode = 'Trace Me';
        break;
    default:
        mode = 'Unknown {' + mode + '}';
}
if (mode === 'Heartbeat') {
    var byte = parseInt(payload.slice(0, 2), 16).toString(2);
    while (byte.length < 8)
        byte = '0' + byte;
    event = mode;
    armed = byte.slice(4, 5) === '1' ? true : false;
    mode = parseInt(byte.slice(5, 8), 2);
    switch (mode) {
        case 1:
            mode = 'Press me';
            break;
        case 2:
            mode = 'Guard me';
            break;
        case 3:
            mode = 'Track me';
            break;
        case 4:
            mode = 'Maintain me';
            break;
        case 5:
            mode = 'Turn me over';
            break;
        case 6:
            mode = 'Drop me';
            break;
        default:
            mode = 'Unknown {' + mode + '}';
    }
} else {
    // Event
    event = payload.slice(1, 2);
    if (mode === 'Track Me') {
        switch (event) {
            case '1':
                armed = true;
                event = 'Armed - button pressed';
                break;
            case '2':
                event = 'Alarm - mouvement detected';
                break;
            case '3':
                event = 'Stop - device not moving';
                break;
            default:
                event = 'Unknown {' + event + '}';
        }
    } else if (mode === 'Press Me') {
        switch (event) {
            case '1':
                event = 'Short press';
                break;
            case '2':
                event = 'Double press';
                break;
            case '3':
                event = 'Long press';
                break;
            case '4':
                event = 'Extra long press';
                break;
            default:
                event = 'Unknown {' + event + '}';
        }
    }

    // Following bytes
    if (mode === 'Track Me' && payload.length > 2) {
        // Byte #2
        aX = ((-2 + (parseInt(payload.slice(2, 4), 16) * 4 / 255)) * 9.80665).toFixed(3);
        // Byte #3
        aY = ((-2 + (parseInt(payload.slice(4, 6), 16) * 4 / 255)) * 9.80665).toFixed(3);
        // Byte #4
        aZ = ((-2 + (parseInt(payload.slice(6, 8), 16) * 4 / 255)) * 9.80665).toFixed(3);
    } else if (mode === 'Press Me') {
        // Byte #2
        firmwareVersion = parseInt(payload.slice(2, 4), 16);
    }
}

// Store objects in parsedData array
obj = {};
obj.key = 'mode';
obj.value = mode;
obj.type = 'string';
obj.unit = '';
parsedData.push(obj);
obj = {};
obj.key = 'event';
obj.value = event;
obj.type = 'string';
obj.unit = '';
parsedData.push(obj);
obj = {};
obj.key = 'armed';
obj.value = armed;
obj.type = 'boolean';
obj.unit = '';
parsedData.push(obj);
obj = {};
obj.key = 'firmwareVersion';
obj.value = firmwareVersion;
obj.type = 'number';
obj.unit = '';
parsedData.push(obj);
obj = {};
obj.key = 'aX';
obj.value = aX;
obj.type = 'number';
obj.unit = 'm/s2';
parsedData.push(obj);
obj = {};
obj.key = 'aY';
obj.value = aY;
obj.type = 'number';
obj.unit = 'm/s2';
parsedData.push(obj);
obj = {};
obj.key = 'aZ';
obj.value = aZ;
obj.type = 'number';
obj.unit = 'm/s2';
parsedData.push(obj);

return parsedData;
