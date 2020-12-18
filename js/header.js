var ng, ulg, lig, text, ancItem, sg;
var curl, dirs, cur_part, cur_split, cur_text;

window.addEventListener("load", function() {
    ng = document.querySelector("nav.global");
    nav_keys = ["Home", "Projects", "Tags", "CV", "Contact"]
    nav_values = ["/", "/projects", "/tags", "/cv", "/contact"]
    ulg = document.createElement("ul");
    for (var i = 0; i < nav_keys.length; i++){
        lig = document.createElement("li");
        ancItem = document.createElement("a");
        text = document.createTextNode(nav_keys[i]);
        ancItem.appendChild(text);
        ancItem.setAttribute("href", nav_values[i]);
        lig.appendChild(ancItem);
        ulg.appendChild(lig);
    }
    ng.appendChild(ulg);
});