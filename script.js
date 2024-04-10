if (getParameterByName('code') != null) {
    document.querySelector('#input').value = getParameterByName('code');
    checkDevice()
} else {
    document.querySelector('#input').removeAttribute('disabled');
    document.querySelector('.go_btn').textContent = '點我歸戶';
}

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return null;
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function toggleByBtn() {
    if (getParameterByName('code') === null) {
        let code = document.querySelector('#input').value.trim();
        if (code === '') {
            alert('請輸入需歸戶的序號');
            return
        }
        if (checkDevice(true)) {
            window.location.replace(
                `foodpanda://?c=TW&s=o&code=${code}`,
            );
        } else {
            window.location.replace(
                `https://www.foodpanda.com.tw/vouchers?code=${code}`,
            );
        }
    } else {
        checkDevice()
    }
}

function redirectByDesktop() {
    window.location.replace(
        `https://www.foodpanda.com.tw/vouchers?code=${getParameterByName('code')}`,
    );
}

function redirectByMobile() {
    window.location.replace(
        `foodpanda://?c=TW&s=o&code=${getParameterByName('code')}`,
    );
}

function checkDevice(onlyCallback = false) {
    try {
        document.createEvent("TouchEvent");
        if (onlyCallback) {
            return true
        } else {
            redirectByMobile()
        }
    } catch (e) {
        if (onlyCallback) {
            return false
        } else {
            redirectByDesktop()
        }
    }
}

function getShareLink(){
    let shareLink = "https://pokotw.dev/panda";
    let code = document.querySelector('#input').value.trim();
    if (code === ''){
        shareLink += `?code=改為你要分享的序號`;
    }else{
        shareLink += `?code=${code}`;
    }
    let input = document.createElement('input');
    input.setAttribute('readonly', 'readonly');
    input.setAttribute('value', shareLink);
    document.body.appendChild(input);
    input.select();
    input.setSelectionRange(0, 9999);
    document.execCommand('copy');
    document.body.removeChild(input);
    alert('已複製分享連結');
}
