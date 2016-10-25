


function validateRegex(eleName,regex) {
    var obj = document.getElementById(eleName);
    var msg = document.getElementById(eleName + "Msg");
    if (regex.test(obj.value)) {
        obj.className = "right";
        if (msg != null) {
            msg.innerHTML = "<font color = 'green'>内容输入正确！</font>";
        }
        return true;
    } else {
        obj.className = "wrong";
        if (msg != null) {
            msg.innerHTML = "<font color = 'red'>内容不能为空或输入的不为数字！</font>";

        }
        return false;
    }
}
