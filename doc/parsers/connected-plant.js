var payload,
    light,
    humidity,
    parsedData = [],
    obj = {};

// First Byte
var light = parseInt('0x'+payload.substring(0,2));
//Second Byte

var humidity = parseInt('0x'+payload.substring(2,4));

// Store objects in parsedData array
obj = {};
obj.key = 'light';
obj.value = light;
obj.type = 'number';
obj.unit = '%';
parsedData.push(obj);

obj = {};
obj.key = 'humidity';
obj.value = humidity;
obj.type = 'number';
obj.unit = '%';
parsedData.push(obj);

//console.log(parsedData);
return parsedData;