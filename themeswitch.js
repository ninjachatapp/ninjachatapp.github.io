let themeswitcher = document.getElementById("themeswitch");

function darkMode() {
    themeswitcher.innerHTML = `<i class="fa-solid fa-sun"></i>`
    document.body.style.background = "rgb(32, 32, 32)"
    document.body.style.color = "white";
    themeswitcher.style.background = "white";
    themeswitcher.style.color = "black";
    document.getElementById("sendBtn").style.background = "white";
    document.getElementById("sendBtn").style.color = "black";
    document.querySelector(".msgdiv").style.background = "rgb(32, 32, 32)"
    document.querySelector(".left-bar").style.borderColor = "rgb(42, 42, 42)"
    document.querySelector(".inputbar").style.borderColor = "rgb(42, 42, 42)"
    document.querySelector(".curr-chat").style.borderColor = "rgb(42, 42, 42)"
    let length = 0;
    document.querySelectorAll(".date").forEach((date) => {
        length += 1;
    })
    console.log(length)
    for (let i = 0; i < length; i++) {
        document.getElementById(`date${i}`).style.color = "white"
        document.getElementById(`date${i}`).style.opacity = "0.65"
    }
    console.log(document.getElementById("messages").style.scrollbarTrackColor)
    document.getElementById("messages").style.scrollbarTrackColor="red"
    document.getElementById("msg").style.background = "rgb(42, 42, 42)"
    document.getElementById("msg").style.border = "2px solid rgb(50, 50, 50)"
    document.getElementById("msg").style.color = "white";
}

function lightMode() {
    themeswitcher.innerHTML = `<i class="fa-solid fa-moon"></i>`
    document.body.style.background = "white"
    document.body.style.color = "black";
    themeswitcher.style.background = "#080808";
    themeswitcher.style.color = "white";
    document.getElementById("sendBtn").style.background = "#080808";
    document.getElementById("sendBtn").style.color = "white";
    document.querySelector(".msgdiv").style.background = "white"
    document.querySelector(".left-bar").style.borderColor = "rgb(230, 230,230)"
    document.querySelector(".inputbar").style.borderColor = "rgb(230, 230,230)"
    document.querySelector(".curr-chat").style.borderColor = "rgb(230, 230,230)"
    let length = 0;
    document.querySelectorAll(".date").forEach((date) => {
        length += 1;
    })
    console.log(length)
    for (let i = 0; i < length; i++) {
        document.getElementById(`date${i}`).style.color = "black"
        document.getElementById(`date${i}`).style.opacity = "0.5"
    }
    console.log(document.getElementById("messages").style.scrollbarTrackColor)
    document.getElementById("messages").style.scrollbarTrackColor="red"
    document.getElementById("msg").style.background = "rgb(238, 238,238)"
    document.getElementById("msg").style.border = "2px solid rgb(230, 230,230)"
    document.getElementById("msg").style.color = "white";
}

function themeSwitch() {
    themeswitcher.classList.toggle("darkmode");

    if (themeswitcher.classList.contains("darkmode")) {
        darkMode()
    } else {
        lightMode()
    }
}