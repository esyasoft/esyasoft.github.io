var port, textEncoder, writableStreamClosed, writer, historyIndex = -1;
const lineHistory = [];

async function connectSerial(cmd) {
    try {
        // Prompt user to select any serial port.
        port = await navigator.serial.requestPort();
        await port.open({baudRate: 115200});
        let settings = {};
        if (Object.keys(settings).length > 0) await port.setSignals(settings);
        textEncoder = new TextEncoderStream();
        writableStreamClosed = textEncoder.readable.pipeTo(port.writable);
        writer = textEncoder.writable.getWriter();
        sendSerialLine(cmd);
        await listenToPort();
    } catch (e) {
        alert("Serial Connection Failed" + e);
    }
}

async function sendSerialLine(dataToSend) {
    // dataToSend = document.getElementById("lineToSend").value;
    lineHistory.unshift(dataToSend);
    historyIndex = -1; // No history entry selected
    dataToSend = dataToSend + "\r";
    dataToSend = dataToSend + "\n";
    await writer.write(dataToSend);
    return;
}

async function sendCharLine(str) {
    for (var i = 0, charsLength = str.length; i < charsLength; i += 1023) {
        await writer.write(str.substring(i, i + 1023));
        console.log('SENT:', str.substring(i, i + 1023));
        await delay(0.001);
    }
    await writer.write('`');
    return;
}

async function listenToPort() {
    const textDecoder = new TextDecoderStream();
    const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
    const reader = textDecoder.readable.getReader();
    // Listen to data coming from the serial device.
    while (true) {
        const {value, done} = await reader.read();
        if (done) {
            // Allow the serial port to be closed later.
            console.log('[readLoop] DONE', done);
            reader.releaseLock();
            break;
        }
        // value is a string.
        appendToTerminal(value);
    }
}

let readData;
let keepReadingConfig = 0;

async function appendToTerminal(newStuff) {
    var logging = document.getElementById('logging').value;
    console.log('[ ' + newStuff + ' ]\n');
    readData += newStuff;
    if (keepReadingConfig === 1) {
        if (newStuff.includes('\r\n')) {
            mqttConfig += removeWhitespaces(newStuff);
            keepReadingConfig = 0;
            createMqttTable((mqttConfig));
            return;
        }
        mqttConfig += removeWhitespaces(newStuff);
    }
    if (keepReadingConfig === 2) {
        if (newStuff.includes('\r\n')) {
            schedularConfig += removeWhitespaces(newStuff);
            keepReadingConfig = 0;
            console.log(schedularConfig);
            createSchedularTable((schedularConfig));
            return;
        }
        schedularConfig += removeWhitespaces(newStuff);
    }
    if (keepReadingConfig === 3) {
        datacallConfig += removeWhitespaces(newStuff);
        if (newStuff.includes('\r\n')) {
            keepReadingConfig = 0;
            createDataCallTable((datacallConfig));
            return;
        }
    }
    if (keepReadingConfig === 4) {
        if (newStuff.includes('\r\n')) {
            meterConfig += removeWhitespaces(newStuff);
            keepReadingConfig = 0;
            createMeterTable((meterConfig));
            return;
        }
        meterConfig += removeWhitespaces(newStuff);
    }
    if (keepReadingConfig === 5) {
        cellular_info += removeWhitespaces(newStuff);
        if (newStuff.includes('\r\n')) {
            keepReadingConfig = 0;
            createCellularInfoTable(cellular_info);
            return;
        }
    }

    if (newStuff.includes('config_show mqtt')) {
        keepReadingConfig = 1;
    }
    if (newStuff.includes('schedular')) {
        keepReadingConfig = 2;
    }
    if (newStuff.includes('config_show datacall')) {
        keepReadingConfig = 3;
    }
    if (newStuff.includes('config_show meter')) {
        keepReadingConfig = 4;
    }
    if (newStuff.includes('cellular_status')) {
        keepReadingConfig = 5;
    }

    if (logging == "1") {
        serialResultsDiv.style.display = 'block';
        serialResultsDiv.innerHTML += addNewLines(newStuff);
        if (serialResultsDiv.innerHTML.length > 3000) serialResultsDiv.innerHTML = serialResultsDiv.innerHTML.slice(serialResultsDiv.innerHTML.length - 3000);
        //scroll down to bottom of div
        serialResultsDiv.scrollTop = serialResultsDiv.scrollHeight;
    }
}

function scrollHistory(direction) {
    // Clamp the value between -1 and history length
    historyIndex = Math.max(Math.min(historyIndex + direction, lineHistory.length - 1), -1);
    if (historyIndex >= 0) {
        document.getElementById("lineToSend").value = lineHistory[historyIndex];
    } else {
        document.getElementById("lineToSend").value = "";
    }
}

function delay(n) {
    return new Promise(function (resolve) {
        setTimeout(resolve, n * 1000);
    });
}
