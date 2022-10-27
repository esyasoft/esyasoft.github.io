let edit_btn, connectButton;
let schedularConfig = "", mqttConfig = "", datacallConfig = "", meterConfig = "";
let cellular_info = "";
const kvmap = {
    "energy_profile_time": "Energy Profile",
    "load_profile1_time": "Load Profile1 Time",
    "load_profile2_time": "Load Profile2 Time",
    "billing_profile_time": "Billing Profile Time",
    "md_profile_time": "Max Demand Profile Time",
    "instantaneous_profile_time": "Instantaneous Profile Time",
    "event_profile_time": "Event Profile Time",
    "water_profile_time": "Water Profile Time",
    "water_event_time": "Water Event Time",
    "water_billing_time": "Water Billing Time",
    "connection_retry_cnt": "Connection Retry Count",
    "connection_retry_delay": "Connection Retry Delay",
    "gateway_event_time": "Gateway Event Time",
    "event_polling": "Event Polling",
    "no_of_days": "No Of Days",
    "delete_data": "Delete Data",
    "heartbeat_time": "Heartbeat Time",
    "check_fota": "Check Fota",
    "ssl_enabled": "SSL Enabled?",
    "host": "Host",
    "port": "Port",
    "qos": "QOS",
    "username": "Username",
    "password": "Password",
    "clean_session": "Clean Session",
    "retain": "Retain",
    "client_id": "Client Id",
    "keep_alive": "Keep Alive",
    "will_topic": "Will Topic",
    "will_qos": "Will QOS",
    "will_retain": "Will Retain",
    "will_payload": "Will Payload",
    "reconnect_delay": "Reconnect Delay",
    "reconnect_delay_max": "Max Reconnect Delay",
    "reconnect_exponential_backoff": "Reconnect Exponential Backoff",
    "topic_meter_energy_profile": "Energy Profile",
    "topic_meter_load_profile1": "Load Profile 1",
    "topic_meter_load_profile2": "Load Profile 2",
    "topic_meter_billing_profile": "Billing Profile",
    "topic_meter_maxdemand_profile": "MaxDemand Profile",
    "topic_meter_instantaneous_profile": "Instantaeous Profile",
    "topic_meter_event_profile": "Meter Event",
    "topic_meter_water_profile": "Water Profile",
    "topic_meter_water_event": "Water Event",
    "topic_water_billingprofile": "Water Billing Profile",
    "topic_meter_status": "Meter Status",
    "topic_meter_reconnection": "Meter Reconnection",
    "topic_meter_switch_status": "Meter Switch Status",
    "topic_meter_clear_alarms": "Clear Alarms",
    "topic_meter_nameplate": "Meter Nameplace",
    "topic_meter_ping": "Meter Ping",
    "topic_meter_clock": "Meter Clock Time",
    "topic_meter_get_current_range_low": "Get Current Range Low",
    "topic_meter_get_current_range_up": "Get Current Range Up",
    "topic_meter_set_current_range_up": "Set Current Range Up",
    "topic_meter_set_current_range_low": "Set Current Range Low",
    "topic_meter_get_voltage_range_up": "Get Voltage Range Up",
    "topic_meter_get_voltage_range_low": "Get Voltage Range Low",
    "topic_meter_set_voltage_range_up": "Set Voltage Range Up",
    "topic_meter_set_voltage_range_low": "Set Voltage Range Low",
    "topic_meter_password": "Meter Password",
    "topic_meter_firmware_status": "Meter Firmware Status",
    "topic_meter_firmware": "Meter Firmware",
    "topic_meter_active_tariff": "Active Tarrif",
    "topic_meter_tou_tariff": "Tou Tariff",
    "topic_meter_get_metering_mode": "Get Metering Mode",
    "topic_meter_set_metering_mode": "Set Metering Mode",
    "topic_meter_get_payment_mode": "Get Payment Mode",
    "topic_meter_set_payment_mode": "Set Payment Mode",
    "topic_meter_get_demand_int_period": "Get Demand Int Period",
    "topic_meter_set_demand_int_period": "Set Demand Int Period",
    "topic_meter_get_billing_date": "Get Billing Date",
    "topic_meter_set_billing_date": "Set Billing Date",
    "topic_meter_limit_threshold": "Limit Threshold",
    "topic_meter_load_limit": "Load Limit",
    "topic_meter_billing_reset": "Billing Reset",
    "topic_meter_meter_instrumentation_profile": "Instrumentation Profile",
    "topic_meter_power_quality_profile": "Power Quality Profile",
    "topic_gateway_config": "Gateway Configuration",
    "topic_gateway_firmware_update": "Gateway Firmware Update",
    "topic_gateway_event": "Gateway Event",
    "topic_gateway_get_interval": "Gateway Get Interval",
    "topic_gateway_set_interval": "Gateway Set Interval",
    "topic_gateway_password": "Gateway Password",
    "topic_gateway_clocktime": "Gateway Clock Time",
    "topic_gateway_nameplate": "Gateway Name Plate",
    "topic_gateway_ping": "Gateway Ping",
    "topic_gateway_synchronization": "Meter Sync",
    "topic_gateway_heartbeat": "Heartbeat",
    "trace": "Trace",
    "security_type": "Security Type",
    "wrapper_or_hdlc": "Wrapper/HDLC",
    "serial_number": "Serial Number",
    "authentication": "Authentication",
    "physical_address": "Physical Address",
    "logical_address": "Logical Address",
    "commType": "Communication Type",
    "manufacturer": "Manufacturer",
    "initial_buadrate": "Initial Baudrate",
    "framing": "Framing",
    "protocol": "Protocol",
    "meter_brand": "Meter Brand",
    "meter_model": "Meter Model",
    "client_address": "Client Address",
    "apn": "APN",
    "custom_apn": "Custom APN",
    "apn_username": "APN Username",
    "apn_passwd": "APN Password",
    "ip_version": "IP Version",
    "net_pref": "Net Pref",
    "net_scan_seq": "Net Scan Sequence",
    "fota_url_1": "FOTA URL 1",
    "fota_url_2": "FOTA URL 2",
    "serialnumber": "Serial Number",
    "model": "Model",
    "mac_address": "MAC Address",
    "iccid": "ICCID",
    "msisdn": "MSISDN",
    "rsrp": "RSRP",
    "rssi": "RSSI",
    "rsrq": "RSRQ",
    "sinr": "SINR",
    "band": "Band",
    "typeCommunication": "Type Of Communication",
    "networkIP": "Network IP",
    "firmwareVersion": "Firmware Version",
    "time": "Time",
    "esn": "USN",
    "product_version": "Product"
}

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
    // console.log(JSON.stringify(mainObj));
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
    for (let i = 0; i < data.length; i++) {
        for (let key in data[i]) {
            if (key === "id" || key === "time") {
                continue;
            }
            let val = data[i][key];
            if (val === "") val = "NULL";
            let tr = document.createElement('tr');
            let td1 = document.createElement('td');
            let td2 = document.createElement('td');
            td1.innerText = kvmap[key];
            tr.appendChild(td1);
            if (DROPDOWN_KEYS.includes(key)) {
                td2.innerHTML = eval(key)[val];
            } else td2.innerHTML = val;
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

        case "ssl_enabled":
            fieldset.appendChild(createOptions(key, value, ssl_enabled));
            return fieldset;
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
                if (["custom_apn", "net_pref", "net_scan_seq", "ssl_enabled"].indexOf(key) !== -1) {
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
    data = JSON.parse(data)['scheduler_cfg'];
    tbody = getTable(data, tbody);
    table.appendChild(tbody);
    let config_name = document.getElementById('config_name');
    config_name.appendChild(addButton("edit", "schedular"));
    config_name.appendChild(addButton("reset", "schedular"));

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
    setTimeout(getSchedularConfig(), 7000);
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
    data_ = JSON.parse(data);
    data = data_['mqtt'];
    tbody = getTable(data, tbody);
    data = data_['mqtt_topics'];
    tbody = getTable(data, tbody);
    table.appendChild(tbody);
    clearContent();
    let config_name = document.getElementById('config_name');
    config_name.appendChild(addButton("edit", "mqtt"));
    config_name.appendChild(addButton("reset", "mqtt"));

    document.getElementById('config_show').appendChild(table);
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
    // await console.log('DONE UPDATING CONFIG');
    setTimeout(getMqttCfg(), 7000);

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
    let table = document.createElement('table');
    table.className = "_width100";
    let tbody = document.createElement('tbody');
    data = JSON.parse(data);
    data = data['data_call']
    tbody = getTable(data, tbody);
    table.appendChild(tbody);
    clearContent();
    let config_name = document.getElementById('config_name');
    config_name.appendChild(addButton("edit", "datacall"));
    config_name.appendChild(addButton("reset", "datacall"));
    document.getElementById('config_show').appendChild(table);
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
    config_show.appendChild(addButton('refresh', 'meter'))
    let meters = JSON.parse(data);
    let dlms, mbus, st;
    dlms = meters['connection_status']['dlms'];
    mbus = meters['connection_status']['mbus'];
    st = meters['connection_status']['st'];

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
    ref_id = setInterval(gwCellularStatus, 3000);
}

function gwCellularStatus() {
    disableLogging();
    cellular_info = "";
    let command = "cellular_status"
    sendCliCommand(command);
    showDivByID('config_show');
    console.log("refreshing");
}


function createCellularInfoTable(data) {
    let table = document.createElement('table');
    table.className = "_width100";
    table.id = "cellular_table";
    let tbody = document.createElement('tbody');
    data_ = JSON.parse(data);
    data_ = parseJSON(data_);
    let json_array = []
    json_array.push(data_);
    tbody = getTable(json_array, tbody);
    table.appendChild(tbody);
    clearContent();
    document.getElementById('config_show').appendChild(table);
}

//Enable Logging
function enableLogging() {
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


