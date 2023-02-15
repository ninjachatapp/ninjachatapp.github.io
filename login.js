if (localStorage.getItem('auth')) {
    window.location.replace('index.html')
}


function register() {
    let baseURL = 'https://ninjachat.pythonanywhere.com/';
    let authorname = document.getElementById('authorname').value;
    let authorpass = document.getElementById('authorpass').value;
    if (!authorname.trim() == "") {
        if (!authorpass.trim() == "") {
            fetch(`${baseURL}/login/${encodeURIComponent(authorname)}/${encodeURIComponent(authorpass)}`)
            .then((response) => response.json())
            .then(json => {
                console.log(json)
                if (json.data == "success") {
                    localStorage.setItem("auth", decodeURIComponent(json.auth));
                    window.location.replace('index.html');
                } else if (json.data == "user no exist") {
                    alert('No user by that username exists.')
                } else if (json.data == "incorrect password") {
                    alert('Incorrect Password.')
                } else if (json.data == "adminsuccess") {
                    localStorage.setItem("auth", decodeURIComponent(json.auth));
                    localStorage.setItem("adminkey", decodeURIComponent(json.adminkey));
                    window.location.replace('index.html');
                }
            })
        }
    }
}