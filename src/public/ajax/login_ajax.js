function login() {
    $.ajax({
        url: document.location.pathname + document.location.search,
        type: "POST",
        data: {
            username: $('#username').val().toString(),
            password: $('#password').val().toString()
        },
    }).then(data => {
        let checkbox = document.getElementById('customCheck1');
        if (checkbox.checked) {
            setCookie('token', data.data.token_key, 14);
            setCookie('username', data.data.username, 14);
        }
        else {
            setCookie('token', data.data.token_key);
            setCookie('username', data.data.username);
        }

        if (data.data.prevlink) {
            window.location = `http://localhost:5000${data.data.prevlink}`;
        }
        else {
            window.location = `http://localhost:5000/home`;
        }
    })
        .catch(err => {
            console.log(err.responseJSON);
            let tb = document.getElementById('tb');
            tb.style.display = "block";
            tb.innerText = err.responseJSON.message;
            setTimeout(function () {
                tb.style.display = "none";
            }, 3000)
        })
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}