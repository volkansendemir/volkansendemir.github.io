var qn, ancItem, curl, dirs, qnum, text, main, newnav;
var bc, div, bq, cite;

window.addEventListener("load", function() {

    qn = document.querySelector("main > div.question > div.title > h1");
    main = document.querySelector("main");
    ancItem = document.createElement("a");
    newnav = document.createElement("nav");
    newnav.classList.add("bottom-nav");
    curl = window.location.href;
    dirs = curl.split("/");
    qnum = dirs[dirs.length-1].split("-")[1].split(".html")[0]

    document.title = ("Project Euler - " + qnum);

    text = document.createTextNode(qn.innerHTML);
    qn.innerHTML = "";
    ancItem.appendChild(text);
    ancItem.setAttribute("href", ("https://projecteuler.net/problem=" + qnum));
    ancItem.setAttribute("target", "_blank");
    qn.appendChild(ancItem);

    bc = document.querySelector("nav.breadcrumbs");
    if (parseInt(qnum) > 1) {
        div = document.createElement("div");
        div.classList.add("prev");
        ancItem = document.createElement("a");
        arrow = document.createElement("i");
        text = document.createTextNode("← ");
        arrow.appendChild(text);
        ancItem.appendChild(arrow);
        text = document.createTextNode("Problem #" + (parseInt(qnum) - 1));
        ancItem.appendChild(text);
        ancItem.setAttribute("href", (curl.replace(("problem-"+qnum), ("problem-"+(parseInt(qnum)-1)))));
        div.appendChild(ancItem);
        bc.appendChild(div);
        newnav.appendChild(div.cloneNode(true));
    }
    if (parseInt(qnum) < 27) {
        div = document.createElement("div");
        div.classList.add("next");
        ancItem = document.createElement("a");
        text = document.createTextNode("Problem #" + (parseInt(qnum) + 1));
        ancItem.appendChild(text);
        arrow = document.createElement("i");
        text = document.createTextNode(" →");
        arrow.appendChild(text);
        ancItem.appendChild(arrow);
        ancItem.setAttribute("href", (curl.replace(("problem-"+qnum), ("problem-"+(parseInt(qnum)+1)))));
        div.appendChild(ancItem);
        bc.appendChild(div);
        newnav.appendChild(div.cloneNode(true));
    }

    main.appendChild(newnav);

    bq = document.querySelector("main > div.question > blockquote.question");
    cite = document.createElement("cite");
    ancItem = document.createElement("a");
    ancItem.setAttribute("href", "https://projecteuler.net/");
    ancItem.setAttribute("target", "_blank");
    text = document.createTextNode("Project Euler");
    ancItem.appendChild(text);
    cite.appendChild(ancItem);
    bq.appendChild(cite);

    window.addEventListener("hashchange", function(){window.scrollBy(0, (-window.innerHeight * 0.075))});

});




