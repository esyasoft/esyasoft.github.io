const DROPDOWN_KEYS = ["net_pref", "custom_apn", "net_scan_seq", "ssl_enabled"];
const read_only = ["id", "clean_session", "retain", "client_id", "keep_alive", "will_topic", "will_qos", "will_retain", "will_payload",
    "reconnect_delay", "reconnect_delay_max", "reconnect_exponential_backoff"];

var update_btn, input_fields, run;
var ref_id = -1;
//Dropdown Keys
const net_pref = ["GSM", "CATM", "GSM+CATM", "NBIOT", "GSM+NBIOT", "CATM+NBIOT", "GSM+CATM+NBIOT"];
const custom_apn = ["NO", "YES"];
const ssl_enabled = ["NO", "YES"];
const net_scan_seq = ["CATM->NBIOT->GSM", "CATM->GSM->NBIOT", "NBIOT->CATM->GSM", "NBIOT->GSM->CATM", "GSM->CATM->NBIOT", "GSM->NBIOT->CATM"];
