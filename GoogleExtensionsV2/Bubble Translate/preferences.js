/*
Copyright (C) 2010  Federico Trodler.
This software is licensed under the GNU GPL version 2.0.
For more information read the LICENSE file or visit
http://creativecommons.org/licenses/GPL/2.0/
Contact me at: bubble.translate@gmail.com
*/
var i = false;
try {
    google.load("language", "1")
} catch (o) {
    i = true
}
var q = "";
function r() {
    for (var c = JSON.parse(localStorage.lang), b = JSON.parse(localStorage.shortcut), d = JSON.parse(localStorage.iconClick), h = JSON.parse(localStorage.theme), k = document.getElementsByClassName("color"), a = 0; a < k.length; a++)
        k[a].addEventListener("click",
        function () {
            s()
        },
    false);
    k = document.getElementsByName("theme");
    for (a = 0; a < k.length; a++) k[a].addEventListener("change",
    function () {
        s()
    },
    false);
    document.getElementsByName("lang")[0].addEventListener("change",
    function () {
        s()
    },
    false);
    document.getElementsByName("iconClick")[0].addEventListener("change",
    function () {
        s()
    },
    false);
    document.getElementsByClassName("add")[0].addEventListener("click",
    function () {
        u("1")
    },
    false);
    document.getElementsByClassName("radios")[0].addEventListener("click",
    function () {
        s("1")
    },
    false);
    document.getElementsByClassName("radios")[1].addEventListener("click",
    function () {
        s("2")
    },
    false);
    document.getElementsByClassName("radios")[2].addEventListener("click",
    function () {
        s("3")
    },
    false);
    document.getElementsByClassName("preview")[0].addEventListener("click",
    function () {
        v("0", this)
    },
    false);
    document.getElementsByClassName("preview")[1].addEventListener("click",
    function () {
        v("1", this)
    },
    false);
    document.getElementsByClassName("buttons")[1].addEventListener("click",
    function () {
        a:
        {
            var l = [];
            var lf = [];
            l[0] = document.preferences.lang[0].options[document.preferences.lang[0].selectedIndex].value;
            l[1] = document.preferences.lang[1].options[document.preferences.lang[1].selectedIndex].value;
            l[2] = document.preferences.lang[2].options[document.preferences.lang[2].selectedIndex].value;

            lf[0] = document.preferences.langFrom.options[document.preferences.langFrom.selectedIndex].value;
            for (var j = [], g = 0, e = 0; e < document.getElementsByClassName("short").length; e++) {
                if (document.preferences.shortcut[e *
                2][0].selected == true && document.preferences.shortcut[e * 2 + 1][0].selected == true) {
                    w("Error - Some shortcuts were not configured.", true, e);
                    break a
                }
                j[g] = g == 0 ? l[0] : document.preferences.lang[3 + e].options[document.preferences.lang[3 + e].selectedIndex].value;
                g++;
                for (var n = 1; n < 5; n++) {
                    j[g] = document.preferences.shortcut[e * 2][n].selected == false && document.preferences.shortcut[e * 2 + 1][n].selected == false ? false : true;
                    g++
                }
            }
            g = [];
            for (e = 0; e < j.length / 5; e++) g[e] = "" + j[e * 5 + 1] + j[e * 5 + 2] + j[e * 5 + 3] + j[e * 5 + 4];
            for (e = 0; e < j.length / 5; e++) {
                var m;
                n = g[e];
                for (var p = 0, t = 0; t < g.length; t++) if (g[t] == n) {
                    ++p;
                    p >= 2 && w("Error - Diplicated shortcut.", true, p)
                }
                if (p > 1) m = true;
                if (m == true) break a
            }
            m = [];
            m[0] = document.preferences.iconClick[0].checked;
            m[1] = document.preferences.iconClick[1].checked;
            m[2] = document.preferences.iconClick[2].checked;
            m[3] = document.preferences.iconClick[3].checked;
            g = [];
            g[0] = document.preferences.theme[3].value;
            g[1] = document.preferences.theme[2].value;
            g[2] = document.preferences.theme[0].value;
            g[3] = document.preferences.theme[1].value;
            g[4] =
            document.preferences.theme[4].value;
            for (e = 0; e < 4; e++) if (document.preferences.iconSet[e].checked == true) g[5] = e + 16 + ".png";
            if (i == false) {
                localStorage.lang = JSON.stringify(l);
                localStorage.langFrom = JSON.stringify(lf);
                localStorage.shortcut = JSON.stringify(j);
                localStorage.iconClick = JSON.stringify(m);
                localStorage.srsService = document.preferences.srsService.selectedIndex;
            }
            localStorage.theme = JSON.stringify(g);
            w("Options saved.");
            chrome.extension.sendRequest({
                a: "Reload"
            })
        }
    },
    false);
    document.getElementById("range_dot").addEventListener("mousedown",
    function () {
        x()
    },
    false);
    k = document.getElementsByTagName("li");
    for (a = 0; a < 3; a++) k[a].addEventListener("click",
    y, false);
    document.getElementById("back_image").style.background = "url(" + chrome.extension.getURL("128_2.png?sdf=dsf") + ")";
    a = chrome.extension.getURL("controls.png");
    document.getElementsByClassName("add")[0].style.background = "transparent url(" + a + ") no-repeat -48px 0px";
    a = chrome.extension.getURL("icons.png");
    document.getElementsByClassName("about_icon")[0].style.background = "transparent url(" + a + ") no-repeat 0px 0px";
    document.getElementsByClassName("about_icon")[1].style.background = "transparent url(" + a + ") no-repeat -16px 0px";
    document.getElementsByClassName("about_icon")[2].style.background = "transparent url(" + a + ") no-repeat -32px 0px";
    document.getElementsByClassName("about_icon")[3].style.background = "transparent url(" + a + ") no-repeat -48px 0px";
    if (i == false) {
        for (var f in google.language.Languages) if (google.language.Languages[f] != "") q += '<option value="' + google.language.Languages[f] + '">' + f.substring(0, 1) + f.substring(1).toLowerCase().replace("_", " ") + "</option>";
        for (a = 0; a < document.preferences.lang.length; a++)
            document.preferences.lang[a].innerHTML = q;

        document.preferences.langFrom.innerHTML = "<option value=\"\">Auto</option>" + q;

        //sp1
        document.preferences.langFrom.innerHTML = document.preferences.langFrom.innerHTML.replace('<option value="ar">Arabic</option>','<option value="ar">Arabic</option><option value="ar#la">Arabic Latin alphabet</option>');
        document.preferences.langFrom.innerHTML = document.preferences.langFrom.innerHTML.replace('<option value="ru">Russian</option>','<option value="ru">Russian</option><option value="ru#la">Russian Latin alphabet</option>');
        //End sp1

        for (f = 0; f < 3; f++)
            for (a = 0; a < document.preferences.lang[f].length; a++)
                if (document.preferences.lang[f][a].value == c[f])
                    document.preferences.lang[f][a].selected = true;

        if (localStorage.langFrom != undefined) {
            var cFrom = JSON.parse(localStorage.langFrom)
            for (a = 0; a < document.preferences.langFrom.options.length; a++)
                if (document.preferences.langFrom.options[a].value == cFrom[0])
                    document.preferences.langFrom.options[a].selected = true;
        }

        if (localStorage.srsService != undefined) {
            document.preferences.srsService.selectedIndex = localStorage.srsService;
        }

        u(b.length / 5);
        for (a = 0; a < b.length / 5; a++) for (c = 1; c < 5; c++) if (b[a + 4 * a + c] == true) {
            document.preferences.shortcut[a * 2][c].selected = true;
            for (f = c + 1; f < 5; f++) {
                c = 5;
                if (b[a + 4 * a + f] == true) {
                    document.preferences.shortcut[a * 2 + 1][f].selected = true;
                    f = 5
                }
            }
        }
        for (a = 0; a < b.length / 5; a++) for (c = 0; c < document.preferences.lang[3 + a].length; c++) if (document.preferences.lang[3 +
        a][c].value == b[a + 4 * a]) document.preferences.lang[3 + a][c].selected = true;
        document.preferences.iconClick[0].checked = d[0];
        document.preferences.iconClick[1].checked = d[1];
        document.preferences.iconClick[2].checked = d[2];
        document.preferences.iconClick[3].checked = d[3]
    } else {
        document.getElementById("0").style.display = "none";
        document.getElementById("general").style.display = "none";
        document.getElementById("theme").style.display = "block";
        document.getElementById("about").style.display = "none";
        document.getElementsByClassName("notify_cont")[0].innerHTML +=
        "In offline mode you just can change Theme preferences";
        document.getElementsByClassName("notify")[0].style.display = "block";
        document.getElementsByClassName("buttons")[0].addEventListener("click",
        function () {
            document.getElementsByClassName("notify")[0].style.display = "none"
        },
        false)
    }
    document.preferences.theme[3].value = h[0];
    document.preferences.theme[2].value = h[1];
    for (c = 0; c < document.preferences.theme[0].length; c++) if (document.preferences.theme[0][c].value == h[2]) document.preferences.theme[0][c].selected =
    true;
    for (a = 0; a < document.preferences.theme[1].length; a++) if (document.preferences.theme[1][a].value == h[3]) document.preferences.theme[1][a].selected = true;
    document.preferences.theme[4].value = h[4];
    x(h[4]);
    for (a = 16; a < 20; a++) document.getElementById("iconSelection").innerHTML += "<input type='radio' name='iconSet'/> <img src='" + chrome.extension.getURL(a + ".png") + "'/><br>";
    for (a = 16; a < 20; a++) if (h[5] == a + ".png") document.preferences.iconSet[a - 16].checked = true;
    if (localStorage.version == null || localStorage.version !=
    "1.5") {
        localStorage.version = "1.5";
        b = document.createEvent("MouseEvents");
        b.initEvent("click", true, true);
        document.getElementsByTagName("li")[2].dispatchEvent(b)
    }
    s()
}
function u(c) {
    for (var b = 0; b < c; b++) {
        var d = document.createElement("div");
        d.setAttribute("class", "short");
        d.innerHTML = "<select name='shortcut'><option value='None'>None</option><option value='Shift'>Shift</option><option value='Ctrl'>Ctrl</option><option value='Meta'>Meta</option><option value='Alt'>Alt</option></select>+<select name='shortcut'><option value='None'>None</option><option value='Shift'>Shift</option><option value='Ctrl'>Ctrl</option><option value='Meta'>Meta</option><option value='Alt'>Alt</option></select> + Select - <select name='lang'><option value='en'>English</option></select><input type='button' class='delete' title='Delete shortcut'><span id='showLang'></span><br>";
        document.getElementById("multishorts").appendChild(d);
        d = document.getElementsByName("shortcut");
        d[d.length - 2].addEventListener("change",
        function () {
            s()
        },
        false);
        d[d.length - 1].addEventListener("change",
        function () {
            s()
        },
        false);
        d = document.getElementsByClassName("delete");
        d[d.length - 1].addEventListener("click",
        function () {
            document.getElementById("multishorts").removeChild(this.parentNode);
            if (document.getElementsByClassName("short").length <= 10) {
                document.getElementsByClassName("add")[0].disabled = false;
                document.getElementsByClassName("add")[0].style.opacity = "1"
            }
        },
        false);
        document.preferences.lang[document.preferences.lang.length - 1].innerHTML = q;
        if (b == 0) {
            document.preferences.lang[3].style.display = "none";
            document.getElementsByClassName("delete")[0].style.display = "none"
        }
        s()
    }
    c = chrome.extension.getURL("controls.png");
    for (b = 0; b < document.getElementsByClassName("delete").length; b++) document.getElementsByClassName("delete")[b].style.background = "transparent url(" + c + ") no-repeat -32px 0px";
    if (document.getElementsByClassName("short").length >= 10) {
        document.getElementsByClassName("add")[0].disabled =
        true;
        document.getElementsByClassName("add")[0].style.opacity = "0.5"
    }
}
function s(c) {
    if (i == false) document.getElementById("showLang").innerHTML = document.preferences.lang[0][document.preferences.lang[0].selectedIndex].text;
    for (var b = 0; b < document.getElementsByClassName("short").length; b++) document.preferences.shortcut[b * 2 + 1].disabled = document.preferences.shortcut[b * 2][0].selected == true ? true : false;
    if (c != null) document.preferences.iconClick[c].checked = true;
    c = chrome.extension.getURL("controls.png");
    for (b = 1; b < 4; b++) {
        if (document.preferences.iconClick[b].checked == true && document.preferences.iconClick[0].checked ==
        false) document.getElementsByClassName("radios")[b - 1].style.background = "url(" + c + ") no-repeat -64px 0px";
        else document.getElementsByClassName("radios")[b - 1].style.background = "url(" + c + ") no-repeat -84px 0px";
        if (document.preferences.iconClick[0].checked == true) document.getElementsByClassName("radios")[b - 1].style.opacity = "0.5";
        else document.getElementsByClassName("radios")[b - 1].style.opacity = "1"
    }
    document.getElementById("bubble_down").parentNode.removeChild(document.getElementById("bubble_down"));
    b = document.createElement("div");
    b.setAttribute("id", "bubble_down");
    b.innerHTML = "<canvas id='bubble_arrow_down' width='14' height='8' style='vertical-align: top;'></canvas>";
    document.getElementById("bubble").appendChild(b);
    b = document.getElementById("bubble_arrow_down").getContext("2d");
    b.fillStyle = document.preferences.theme[3].value;
    b.globalAlpha = 1;
    b.shadowColor = document.preferences.theme[3].value;
    b.shadowOffsetX = 0;
    b.shadowOffsetY = 0;
    b.shadowBlur = 2;
    b.beginPath();
    b.moveTo(0, 0);
    b.lineTo(14, 0);
    b.lineTo(7, 8);
    b.fill();
    document.getElementById("bubble_cont").style.fontFamily =
    document.preferences.theme[0].value;
    document.getElementById("bubble").style.fontSize = document.preferences.theme[1].value;
    document.getElementById("bubble_cont").style.color = document.preferences.theme[2].value;
    document.getElementById("bubble_cont").style.background = document.preferences.theme[3].value;
    document.getElementById("bubble_cont").style.webkitBoxShadow = document.preferences.theme[3].value + " 0px 0px 2px";
    b = document.preferences.theme[4].value;
    b = b < 10 ? ".0" + b : b > 99 ? "1" : "." + b;
    document.getElementById("bubble").style.opacity = b;
    document.getElementsByClassName("preview")[0].style.background = document.preferences.theme[2].value;
    document.getElementsByClassName("preview")[1].style.background = document.preferences.theme[3].value
}
function y() {
    document.getElementsByClassName("menu_sel")[0].style.WebkitTransform = "translate(" + this.offsetLeft + "px, 0px)";
    switch (this.id) {
        case "0":
            document.getElementById("general").style.display = "block";
            document.getElementById("theme").style.display = "none";
            document.getElementById("about").style.display = "none";
            document.getElementById("save").style.display = "block";
            break;
        case "1":
            document.getElementById("general").style.display = "none";
            document.getElementById("theme").style.display = "block";
            document.getElementById("about").style.display =
        "none";
            document.getElementById("save").style.display = "block";
            break;
        case "2":
            document.getElementById("general").style.display = "none";
            document.getElementById("theme").style.display = "none";
            document.getElementById("about").style.display = "block";
            document.getElementById("save").style.display = "none";
            break
    }
}
function w(c, b, d) {
    var h = document.getElementById("messages");
    h.innerText = c;
    h.style.color = b == true ? "red" : "green";
    h.style.opacity = "1";
    if (d > -1) document.getElementsByClassName("short")[d].style.backgroundColor = "rgba(255,0,0,0.6)";
    window.setTimeout(function () {
        h.style.opacity = "0";
        if (d > -1) document.getElementsByClassName("short")[d].style.backgroundColor = ""
    },
    4E3)
}
function v(c, b) {
    if (c == "hide") {
        document.getElementsByClassName("colors")[0].style.display = "none";
        document.getElementsByClassName("colors")[1].style.display = "none"
    } else if (document.getElementsByClassName("colors")[c].style.display == "none") {
        document.getElementsByClassName("colors")[c].style.top = b.offsetTop + 22 + "px";
        document.getElementsByClassName("colors")[c].style.left = b.offsetLeft + "px";
        document.getElementsByClassName("colors")[c].style.display = "block";
        if (c == "0") document.getElementsByClassName("colors")[1].style.display =
        "none";
        else document.getElementsByClassName("colors")[0].style.display = "none"
    } else document.getElementsByClassName("colors")[c].style.display = "none"
}
function x(c) {
    var b = window.event,
    d = b.target ? b.target : b.srcElement;
    d.b = 110;
    d.c = 100;
    d.e = 0;
    var h = document.getElementById("range_dot"),
    k = document.getElementById("range_bar_2"),
    a = document.preferences.theme[4],
    f = document.getElementById("range_porcent");
    a.d = 0;
    var l = parseInt(h.style.left);
    if (isNaN(l)) l = 0;
    var j = b.screenX;
    if (c) {
        c = l = Math.round(c * (d.b / d.c));
        if (c > d.b) c = d.b;
        if (c < 0) c = 0;
        h.style.left = c - 4 + "px";
        k.style.width = c + "px";
        a.value = Math.round(c / (d.b / d.c));
        f.innerText = a.value + "%"
    } else {
        f.style.opacity = "1";
        var g =
        function () {
            var e = l + window.event.screenX - j;
            if (e > d.b) e = d.b;
            if (e < 0) e = 0;
            h.style.left = e - 4 + "px";
            k.style.width = e + "px";
            a.value = Math.round(e / (d.b / d.c));
            f.innerText = a.value + "%";
            s()
        };
        document.addEventListener("mousemove", g, false);
        document.addEventListener("mouseup",
        function () {
            document.removeEventListener("mousemove", g);
            f.style.opacity = "0"
        },
        false)
    }
}
document.addEventListener("mouseup",
function (c) {
    c.target.parentNode.className != "colors" && c.target.className != "colors" && c.target.className != "color" && c.target.className != "preview" && v("hide")
},
false);
window.onload = function () {
    r()
};

function SelectSource() {
    if (document.preferences.srsService.selectedIndex == 1) {
        $('#theNote1').show('slow');
    } else {
        $('#theNote1').hide('slow');
    }
}




$(document).ready(function () {
    if (localStorage["showOptionsPagePopUpImages6"] == undefined || localStorage["showOptionsPagePopUpImages6"] == '') {
        localStorage["showOptionsPagePopUpImages6"] = '1'; //default show notifications
        $(".group1").colorbox({ rel: 'group1', open: true, onClosed: function () {$('#0').click(); } });

    }

    //on start
    $('#0').click();
});