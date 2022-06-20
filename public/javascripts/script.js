const currentHref = window.location.href;
const target = document.getElementById('new-btn');

if (currentHref.includes('/bills')) {
    target.setAttribute("href", "/bills/new")
    target.innerHTML = "New"
    target.setAttribute("style", "display: in-line")
} else if (currentHref.includes('/workers')) {
    target.setAttribute("href", "/register")
    target.innerHTML = "New"
    target.setAttribute("style", "display: in-line")
} else if (currentHref.includes('/logs')) {
    target.setAttribute("href", "/logs/new")
    target.innerHTML = "New"
    target.setAttribute("style", "display: in-line")
} else if (currentHref.includes('/payees')) {
    target.setAttribute("href", "/payees/new")
    target.innerHTML = "New"
    target.setAttribute("style", "display: in-line")
} else if (currentHref.includes('/cheques')) {
    target.setAttribute("href", "/cheques/new")
    target.innerHTML = "New"
    target.setAttribute("style", "display: in-line")
} 