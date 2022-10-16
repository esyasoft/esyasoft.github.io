let edit_btn;
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
    "time": "Time"
}

function sendCliCommand(command) {
    if (!port) {
        connectSerial(command);
        return;
    }
    sendSerialLine(command);
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
            if (key === "id") {
                continue;
            }
            let tr = document.createElement('tr');
            let td1 = document.createElement('td');
            let td2 = document.createElement('td');
            td1.innerText = kvmap[key];
            tr.appendChild(td1);
            td2.innerHTML = data[i][key];
            tr.appendChild(td2);
            tbody.appendChild(tr);
        }
    }
    return tbody;
}

function createForm(data, form) {
    for (let i = 0; i < data.length; i++) {
        for (key in data[i]) {
            if (key === "id") {
                continue;
            }
            let label = document.createElement('label');
            let input = document.createElement('input');
            label.innerHTML = kvmap[key];
            label.className = "form-label";
            if (typeof (data[i][key]) == 'number') {
                input.type = 'number';
            } else {
                input.type = 'text';
            }
            input.id = key;
            input.value = data[i][key];
            input.className = "form-control";
            form.appendChild(label);
            form.appendChild(input);
        }
    }
    return form;
}

function addEditButton(key) {
    let button = document.createElement("button");
    button.className = "button";
    button.innerHTML = "Edit";
    button.id = "edit_" + key;
    document.getElementById('config_name').appendChild(button);
    return button;
}

function addSubmitButton(key) {
    let button = document.createElement("button");
    button.className = "button";
    button.innerHTML = "Update";
    button.id = "update_" + key;
    // document.getElementById('config_name').appendChild(button);
    return button;
}

function getSchedularConfig() {
    schedularConfig = '';
    let command = "config_show schedular";
    disableLogging();
    showDivByID('config_show');
    sendCliCommand(command);
}

function createSchedularTable(data) {
    let table = document.createElement('table');
    table.className = "_width100";
    let tbody = document.createElement('tbody');
    data = JSON.parse(data);
    data = data['scheduler_cfg'];
    tbody = getTable(data, tbody);
    table.appendChild(tbody);
    clearContent();
    btn = addEditButton("schedular");
    document.getElementById('config_show').appendChild(table);
    edit_btn = document.getElementById(btn.id);
}

function createSchedularForm(data) {
    clearContent();
    let form = document.createElement('form');
    data = JSON.parse(data);
    data = data['scheduler_cfg'];
    form = createForm(data, form);
    document.getElementById('config_show').appendChild(form);
}

/*MQTT*/
function getMqttCfg() {
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
    data = data_['mqtt']
    tbody = getTable(data, tbody);
    data = data_['mqtt_topics'];
    tbody = getTable(data, tbody);
    table.appendChild(tbody);
    clearContent();
    addEditButton("mqtt");
    document.getElementById('config_show').appendChild(table);
}

function createMqttForm(data) {
    let form = document.createElement('form');
    form.id = "form_mqtt";
    data_ = JSON.parse(data);
    data = data_['mqtt'][0];
    for (key in data) {
        if (key === "id") {
            continue;
        }
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

async function updateMqttConfig() {
    let form = document.getElementById('form_datacall');
    let mainObj = new Object();
    let obj = {}, arr = [];
    obj.id = 0;
    for (let {id, value} of form) {
        obj[id] = value;
    }
    arr[0] = obj;
    mainObj.mqtt = arr;
    arr[0] = JSON.parse(mqttConfig)['mqtt_topics'];
    mainObj.mqtt_topics = arr;
    console.log(JSON.stringify(mainObj));
    let data = JSON.stringify(mainObj);
    await sendSerialLine('config_upload mqtt');
    await sendCharLine(data);
    await console.log('DONE UPDATING CONFIG');
}

/*DataCall*/
function getDataCallCfg() {
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
    addEditButton("datacall");
    document.getElementById('config_show').appendChild(table);
}

function createDataCallForm(data) {
    clearContent();
    let form = document.createElement('form');
    form.id = "form_datacall";
    data_ = JSON.parse(data);
    data = data_['data_call'];
    form = createForm(data, form);
    let button = addSubmitButton("datacall");
    document.getElementById('config_show').appendChild(form);
    document.getElementById('config_show').appendChild(button);

}

async function updateDataCallConfig() {
    let form = document.getElementById('form_datacall');
    let mainObj = new Object();
    let obj = {}, arr = [];
    obj.id = 0;
    for (let {id, value} of form) {
        obj[id] = value;
    }
    arr[0] = obj;
    mainObj.data_call = arr;
    console.log(JSON.stringify(mainObj));
    let data = JSON.stringify(mainObj);
    await sendSerialLine('config_upload datacall');
    await sendCharLine(data);
    await delay(2);
    await console.log('DONE UPDATING CONFIG');
}

/*Meter Configuration*/
function getMeterCfg() {
    meterConfig = '';
    let command = "config_show meter";
    disableLogging();
    showDivByID('config_show');
    sendCliCommand(command);
}

function createMeterTable(data) {
    let table = document.createElement('table');
    table.className = "_width100";
    let tbody = document.createElement('tbody');
    let linebreak = document.createElement("br");
    data_ = JSON.parse(data);
    data = data_['dlms_meter'];
    tbody = getTable(data, tbody);
    data = data_['st_meter'];
    tbody = getTable(data, tbody);
    data = data_['mbus_meter'];
    tbody = getTable(data, tbody);
    table.appendChild(tbody);
    clearContent();
    addEditButton("meter");
    document.getElementById('config_show').appendChild(table);
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

/*Gateway Related Function*/
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

function gwCellularStatus() {
    cellular_info = "";
    let command = "cellular_status"
    disableLogging();
    showDivByID('config_show');
    sendCliCommand(command);
}

function createCellularInfoTable(data) {
    let table = document.createElement('table');
    table.className = "_width100";
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

/*enable logging*/
function enableLogging() {
    let command = "enable_logging";
    clearContent();
    document.getElementById('logging').value = 1;
    hideDivByID("config_show");
    sendCliCommand(command);
}

/*disable logging*/
function disableLogging() {
    let command = "disable_logging";
    sendSerialLine(command);
    document.getElementById('logging').value = 0;
    hideDivByID('serialResults');
}

function showDivByID(div) {
    document.getElementById(div).style.display = "block";
}

function hideDivByID(div) {
    document.getElementById(div).style.display = "none";
}


