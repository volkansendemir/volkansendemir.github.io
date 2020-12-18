var nbc, olbc, libc, text, ancItem, sbc;
var curl, dirs, cur_part, cur_split, cur_text;


window.addEventListener("load", function() {
    nbc = document.querySelector("nav.breadcrumbs");
    olbc = document.createElement("ol");
    olbc.setAttribute("itemscope","");
    olbc.setAttribute("itemtype", "http://schema.org/BreadcrumbList");
    olbc.classList.add("bc");
    curl = window.location.href;
    dirs = curl.split("/");
    text = document.createTextNode("Home");
    ancItem = document.createElement("a");
    ancItem.setAttribute("itemprop", "item");
    ancItem.setAttribute("href", "/");
    ancItem.appendChild(text);
    libc = document.createElement("li");
    libc.appendChild(ancItem);
    libc.setAttribute("itemprop","itemListElement");
    libc.setAttribute("itemscope","");
    libc.setAttribute("itemtype", "http://schema.org/ListItem");
    olbc.appendChild(libc);
    for (var i = 9; i < dirs.length; i++) {
        text = document.createTextNode(">");
        sbc = document.createElement("span");
        sbc.appendChild(text);
        olbc.appendChild(sbc);
        libc = document.createElement("li");
        cur_part = ""
        cur_split = dirs[i].split("-");
        for (var j = 0; j < cur_split.length; j++) {
            cur_split[j] = cur_split[j].charAt(0).toUpperCase() + cur_split[j].substr(1).toLowerCase().split(".")[0];
        }
        cur_text = cur_split.join(" ");
        text = document.createTextNode(cur_text);
        for (var j = 9; j < (i + 1); j++) {
            cur_part = cur_part + "/" + dirs[j];
        }
        ancItem = document.createElement("a");
        if (i < (dirs.length - 1)) {
            ancItem.setAttribute("href", (cur_part+"/"));
        } else {
            ancItem.classList.add("active");
        }
        ancItem.setAttribute("itemprop", "item");
        ancItem.appendChild(text);
        libc.appendChild(ancItem);
        libc.setAttribute("itemprop","itemListElement");
        libc.setAttribute("itemscope","");
        libc.setAttribute("itemtype", "http://schema.org/ListItem");
        if (i == (dirs.length - 2)) {
            text = document.createTextNode("<");
            sbc = document.createElement("span");
            sbc.appendChild(text);
            sbc.classList.add("mo");
            olbc.appendChild(sbc);
            libc.classList.add("mf");
        }
        olbc.appendChild(libc);
    }
    nbc.appendChild(olbc);
});






