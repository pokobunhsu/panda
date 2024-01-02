function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return null;
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

if (getParameterByName('code') != null) {
    document.querySelector('#input').value = getParameterByName('code');
    window.location.replace(
        `foodpanda://?c=TW&s=o&code=${getParameterByName('code')}`,
    );
} else {
    document.querySelector('#input').removeAttribute('disabled');
}



function toggleByBtn() {
    if (getParameterByName('code') === null) {
        if (document.querySelector('#input').value.trim() === '') {
            alert('請輸入需歸戶的序號');
            return
        }
        let code = document.querySelector('#input').value.trim();
        window.location.replace(
            `foodpanda://?c=TW&s=o&code=${code}`,
        );
        return;
    } else {
        window.location.replace(
            `foodpanda://?c=TW&s=o&code=${getParameterByName('code')}`,
        );
    }

}


