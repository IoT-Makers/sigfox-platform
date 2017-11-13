var binary,
    bytes,
    frameStr,
    frame,
    frameType,
    battery,
    temperatureLP,
    temperature,
    mode,
    humidity,
    light,
    parsedData = [],
    obj = {};

function getBinary(){
    binary = frame.toString(2);
}
function getBytes(){
    bytes = [];
    frameStr.match(/[0-f]{1,2}/g).forEach(function (byte){
        bytes.push(parseInt(byte, 16));
    }.bind(this));
}
function getMode(){
    //Mode : bits 1 to 3
    mode = bytes[0] & 0b111;
    //frame type: bits 6 & 7
    frameType = (bytes[0] >> 5 ) & 0b11;

    switch (mode){
        case 0: mode='Button';
            break;
        case 1: mode='Temperature';
            break;
        case 2: mode='Light';
            break;
        case 3: mode='Door';
            break;
        case 4: mode='Move';
            break;
        case 5: mode='Reed switch';
            break;
        default: mode='Unknown mode {'+mode+'}';
    }

    switch (frameType){
        case 0: frameType = "Classic";
            break;
        case 1: frameType = "Button";
            break;
        case 2: frameType = "Alert";
            break;
        case 3: frameType = "New Mode";
            break;
        default: frameType = "Unknown {"+frameType+"}";
    }
}
function getBattery(){
    //MSB : first byte's first bit
    var MSB = bytes[0] >> 7;
    //LSB : second byte's trailing 4 bits
    var LSB = bytes[1] & 0b1111;

    //console.log("Battery", MSB, LSB, (MSB*16)+LSB);

    battery =(((MSB*16)+LSB) * 2.7) / 20;
    battery = battery.toFixed(2);
}
function getValues(){
    getTemperatureLowPrecision();

    switch(mode){
        case 'Temperature':
            if (frameType !== 'Alert'){
                getHumidity();
            }
            getTemperature();

            break;
        case 'Light':
            getLight();
        default:
            console.warn("No getValues() method implemented for %s mode", mode);
    }
}
function getTemperatureLowPrecision(){
    //Last 4 bits of byte 2
    var temp = bytes[1] & 0b1111;

    temperatureLP = (temp * 64 -200)/10;
}
function getTemperature(){
    //MSB : First 4 bits of byte 2
    var MSB = Number(bytes[1] >> 4).toString(2);
    //console.log('temp MSB %s - %s', MSB,parseInt(MSB,2));

    //LSB : 6 last bits of byte 3
    var LSB = Number(bytes[2] & 0b111111, 2).toString(2);
    while (LSB.length < 6){
        LSB = '0'+LSB;
    }
    //console.log('temp LSB %s - %s', LSB, parseInt(LSB,2));
    //console.log('temperature', MSB+LSB, parseInt(MSB+LSB, 2));
    temperature = (parseInt(MSB+LSB,2)-200) / 8;
}
function getHumidity(){
    humidity = bytes[3] / 2;
}
function getLight(){
    console.log("Get Light", bytes[2], new Number(bytes[2]).toString(16),new Number(bytes[2]).toString(2));
    //Value	 b0-5
    //Multiplier b6 - b7
    var lightValue = bytes[2] & 0b111111;
    console.log("value", lightValue);
    var lightMultiplier = getLightMultiplier();
    console.log('x factor', lightMultiplier);
    light = 0.01 * lightMultiplier * lightValue;
}
function getLightMultiplier(){
    /*
     Multiplier value	Final multiplier
     0	1
     1	8
     2	64
     3	2014
     */
    var multiplier = bytes[2] >> 6;
    console.log("multiplier", multiplier);

    switch (multiplier){
        case 0 : return 1;
        case 1 : return 8;
        case 2 : return 64;
        default: return 2014;
    }
}

frame = Number(parseInt(payload, 16));
frameStr = payload;

getBinary();
getBytes();
getMode();
getBattery();
getValues();

obj = {};
obj.key = "frameType";
obj.value = frameType;
parsedData.push(obj);
obj = {};
obj.key = "mode";
obj.value = mode;
parsedData.push(obj);
obj = {};
obj.key = "temperature";
obj.value = temperature;
parsedData.push(obj);
obj = {};
obj.key = "humidity";
obj.value = humidity;
parsedData.push(obj);
obj = {};
obj.key = "light";
obj.value = light;
parsedData.push(obj);
obj = {};
obj.key = "battery";
obj.value = battery;
parsedData.push(obj);

return parsedData;