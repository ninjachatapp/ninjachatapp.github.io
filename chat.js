if (!localStorage.getItem('authorname')) {
    window.location.replace('signup.html')
}
document.getElementById('authorname').textContent = localStorage.getItem('authorname')


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
                if (decodeURIComponent(curr.author) == localStorage.getItem('authorname')) {
                    newMsg.classList.add('yours')
                }
                newMsg.innerHTML = `<p class="author">${decodeURIComponent(curr.author)}</p><p class="content">${decodeURIComponent(curr.message)}</p>`

                messages.appendChild(newMsg)
            }

            messages.scrollTop = messages.scrollHeight;
        }
})
}

function send(msg) {
    msg = encodeURIComponent(msg)
    fetch(`${baseURL}/${msg}/${encodeURIComponent(localStorage.getItem('authorname'))}`)
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
getAll();
getcurrid();

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


setInterval(() => {
    console.log('hi!')
    getcurrid();
}, 5000);
