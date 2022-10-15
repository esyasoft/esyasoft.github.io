/*!
 * Beauter v0.3.0 (http://beauter.outboxcraft.com)
 * Copyright 2016-2018 Outboxcraft
 * Licensed under MIT (https://github.com/outboxcraft/beauter/blob/master/LICENSE)
 */

function showsnackbar(y) {
    var x = document.getElementById(y);
    x.className = x.className.replace("snackbar", "snackbar show");
    setTimeout(function () {
        x.className = x.className.replace("show", "");
    }, 3000);
}


function topnav(y) {
    var x = document.getElementById(y);
    if (!x.classList.contains('responsive')) {
        x.className += " responsive";
    } else {
        x.className = x.className.replace("responsive", "");
    }
}

function openmodal(idmodal) {
    var modal = document.getElementById(idmodal);
    modal.style.display = "block";

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

function openimg(imgi, modali) {
    var img = document.getElementById(imgi);
    var modal = document.getElementById(modali);
    var modalImg = modal.getElementsByClassName("modal-content")[0];
    var captionText = modal.getElementsByClassName("caption")[0];
    modal.style.display = "block";
    modalImg.src = img.src;
    captionText.innerHTML = img.alt;
}


var close = document.getElementsByClassName("-close");
var i;
for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
        var div = this.parentElement;
        if (div.classList.contains("modalbox-modal-content"))
            div = div.parentElement;
        div.style.opacity = "0";
        setTimeout(function () {
            div.style.display = "none";
            div.style.opacity = "1";
        }, 600);
    }
}


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

function opentab(tabname, evt) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabname).style.display = "block";
    evt.currentTarget.className += " active";
}

/*!
* Beauter v0.3.0 (http://beauter.outboxcraft.com)
* Copyright 2016-2018 Shubham Ramdeo, Outboxcraft
* Licensed under MIT (https://github.com/outboxcraft/beauter/blob/master/LICENSE)
*/
function showsnackbar(a) {
    var b = document.getElementById(a);
    b.className = b.className.replace("snackbar", "snackbar show");
    setTimeout(function () {
        b.className = b.className.replace("show", "")
    }, 3E3)
}

function topnav(a) {
    a = document.getElementById(a);
    a.classList.contains("responsive") ? a.className = a.className.replace("responsive", "") : a.className += " responsive"
}

function openmodal(a) {
    var b = document.getElementById(a);
    b.style.display = "block";
    window.onclick = function (a) {
        a.target == b && (b.style.display = "none")
    }
}

function openimg(a, b) {
    var c = document.getElementById(a), d = document.getElementById(b),
        e = d.getElementsByClassName("modal-content")[0], f = d.getElementsByClassName("caption")[0];
    d.style.display = "block";
    e.src = c.src;
    f.innerHTML = c.alt
}

var close = document.getElementsByClassName("-close"), i;
for (i = 0; i < close.length; i++) close[i].onclick = function () {
    var a = this.parentElement;
    a.classList.contains("modalbox-modal-content") && (a = a.parentElement);
    a.style.opacity = "0";
    setTimeout(function () {
        a.style.display = "none";
        a.style.opacity = "1"
    }, 600)
};
var accr = document.getElementsByClassName("accordion"), j;
for (j = 0; j < accr.length; j++) accr[j].onclick = function () {
    this.classList.toggle("active");
    var a = this.nextElementSibling;
    a.style.maxHeight = a.style.maxHeight ? a.scrollHeight + "px" : null;
};

function opentab(a, b) {
    var c;
    var d = document.getElementsByClassName("tabcontent");
    for (c = 0; c < d.length; c++) d[c].style.display = "none";
    d = document.getElementsByClassName("tablinks");
    for (c = 0; c < d.length; c++) d[c].className = d[c].className.replace(" active", "");
    document.getElementById(a).style.display = "block";
    b.currentTarget.className += " active"
};