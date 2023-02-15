if (localStorage.getItem('auth')) {
    window.location.replace('index.html')
}

function register() {
    let baseURL = 'https://ninjachat.pythonanywhere.com/';
    let authorname = document.getElementById('authorname').value;
    let authorpass = document.getElementById('authorpass').value;
    if (!authorname.trim() == "") {
        if (!authorpass.trim() == "") {
            fetch(`${baseURL}/signup/${encodeURIComponent(authorname)}/${encodeURIComponent(authorpass)}`)
            .then((response) => response.json())
            .then(json => {
                if (json.data == "success") {
                    localStorage.setItem("auth", decodeURIComponent(json.auth));
                    window.location.replace('index.html');
                } else {
                    alert('A user by that name exists. Please choose a different name.')
                }
            })
        }
    }
}