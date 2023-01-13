let connectButton;
let schedularConfig = "", mqttConfig = "", datacallConfig = "", meterConfig = "";
let cellular_info = "";

function createJSONfromForm(form, key) {
    let mainObj = {};
    let obj = {}, arr = [];
    obj.id = 0;
    for (let {id, value} of form) {
        if (isNaN(value) || value === "") obj[id] = value;
        else obj[id] = parseInt(value);
    }
    arr[0] = obj;
    mainObj[key] = arr;
    return JSON.stringify(mainObj);
}

function addNewLines(str) {
    return str.replace(/(?!$|\n)([^\n]{140}(?!\n))/g, '$1\n');
}

function clearContent() {
    document.getElementById('config_name').innerHTML = '';
    document.getElementById('config_show').innerHTML = '';
}

function removeWhitespaces(data) {
    data = data.replaceAll(' ', '');
    data = data.replaceAll('>', '');
    data = data.replaceAll('\n', '');
    return data.replaceAll('\r', '');
}

function getTable(data, tbody) {
    let DONT_SHOW = ["id", "time", "ssl_enabled"] //Not shown in the TABLE
    for (let i = 0; i < data.length; i++) {
        for (let key in data[i]) {
            if (key === "id" || key === "time" || key ==="ssl_enabled") {
                continue;
            }
            let val = data[i][key];
            if (val === "") val = "NULL";
            let tr = document.createElement('tr');
            let td1 = document.createElement('td');
            let td2 = document.createElement('td');
            td1.innerText = kvmap?.[key] || key; //Key
            tr.appendChild(td1);
            switch (key) {
                case DROPDOWN_KEYS.includes(key):
                    td2.innerHTML = eval(key)[val];                    
                    break;

                case "RAM":
                    td2.innerHTML = val+" kb / 500 kb";
                    break;

                case "FlashStorage":
                    td2.innerHTML = val+" kb / 2400 kb";
                    break;
            
                default:
                    td2.innerHTML = val;
                    break;
            }
            tr.appendChild(td2);
            tbody.appendChild(tr);
        }
    }
    return tbody;
}

function createOptions(key, value, list) {
    let select = document.createElement('select');
    select.id = key;
    for (let i in list) {
        let is_selected = (i == value);
        select.add(new Option(list[i], i, false, is_selected));
    }
    return select;
}

function createSelectList(key, value, fieldset) {
    switch (key) {
        case "custom_apn":
            fieldset.appendChild(createOptions(key, value, custom_apn));
            return fieldset;

        case "net_pref":
            fieldset.appendChild(createOptions(key, value, net_pref));
            return fieldset;

        case "net_scan_seq":
            fieldset.appendChild(createOptions(key, value, net_scan_seq));
            return fieldset;

        // case "ssl_enabled":
        //     fieldset.appendChild(createOptions(key, value, ssl_enabled));
        //     return fieldset;
    }
}

function createForm(data, fieldset) {
    for (let i = 0; i < data.length; i++) {
        for (key in data[i]) {
            if (read_only.indexOf(key) > -1) {
                continue;
            }
            let label = document.createElement('label');
            let input = document.createElement('input');
            let val = data[i][key];
            label.innerHTML = kvmap[key];
            label.className = "form-label";
            input.id = key;
            input.className = "_width50";
            fieldset.appendChild(label);

            if (typeof (val) == 'number') {
                if (["custom_apn", "net_pref", "net_scan_seq"].indexOf(key) !== -1) {
                    fieldset = createSelectList(key, val, fieldset);
                } else {
                    input.type = 'number';
                    input.value = parseInt(val);
                    fieldset.appendChild(input);
                }
            } else {
                input.type = 'text';
                input.value = val;
                fieldset.appendChild(input);
            }
            // form.appendChild(label);
            // form.appendChild(input);
        }
    }
    return fieldset;
}

function addButton(operation, id) {
    let button = document.createElement("button");
    button.className = "button";
    if (operation === "edit") {
        button.className += " _dark  _floatRight";
        button.innerHTML = "Edit";
        button.id = "edit_" + id;
        return button;
    }
    if (operation === "update") {
        button.innerHTML = "Update";
        button.id = "update_" + id;
        return button;
    }
    if (operation === "reset") {
        button.className += " _danger  _floatRight";
        button.innerHTML = "Reset";
        button.id = "reset_" + id;
        return button;
    }
    if (operation === "refresh") {
        button.innerHTML = "Refresh";
        button.id = "refresh_" + id;
        return button;
    }
}

function addSubmitButton(key) {
    let button = document.createElement("button");
    button.className = "button";
    button.innerHTML = "Update";
    // document.getElementById('config_name').appendChild(button);
    return button;
}

//Schedular Config
function getSchedularConfig() {
    clearInterval(ref_id);
    schedularConfig = '';
    let command = "config_show schedular";
    disableLogging();
    showDivByID('config_show');
    sendCliCommand(command);
}

function createSchedularTable(data) {
    clearContent();
    let table = document.createElement('table');
    table.className = "_width100";
    let tbody = document.createElement('tbody');
    let h3 = document.createElement("h3");
    h3.innerHTML = "Schedular";
    data = JSON.parse(data)['scheduler_cfg'];
    tbody = getTable(data, tbody);
    table.appendChild(tbody);
    let config_name = document.getElementById('config_name');
    config_name.appendChild(addButton("edit", "schedular"));
    config_name.appendChild(addButton("reset", "schedular"));
    config_name.appendChild(h3);

    document.getElementById('config_show').appendChild(table);
}

function createSchedularForm(data) {
    clearContent();
    let form = document.createElement('form');
    let fieldset = document.createElement('fieldset');
    let legend = document.createElement('legend');
    form.id = "form_schedular";
    legend.innerHTML = "Schedular";
    fieldset.appendChild(legend);
    data = JSON.parse(data);
    data = data['scheduler_cfg'];
    fieldset = createForm(data, fieldset);
    form.appendChild(fieldset);

    let button = addButton("update", "schedular");
    button.style.backgroundColor = "green";
    button.style.color = "white";
    document.getElementById('config_show').appendChild(form);
    document.getElementById('config_show').appendChild(button);
}

async function updateSchedularConfig() {
    showsnackbar("wait", 600);
    let form = document.getElementById('form_schedular');
    let data = createJSONfromForm(form, 'scheduler_cfg');
    await sendSerialLine('config_upload schedular');
    await sendCharLine(data);
    await console.log('DONE UPDATING CONFIG');
    await getSchedularConfig();
}

//MQTT Config
function getMqttCfg() {
    clearInterval(ref_id);
    mqttConfig = '';
    let command = "config_show mqtt";
    disableLogging();
    showDivByID('config_show');
    sendCliCommand(command);
}

function createMqttTable(data) {
    let table = document.createElement('table');
    table.className = "_width100";
    let tbody = document.createElement('tbody');
    let h3 = document.createElement("h3");
    h3.innerHTML = "MQTT";
    try {
        let data_ = JSON.parse(data);
        data = data_['mqtt'];
        tbody = getTable(data, tbody);
        data = data_['mqtt_topics'];
        tbody = getTable(data, tbody);
        table.appendChild(tbody);
        clearContent();
        let config_name = document.getElementById('config_name');
        config_name.appendChild(addButton("edit", "mqtt"));
        config_name.appendChild(addButton("reset", "mqtt"));
        config_name.appendChild(h3);

        document.getElementById('config_show').appendChild(table);
    } catch (e) {
        showcustomsnackbar("Something went wrong, Please try again.");
    }
}

function createMqttForm(data) {
    clearContent();
    let form = document.createElement('form');
    let fieldset = document.createElement('fieldset');
    let legend = document.createElement('legend');
    legend.innerHTML = "MQTT";
    fieldset.appendChild(legend);
    form.id = "form_mqtt";
    let data_ = JSON.parse(data)['mqtt'];
    fieldset = createForm(data_, fieldset);
    let button = addButton("update", "mqtt");
    button.style.backgroundColor = "green";
    button.style.color = "white";
    form.appendChild(fieldset);
    document.getElementById('config_show').appendChild(form);
    document.getElementById('config_show').appendChild(button);
}

async function updateMqttConfig() {
    let s = 0;
    showsnackbar("wait", 600);
    let form = document.getElementById('form_mqtt');
    let mainObj = {};
    let mqtt_obj = JSON.parse(mqttConfig)['mqtt'];
    for (let {id, value} of form) {
        if (isNaN(value) || value === "") mqtt_obj[0][id] = value;
        else mqtt_obj[0][id] = parseInt(value);
    }
    mainObj.mqtt = mqtt_obj;
    mainObj.mqtt_topics = JSON.parse(mqttConfig)['mqtt_topics'];
    console.log(JSON.stringify(mainObj));
    let data = JSON.stringify(mainObj);
    await sendSerialLine('config_upload mqtt');
    await sendCharLine(data);
    await delay(0.1);
    getMqttCfg();
}

//Data Call Config
function getDataCallCfg() {
    clearInterval(ref_id);
    datacallConfig = '';
    let command = "config_show datacall"
    disableLogging();
    showDivByID('config_show');
    sendCliCommand(command);
}

function createDataCallTable(data) {
    clearContent();
    let table = document.createElement('table');
    table.className = "_width100";
    let config_name = document.getElementById('config_name');
    let tbody = document.createElement('tbody');
    let h3 = document.createElement("h3");
    h3.innerHTML = "Cellular";
    try {
        data = JSON.parse(data)['data_call'];
        tbody = getTable(data, tbody);
        table.appendChild(tbody);
        config_name.appendChild(addButton("edit", "datacall"));
        config_name.appendChild(addButton("reset", "datacall"));
        config_name.appendChild(h3);
        document.getElementById('config_show').appendChild(table);
    } catch (e) {
        showcustomsnackbar("Something went wrong, Please try again.");
    }
}

function createDataCallForm(data) {
    clearContent();
    let form = document.createElement('form');
    let fieldset = document.createElement('fieldset');
    let legend = document.createElement('legend');
    let button = addButton("update", "datacall");
    button.style.backgroundColor = "green";
    button.style.color = "white";

    legend.innerHTML = "Cellular";
    fieldset.appendChild(legend);
    form.id = "form_datacall";
    let data_ = JSON.parse(data)['data_call'];
    fieldset = createForm(data_, fieldset);
    form.appendChild(fieldset);
    document.getElementById('config_show').appendChild(form);
    document.getElementById('config_show').appendChild(button);

}

async function updateDataCallConfig() {
    showsnackbar("wait", 600);
    let form = document.getElementById('form_datacall');
    let data = createJSONfromForm(form, 'data_call');
    await sendSerialLine('config_upload datacall');
    await sendCharLine(data);
    await console.log('DONE UPDATING CONFIG');
    setTimeout(getDataCallCfg(), 7000);
}

//Meter Configuration
function getMeterCfg() {
    clearInterval(ref_id);
    meterConfig = '';
    let command = "meter_status";
    disableLogging();
    showDivByID('config_show');
    sendCliCommand(command);
}

function createMeterTable(data) {
    clearContent();
    let config_show = document.getElementById('config_show');
    config_show.appendChild(addButton('refresh', 'meter'));
    try {
        let meters = JSON.parse(data);
        let dlms, mbus, st;
        dlms = meters['connection_status']['dlms'];
        mbus = meters['connection_status']['mbus'];
        st = meters['connection_status']['st'];
        if (!dlms.length && !mbus.length && !st.length) {
            showcustomsnackbar("No Meters Available");
        }
        dlms.forEach(function (value, index) {
            createAccordion(value, meters['dlms_meter'][index]);
        });

        mbus.forEach(function (value, index) {
            createAccordion(value, meters['mbus_meter'][index]);
        });

        st.forEach(function (value, index) {
            createAccordion(value, meters['st_meter'][index]);
        });
        acc();
    } catch (e) {
        showcustomsnackbar("Something went wrong, Please try again.");
    }
}

function createAccordion(value, data) {
    let config_show = document.getElementById('config_show');
    let table = document.createElement('table');
    table.className = "_width100";
    let button = document.createElement('button');
    button.className = "accordion";
    let div = document.createElement('div');
    div.className = "-panel";
    let tbody = document.createElement('tbody');
    table.appendChild(getTable([data], tbody));
    div.appendChild(table);
    button.innerHTML = !!+value['isConnected'] ? value['serial_number'] + " - Connected" : value['serial_number'] + " - Not Connected";
    button.style.backgroundColor = !!+value['isConnected'] ? 'green' : 'red';
    button.style.color = 'white';
    config_show.appendChild(button);
    config_show.appendChild(div);
}

function createMeterForm(data) {
    let form = document.createElement('form');
    let linebreak = document.createElement("br");
    data_ = JSON.parse(data);
    data = data_['data_call'][0];
    for (key in data) {
        let label = document.createElement('label');
        let input = document.createElement('input');
        label.innerHTML = kvmap[key];
        label.className = "form-label";
        if (typeof (data[key]) == 'number') {
            input.type = 'number';
        } else {
            input.type = 'text';
        }
        input.id = kvmap[key];
        input.value = data[key];
        input.className = "form-control";
        form.appendChild(label);
        form.appendChild(input);
    }

    clearContent();
    console.log(form);
    document.getElementById('config_show').appendChild(form);
}

//Gateway Related Function
let obj = {};

function parseJSON(object) {
    for (let key in object) {
        let value = object[key];
        if (typeof (value) === 'object') {
            parseJSON(value);
        }
        if (typeof (value) !== 'object') {
            obj[key] = value;
        }
    }
    return obj;
}

function cellular_status() {
    gwCellularStatus();
    if (ref_id === -1) ref_id = setInterval(gwCellularStatus, 3000);
}

function gwCellularStatus() {
    disableLogging();
    cellular_info = "";
    let command = "cellular_status"
    sendCliCommand(command);
    showDivByID('config_show');
    console.log("refreshing");
}


function createSystemInfoTable(data) {
    let table = document.createElement('table');
    table.className = "_width100";
    let h3 = document.createElement("h3");
    h3.innerHTML = "System Information";
    let tbody = document.createElement('tbody');
    let data_ = JSON.parse(data);
    data_ = parseJSON(data_);

    tbody = getTable([data_], tbody);
    table.appendChild(tbody);
    clearContent();
    document.getElementById('config_name').appendChild(h3);
    document.getElementById('config_show').appendChild(table);
}

//Enable Logging
function enableLogging() {
    clearInterval(ref_id);
    let command = "enable_logging";
    clearContent();
    document.getElementById('logging').value = 1;
    hideDivByID("config_show");
    sendCliCommand(command);
}

//Disable Logging
function disableLogging() {
    let command = "disable_logging";
    sendSerialLine(command);
    document.getElementById('logging').value = 0;
    hideDivByID('serialResults');
}

//Show the "Div"
function showDivByID(div) {
    document.getElementById(div).style.display = "block";
}

//Hide the "Div"
function hideDivByID(div) {
    document.getElementById(div).style.display = "none";
}

function acc() {
    var accr = document.getElementsByClassName("accordion");
    var j;
    for (j = 0; j < accr.length; j++) {
        accr[j].onclick = function () {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        }
    }
}

function is_scrolling() {
    return window.lastScrollTime && new Date().getTime() < window.lastScrollTime + 5000;
}