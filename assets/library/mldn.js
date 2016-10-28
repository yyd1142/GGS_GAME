
function validateRegister() {
    return validateRegex("register", /^(-?\d+)(\.\d+)?$/);
}

function validateActual() {
    return validateRegex("actual", /^(-?\d+)(\.\d+)?$/);
}

function validateProfit() {
    return validateRegex("profit", /^(-?\d+)(\.\d+)?$/);
}

function validate() {
    return validateRegister;
}

function yan() {

    var a = document.getElementsByName('score')
    var b = 0
    for (var i = 0; i < a.length; i++) {
        if (a.item(i).checked) {
            b++
        }
    }
    if (b < 1) {
        alert("第一个选项未选择")
    }

    var c = document.getElementsByName('score1')
    var d = 0
    for (var i = 0; i < c.length; i++) {
        if (c.item(i).checked) {
            d++
        }
    }
    if (d < 1) {
        alert("第二个选项未选择")
    }

    var e = document.getElementsByName('score2')
    var f = 0
    for (var i = 0; i < e.length; i++) {
        if (e.item(i).checked) {
            f++
        }
    }
    if (f < 1) {
        alert("第三个选项未选择")
    }


    var g = document.getElementsByName('score3')
    var h = 0
    for (var i = 0; i < g.length; i++) {
        if (g.item(i).checked) {
            h++
        }
    }
    if (h < 1) {
        alert("第四个选项未选择")
    }

    var j = document.getElementsByName('score4')
    var k = 0
    for (var i = 0; i < j.length; i++) {
        if (j.item(i).checked) {
            k++
        }
    }
    if (k < 1) {
        alert("第五个选项未选择")
    }
    var l = document.getElementsByName('score5')
    var m = 0
    for (var i = 0; i < l.length; i++) {
        if (l.item(i).checked) {
            m++
        }
    }
    if (m < 1) {
        alert("第六个选项未选择")
    }
    var n = document.getElementsByName('score6')
    var o = 0
    for (var i = 0; i < n.length; i++) {
        if (n.item(i).checked) {
            o++
        }
    }
    if (o < 1) {
        alert("第七个选项未选择")
    }
    var p = document.getElementsByName('score7')
    var q = 0
    for (var i = 0; i < p.length; i++) {
        if (p.item(i).checked) {
            q++
        }
    }
    if (q < 1) {
        alert("第八个选项未选择")
    }
}

function cal() {
    var t_score = parseInt(document.form1.score.value);
    var t_score1 = parseInt(document.form1.score1.value);
    var t_score2 = parseInt(document.form1.score2.value);
    var t_score3 = parseInt(document.form1.score3.value);
    var t_score4 = parseInt(document.form1.score4.value);
    var t_score5 = parseInt(document.form1.score5.value);
    var t_score6 = parseInt(document.form1.score6.value);
    var t_score7 = parseInt(document.form1.score7.value);
    var t_register = document.getElementById("register").value;
    var t_actual = document.getElementById("actual").value;
    var t_profit = document.getElementById("profit").value;
    let firstResult = '';
    if (t_actual == 0 && t_profit < 0) {
        firstResult = t_register * 0.2 * 0.1 * t_score / 10 * [(t_score1 + t_score2 + t_score3 + t_score4 + t_score5 + t_score6 + t_score7) / 10] + '万元';
    } else if (t_profit < 0) {
        firstResult = t_actual * 0.1 * t_score / 10 * [(t_score1 + t_score2 + t_score3 + t_score4 + t_score5 + t_score6 + t_score7) / 10] + '万元';
    } else {
        firstResult = t_profit * t_score / 10 * [(t_score1 + t_score2 + t_score3 + t_score4 + t_score5 + t_score6 + t_score7) / 10] + '万元';
    }
    sessionStorage.setItem('firstResult', firstResult);
}
