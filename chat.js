let workinprogress = false;

if (workinprogress) {
    window.location.replace('workinprogress.html')
}

if (!localStorage.getItem('auth')) {
    window.location.replace('signup.html')
}
document.getElementById('authorname').textContent = localStorage.getItem('auth')


let baseURL = 'https://ninjachat.pythonanywhere.com/';

function getAll() {

    fetch(`${baseURL}/getall`)
    .then((response) => response.json())
    .then(json => {
        let messages = document.getElementById('messages');
        messages.innerHTML = "";
        let data = json.data;

        console.log(data)

        if (data.length == 0) {
            messages.textContent = "There are no messages!"
        } else {
            for (i in data){
                let curr = data[i];
                console.log(curr)

                let newMsg = document.createElement('div');
                newMsg.classList.add('message');
                if (decodeURIComponent(curr.author) == localStorage.getItem('auth')) {
                    newMsg.classList.add('yours')
                }
                currauth = curr.author;
                if (currauth == "Rohit") {
                    currauth = `${currauth} <span style='font-weight: 500; font-size: 0.9rem'>(admin)</span>`
                }
                newMsg.innerHTML = `<p class="date">${curr.time} GMT</p><p class="author">${decodeURIComponent(currauth)}</p><p class="content">${decodeURIComponent(curr.message)}</p>`

                messages.appendChild(newMsg)
            }

            messages.scrollTop = messages.scrollHeight;
        }
})
}

function send(msg) {
    msg = encodeURIComponent(msg)
    fetch(`${baseURL}/postmessage/${msg}/${encodeURIComponent(localStorage.getItem('auth'))}`)
    .then((response) => response.json())
    .then(json => {
        console.log(json)
})
}

function getcurrid() {
    fetch(`${baseURL}/getcurrid`)
    .then((response) => response.json())
    .then(json => {
        let id = json.data;
        let currid = localStorage.getItem('currid');

        console.log(id, currid, (!id == currid))

        if (!currid) {
            localStorage.setItem('currid', id);
            console.log('setnew')
        }
        currid = JSON.parse(currid)
        if (id == currid) {
            console.log('match')
        } else {
            localStorage.removeItem('currid ')
            localStorage.setItem('currid', id);
            getAll();
            console.log(localStorage.getItem('currid'))
        }
    })
}
function requestPerms() {
    fetch(`${baseURL}/openrequest/${localStorage.getItem("auth")}/member`)
    .then((response) => response.json())
    .then(json => {
        console.log(json)
        if (json.data == "existing request found") {
            alert("You have already submitted a request!")
        } else {
            alert("Successfully sent request")
        }
    })
}
function checkPerms() {
    fetch(`${baseURL}/checkperms/${localStorage.getItem("auth")}`)
    .then((response) => response.json())
    .then(json => {
        if (json.data == "viewer") {
            document.getElementById("inputbar").style.display = "none";
            document.getElementById("authorname").style.display = "none";
            document.getElementById("pma").innerHTML = "You do not have the permissions to send messages. <a href='#' onclick='requestPerms()'>Request Perms</a> <a href='#' onclick='localStorage.clear(); window.location.reload()'>Logout</a>";
        } else if (json.data == "admin") {
            if (!localStorage.getItem("adminkey")) {
                localStorage.setItem("adminkey", "411master");
            }
        }
    })
}
getAll();
getcurrid();
checkPerms();

function sendMessage() {
    let msg = document.getElementById('msg').value;

    if (!msg.trim() == "") {
        document.getElementById('msg').value = "";
        send(msg);
        document.getElementById('processing').style.opacity = "1";
        console.log(document.getElementById('processing').style.display)
        setTimeout(() => {
            getAll();
            document.getElementById('processing').style.opacity = "0";
        }, 1000);
    }
}

getAll();
setInterval(() => {
    console.log('hi!')
    getcurrid();
}, 5000);
