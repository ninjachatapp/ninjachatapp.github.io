function register() {
    let authorname = document.getElementById('authorname').value;

    if (!authorname.trim() == "") {
        localStorage.setItem('authorname', authorname);
        window.location.replace('index.html');
    }
}