document.getElementById("adminpanel").style.display = "none"
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

    fetch(`${baseURL}/getrecent`)
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
                let msg;
                try {
                    msg = decodeURIComponent(curr.message);
                }
                catch {
                    msg = curr.message
                }
                newMsg.innerHTML = `<p class="date">${curr.time} GMT</p><p class="author">${decodeURIComponent(currauth)}</p><p class="content">${msg}</p>`

                messages.appendChild(newMsg)
            }

            messages.scrollTop = messages.scrollHeight;
        }
})
}
function acceptRequest(username, req) {
    fetch(`${baseURL}/grant${req}/${username}/${localStorage.getItem("adminkey")}`)
    .then((response) => response.json())
    .then(json => {
        let data = json.data;

        if (json.data = "success") {
            console.log("successfully granted perms!");
            window.location.reload()
        }
    })
}
function getAllRequests() {
    fetch(`${baseURL}/getallrequests/${localStorage.getItem("adminkey")}`)
    .then((response) => response.json())
    .then(json => {
        let data = json.data;
        document.getElementById("admin").innerHTML = ""

        if (data.length == 0) {
            document.getElementById("admin").textContent = "No member requests."
        }

        for (i in data) {
            let curr = data[i];

            let div = document.createElement("div");
            div.classList.add("request");
            div.innerHTML = `<p><span>${curr.username}</span> wants to be a ${curr.req}</p>`
            let btn = document.createElement("button");
            btn.innerHTML = `<i class="fa-solid fa-check"></i>`
            btn.setAttribute('onclick', `acceptRequest('${curr.username}', '${curr.req}')`);
            div.appendChild(btn)
            document.getElementById("admin").appendChild(div)
        }
    })
}
getAllRequests()
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

        // console.log(id, currid, (!id == currid))

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
            document.getElementById("pma").innerHTML = "You do not have the permissions to send messages.";
            document.getElementById('reqpermbtn').style.display = 'block';
        } else if (json.data == "admin") {
            if (!localStorage.getItem("adminkey")) {
                localStorage.setItem("adminkey", "411master");
            }
            document.getElementById("adminpanel").style.display = "flex"
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
    getcurrid();
}, 5000);
