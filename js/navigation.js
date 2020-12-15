var navbox_object, window_object, touch_object, navbox, navph, navcon, aside, hyperlinks;
var has_appeared, mdown, dragging, timeout, last_touch, x_vec, y_vec, drag_dist, drag_x, drag_y;
var touch_timer, check_timer;
var navbox_pop;
var is_popping, is_unpopping, dx, dy, i;

window.onload = function() {
    navbox_object = {
        windowX: window.innerWidth - 75,
        windowY: 50,
        currentX: 0,
        currentY: 0,
        defaultX: 0,
        defaultY: 0,
        limitY: 0
    };
    window_object = {
        windowX: document.body.getBoundingClientRect().left,
        windowY: document.body.getBoundingClientRect().top
    };
    touch_object = {
        startX: 0,
        startY: 0,
        relativeX: 0,
        relativeY: 0
    };
    aside = document.querySelector("aside.nav-box-aside");
    aside.id = "table_of_contents";
    create_navbox();
    navbox = document.querySelector("div.nav-box");
    navph = document.querySelector("div.nav-placeholder");
    navcon = document.querySelector("div.nav-container");
    hyperlinks = document.querySelectorAll("div.nav-container > ul > li > a");
    has_appeared = false;
    mdown = false;
    dragging = false;
    touch_timer = new Date();
    check_timer = new Date();
    navbox_pop = false;
    is_popping = false;

    navbox_object.defaultX = navbox.getBoundingClientRect().left - document.body.getBoundingClientRect().left;
    navbox_object.defaultY = navbox.getBoundingClientRect().top - document.body.getBoundingClientRect().top;
    navbox_object.limitY = navbox.getBoundingClientRect().height + navbox_object.defaultY;

    navbox_mouseover = function(e) {
        if (navbox_pop) {
            if (timeout) {
                clearTimeout(timeout);
            }
            if ((!has_appeared) && (!dragging)) {
                navbox.style.opacity = "1";
                navbox.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
            }
        }
    };

    if (!('ontouchstart' in window) && !(window.navigator.msPointerEnabled)) {
        navbox.onmouseover = navbox_mouseover;
        aside.style.height = aside.getBoundingClientRect().height +"px";
        aside.style.width = aside.getBoundingClientRect().width + "px";
    } else {
        aside.style.height = aside.getBoundingClientRect().height +"px";
        aside.style.width = aside.getBoundingClientRect().width + "px";
    }

    navbox.onmouseout = function(e) {
        if (navbox_pop) {
            if (timeout) {
                clearTimeout(timeout);
            }
            timeout = setTimeout(function() {
                if ((!has_appeared) && (!navbox.matches(":hover"))) {
                    navbox.style.opacity = "0.9";
                    navbox.style.backgroundColor = "rgba(255, 255, 255, 0.4)";
                }
            }, 500);
        }
    };

    navbox_mousedown = function(e) {
        if (navbox_pop) {
            e.preventDefault();
            touch_object.relativeX = e.pageX - navbox.getBoundingClientRect().left;
            touch_object.relativeY = e.pageY - navbox.getBoundingClientRect().top;
            touch_object.startX = e.pageX;
            touch_object.startY = e.pageY;
            mdown = true;
        }
    };

    if (!('ontouchstart' in window) && !(window.navigator.msPointerEnabled)) {
        navbox.onmousedown = navbox_mousedown;
    }

    navbox.addEventListener("touchstart", function(e) {
        if (navbox_pop) {
            touch_object.relativeX = e.touches[0].clientX - navbox.getBoundingClientRect().left;
            touch_object.relativeY = e.touches[0].clientY - navbox.getBoundingClientRect().top;
            touch_object.startX = e.touches[0].clientX;
            touch_object.startY = e.touches[0].clientY;
            mdown = true;
        } else {
            document.removeEventListener("touchstart", preventBehavior, {passive: false});
            document.removeEventListener("touchend", preventBehavior, {passive: false});
        }
    });

    function preventBehavior(e) {
        if (mdown && navbox_pop) {
            e.preventDefault();
        }
    };

    document.addEventListener("touchstart", preventBehavior, {passive: false});

    document.onmousemove = function(e) {
        if (mdown && navbox_pop) {
            x_vec = ((touch_object.startX - e.pageX) * (touch_object.startX - e.pageX));
            y_vec = ((touch_object.startY - e.pageY) * (touch_object.startY - e.pageY));
            drag_dist = Math.sqrt(x_vec + y_vec);
            if (drag_dist > 10) {
                dragging = true;
            }
        }
        if (dragging && navbox_pop) {
            e.preventDefault();
            drag_x = e.pageX - touch_object.startX;
            drag_y = e.pageY - touch_object.startY;
            touch_object.startX = e.pageX;
            touch_object.startY = e.pageY;
            if (!is_unpopping) {
                navbox_object.windowX = navbox_object.windowX + drag_x;
            }
            navbox_object.windowY = navbox_object.windowY + drag_y;
            navbox_move();
        }
    };

    document.addEventListener("touchmove", function(e) {
        if (mdown && navbox_pop) {
            last_touch = e.targetTouches[0];
            x_vec = ((touch_object.startX - last_touch.clientX) * (touch_object.startX - last_touch.clientX));
            y_vec = ((touch_object.startY - last_touch.clientY) * (touch_object.startY - last_touch.clientY));
            drag_dist = Math.sqrt(x_vec + y_vec);
            if (drag_dist > 20) {
                dragging = true;
            }
        }
        if (dragging && navbox_pop) {
            drag_x = last_touch.clientX - touch_object.startX;
            drag_y = last_touch.clientY - touch_object.startY;
            touch_object.startX = last_touch.clientX;
            touch_object.startY = last_touch.clientY;
            if (!is_unpopping) {
                navbox_object.windowX = navbox_object.windowX + drag_x;
            }
            navbox_object.windowY = navbox_object.windowY + drag_y;
            navbox_move();
        }
    }, false);

    document.addEventListener("touchmove", preventBehavior, {passive: false});

    navbox_mouseup = function() {
        if (dragging && navbox_pop) {
            dragging = false;
            navbox_margin_check();
            if (!is_unpopping) {
                navbox_object.windowX = navbox.getBoundingClientRect().left;
            }
            navbox_object.windowY = navbox.getBoundingClientRect().top;
        } else if (mdown && navbox_pop) {
            if (has_appeared) {
                navcon_disappear(0);
                window.location.hash = "";
                history.pushState("", document.title, window.location.pathname);
            } else {
                check_timer = new Date();
                if ((check_timer - touch_timer) < 500) {
                    clearTimeout(click_timeout);
                    window.location.hash = "table_of_contents";
                    unpop_navbox();
                    window.location.hash = "";
                    history.pushState("", document.title, window.location.pathname);
                } else {
                    touch_timer = new Date();
                    click_timeout = setTimeout(function() {
                        navcon_appear(0);
                        navbox_margin_check(true);
                    }, 500);
                }
            }
        } else if ((!mdown) && (!navbox_pop)) {
            pop_navbox();
        }
        mdown = false;
    };

    if (!('ontouchstart' in window) && !(window.navigator.msPointerEnabled)) {
        document.onmouseup = navbox_mouseup;
    }

    document.addEventListener("touchend", function(e) {
        if (dragging && navbox_pop) {
            dragging = false;
            navbox_margin_check();
            if (!is_unpopping) {
                navbox_object.windowX = navbox.getBoundingClientRect().left;
            }
            navbox_object.windowY = navbox.getBoundingClientRect().top;
        } else if (mdown && navbox_pop) {
            if (has_appeared) {
                setTimeout(function() {
                    navcon_disappear(0);
                    document.addEventListener("touchstart", preventBehavior, {passive: false});
                    document.addEventListener("touchend", preventBehavior, {passive: false});
                    navbox_move();
                }, 50);
            } else {
                check_timer = new Date();
                if ((check_timer - touch_timer) < 500) {
                    clearTimeout(click_timeout);
                    window.location.hash = "table_of_contents";
                    unpop_navbox();
                    window.location.hash = "";
                    history.pushState("", document.title, window.location.pathname);
                } else {
                    touch_timer = new Date();
                    click_timeout = setTimeout(function() {
                        navcon_appear(0);
                        document.removeEventListener("touchstart", preventBehavior, {passive: false});
                        document.removeEventListener("touchend", preventBehavior, {passive: false});
                        navbox_margin_check(true);
                    }, 500);
                }
            }
        } else if ((!mdown) && (!navbox_pop)) {
            setTimeout(function() {
                document.addEventListener("touchstart", preventBehavior, {passive: false});
                document.addEventListener("touchend", preventBehavior, {passive: false});
                pop_navbox();
            }, 50);
        }
        mdown = false;
    });

    document.addEventListener("touchend", preventBehavior, {passive: false});
    console.log(window_object.windowX);
    document.addEventListener("scroll", function(e) {
        if (has_appeared) {
            navcon_disappear();
        }
        if ((window_object.windowY < (60 - navbox_object.limitY)) && (!is_popping)) {
            pop_navbox();
        } else if ((window_object.windowY > (60 - navbox_object.limitY)) && (!is_popping)) {
            unpop_navbox();
        }

        window_object.windowX = document.body.getBoundingClientRect().left;
        window_object.windowY = document.body.getBoundingClientRect().top;
        if (navbox_pop && (!is_popping)) {
            navbox_move(has_appeared);
        }
    });

    window.onresize = function() {
        if (navbox_pop) {
            navbox_move();
            navbox_margin_check();
        }
    };

};

create_navbox = function() {
    headers = document.querySelectorAll("h2");
    var list = document.createElement("ul");
    for (i = 0; i < headers.length; i++) {
        listItem = document.createElement("li");
        text = document.createTextNode(headers[i].textContent);
        ancItem = document.createElement("a");
        ancItem.setAttribute("href", "#"+headers[i].id)
        ancItem.appendChild(text);
        listItem.appendChild(ancItem);
        list.appendChild(listItem);
    }

    var nv = document.createElement("nav");
    nv.appendChild(list);

    var nc = document.createElement("div");
    nc.classList.add("nav-container");
    nc.appendChild(nv);

    var np = document.createElement("div");
    np.classList.add("nav-placeholder");
    text = document.createTextNode("NAV");
    np.appendChild(text);

    var ncr = document.createElement("div");
    ncr.classList.add("nav-current");

    var nb = document.createElement("div");
    nb.classList.add("nav-box");
    nb.appendChild(nc);
    nb.appendChild(np);
    nb.appendChild(ncr);
    aside.appendChild(nb);
};

navcon_appear = function(delayms) {
    timeout = setTimeout(function() {
        navph.setAttribute("style", "display:none;");
        navcon.setAttribute("style", "display:grid;");
        navbox.style.backgroundColor = "rgba(255, 255, 255, 1)";
        navbox.style.opacity = "1";
        has_appeared = true;
        navbox_margin_check(true);
    }, delayms);
};

navcon_disappear = function(delayms) {
    timeout = setTimeout(function() {
        navcon.setAttribute("style", "display:none;");
        navph.setAttribute("style", "display:grid;");
        navbox = document.querySelector("div.nav-box");
        navbox.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
        navbox.style.opacity = "0.4";
        has_appeared = false;
        navbox_move();
        navbox_margin_check();
    }, delayms);
};

navbox_move = function(isappear=false) {
    navbox.style.left = (navbox_object.windowX - window_object.windowX) + "px";
    navbox.style.top = (navbox_object.windowY - window_object.windowY) + "px";
    navbox_object.currentX = navbox_object.windowX - window_object.windowX;
    navbox_object.currentY = navbox_object.windowY - window_object.windowY;
    navbox_margin_check(isappear);
};

navbox_margin_check = function(isappear=false) {
    if ((navbox.getBoundingClientRect().left + navbox.getBoundingClientRect().width) > (window.innerWidth - 25)) {
        if ((!isappear) && (!is_unpopping) && (navbox_pop)) {
            navbox_object.windowX = window.innerWidth - 25 - navbox.getBoundingClientRect().width;
        }
        navbox.style.left = (window.innerWidth - 25 - navbox.getBoundingClientRect().width)+"px";
    }
    if ((navbox.getBoundingClientRect().left < 25) && (!is_popping) && (!is_unpopping) && (navbox_pop)) {
        navbox.style.left = "25px";
        navbox_object.windowX = 25;
    }
    if ((navbox.getBoundingClientRect().top + navbox.getBoundingClientRect().height) > (window.innerHeight - 25)) {
        if (!isappear) {
            navbox_object.windowY = window.innerHeight - 25 - navbox.getBoundingClientRect().height;
        }
        navbox.style.top = (window.innerHeight - 25 - navbox.getBoundingClientRect().height)+"px";
    }
    if ((navbox.getBoundingClientRect().top < 25) && (!is_popping) && (navbox_pop)) {
        navbox.style.top = "25px";
        navbox_object.windowY = 25;
    }
};

pop_navbox = function() {
    if ((!is_popping) && (!navbox_pop)) {
        is_popping = true;
        if (has_appeared) {
            navcon_disappear();
        }
        navbox.style.position = "absolute";
        navbox.style.transition = "background-color 1s, opacity 0.5s";
        navbox.style.alignItems = "center";
        navbox.style.justifyItems = "center";
        navbox.style.boxShadow = "0px 0px 10px rgb(1, 1, 1)";
        navbox.style.whiteSpace = "nowrap";
        navbox.style.touchAction = "manipulation";
        navbox.style.animationName = "shadow-animation";
        navcon.style.display = "none";
        navph.style.display = "grid";
        navbox.style.border = "1px solid rgba(0, 0, 0, 0.75)";
        i = 1;

        function smooth_pop() {
            if ( i >= 40 ) {
                is_popping = false;
                navbox_pop = true;
                navbox.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
                navbox.style.border = "1px solid rgba(0, 0, 0, 0.1)";
                navbox.style.opacity = "0.4";
                return;
            }
            dx = parseInt((navbox_object.windowX - window_object.windowX - navbox_object.currentX) / (40 - i + 1));
            dy = parseInt((navbox_object.windowY - window_object.windowY - navbox_object.currentY) / (40 - i + 1));
            i += 1;
            navbox_object.currentX = navbox_object.currentX + dx;
            if ( i >= 30 ) {
                navbox_object.currentY = navbox_object.currentY + dy;
                navbox.style.top = (navbox_object.currentY + dy) + 'px';
            } else {
                navbox_object.currentY = navbox_object.currentY + dy + 10;
                navbox.style.top = (navbox_object.currentY + dy + 10) + 'px';
            }
            if ( i <= 20 ) {
                navbox.style.minWidth = ((aside.getBoundingClientRect().width / 20 * (20 - i)) + 50) + 'px';
                navbox.style.minHeight = ((aside.getBoundingClientRect().height / 20 * (20 - i)) + 50) + 'px';
            }
            navbox.style.left = (navbox_object.currentX + dx) + 'px';
            setTimeout(smooth_pop, 10);
        }
        smooth_pop();
        navbox_margin_check();
        console.log(navbox.getBoundingClientRect().left);
    }
};

unpop_navbox = function() {
    if ((!is_popping) && (navbox_pop)) {
        is_popping = true;
        is_unpopping = true;
        if (has_appeared) {
            navcon_disappear();
        }
        navbox.style.backgroundColor = "rgba(255, 255, 255, 1)";
        navbox.style.transition = "";
        navbox.style.alignItems = "center";
        navbox.style.justifyItems = "start";
        navbox.style.boxShadow = "";
        navbox.style.whiteSpace = "";
        navbox.style.touchAction = "";
        navbox.style.animationName = "";
        navbox.style.border = "1px solid rgba(0, 0, 0, 0.75)";

        i = 1;

        function smooth_unpop() {
            if ( i >= 40 ) {
                is_popping = false;
                is_unpopping = false;
                navbox_pop = false;
                navbox.style.position = "static";
                navcon.style.display = "grid";
                navph.style.display = "none";
                navbox.style.border = "1px solid rgba(0, 0, 0, 0.1)";
                navbox.style.opacity = "1";
                return;
            }
            if ( i > 20 ) {
                navbox.style.minWidth = (aside.getBoundingClientRect().width / 20 * Math.sqrt((i - 19)*20)) + 'px';
                navbox.style.minHeight = (aside.getBoundingClientRect().height / 20 * Math.sqrt((i - 19)*20)) + 'px';
            }
            dx = parseInt((navbox_object.currentX - navbox_object.defaultX) / (40 - i + 1));
            dy = parseInt((navbox_object.currentY - navbox_object.defaultY) / (40 - i + 1));
            i += 1;
            navbox_object.currentX = navbox_object.currentX - dx;
            navbox_object.currentY = navbox_object.currentY - dy;
            navbox.style.left = (navbox_object.currentX - dx) + 'px';
            navbox.style.top = (navbox_object.currentY - dy) + 'px';
            setTimeout(smooth_unpop, 5);
        }
        smooth_unpop();
    }
};
