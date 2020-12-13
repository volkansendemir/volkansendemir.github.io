var navbox_object, window_object, touch_object, navbox, navph, navcon;
var has_appeared, mdown, dragging, timeout, last_touch, x_vec, y_vec, drag_dist, drag_x, drag_y;


window.onload = function() {
    navbox_object = {
        windowX: 50,
        windowY: 50
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
    navbox = document.querySelector("div.nav-box");
    navph = document.querySelector("div.nav-placeholder");
    navcon = document.querySelector("div.nav-container");
    has_appeared = false;
    mdown = false;
    dragging = false;

    navbox.onmouseover = function(e) {
        if (timeout) {
            clearTimeout(timeout);
        }
        if (!has_appeared && !dragging) {
            navcon_appear(650);
        }
    };

    navbox.onmouseout = function(e) {
        if (timeout) {
            clearTimeout(timeout);
        }
        if (has_appeared && !navbox.matches(":hover")) {
            navcon_disappear(700);
        }
    };

    navbox.onmousedown = function(e) {
        e.preventDefault();
        touch_object.relativeX = e.pageX - navbox.getBoundingClientRect().left;
        touch_object.relativeY = e.pageY - navbox.getBoundingClientRect().top;
        touch_object.startX = e.pageX;
        touch_object.startY = e.pageY;
        mdown = true;
    };

    navbox.addEventListener("touchstart", function(e) {
        e.preventDefault();
        touch_object.relativeX = e.touches[0].clientX - navbox.getBoundingClientRect().left;
        touch_object.relativeY = e.touches[0].clientY - navbox.getBoundingClientRect().top;
        touch_object.startX = e.touches[0].clientX;
        touch_object.startY = e.touches[0].clientY;
        mdown = true;
    });

    document.onmousemove = function(e) {
        if (mdown) {
            x_vec = ((touch_object.startX - e.pageX) * (touch_object.startX - e.pageX));
            y_vec = ((touch_object.startY - e.pageY) * (touch_object.startY - e.pageY));
            drag_dist = Math.sqrt(x_vec + y_vec);
            if (drag_dist > 10) {
                dragging = true;
            }
        }
        if (dragging) {
            e.preventDefault();
            drag_x = e.pageX - touch_object.startX;
            drag_y = e.pageY - touch_object.startY;
            touch_object.startX = e.pageX;
            touch_object.startY = e.pageY;
            navbox_object.windowX = navbox_object.windowX + drag_x;
            navbox_object.windowY = navbox_object.windowY + drag_y;
            navbox_move();
        }
    };

    document.addEventListener("touchmove", function(e) {
        if (mdown) {
            last_touch = e.targetTouches[0];
            x_vec = ((touch_object.startX - last_touch.clientX) * (touch_object.startX - last_touch.clientX));
            y_vec = ((touch_object.startY - last_touch.clientY) * (touch_object.startY - last_touch.clientY));
            drag_dist = Math.sqrt(x_vec + y_vec);
            if (drag_dist > 20) {
                dragging = true;
            }
        }
        if (dragging) {
            drag_x = last_touch.clientX - touch_object.startX;
            drag_y = last_touch.clientY - touch_object.startY;
            touch_object.startX = last_touch.clientX;
            touch_object.startY = last_touch.clientY;
            navbox_object.windowX = navbox_object.windowX + drag_x;
            navbox_object.windowY = navbox_object.windowY + drag_y;
            navbox_move();
        }
    }, false);

    document.onmouseup = function() {
        if (dragging) {
            dragging = false;
            navbox_margin_check();
            navbox_object.windowX = navbox.getBoundingClientRect().left;
            navbox_object.windowY = navbox.getBoundingClientRect().top;
        } else if (mdown) {
            console.log("clicked");
        }
        mdown = false;
    };

    document.addEventListener("touchend", function(e) {
        if (dragging) {
            dragging = false;
            navbox_margin_check();
            navbox_object.windowX = navbox.getBoundingClientRect().left;
            navbox_object.windowY = navbox.getBoundingClientRect().top;
        } else if (mdown) {
            console.log("clicked");
            if (!has_appeared && !dragging) {
                navcon_appear(0);
            } else if (has_appeared && !dragging) {
                navcon_disappear(0);
            }
        }
        mdown = false;
    });

    document.addEventListener("scroll", function(e) {
        window_object.windowX = document.body.getBoundingClientRect().left;
        window_object.windowY = document.body.getBoundingClientRect().top;
        navbox_move();
    });

    window.onresize = function() {
        navbox_move();
        navbox_margin_check();
    };

};

navcon_appear = function(delayms) {
    timeout = setTimeout(function() {
        navph.setAttribute("style", "display:none;");
        navcon.setAttribute("style", "display:grid;");
        has_appeared = true;
        navbox_margin_check();
    }, delayms);
};

navcon_disappear = function(delayms) {
    timeout = setTimeout(function() {
        navcon.setAttribute("style", "display:none;");
        navph.setAttribute("style", "display:grid;");
        navbox = document.querySelector("div.nav-box");
        has_appeared = false;
        navbox_move();
        navbox_margin_check();
    }, delayms);
};

navbox_move = function() {
    navbox.style.left = (navbox_object.windowX - window_object.windowX) + "px";
    navbox.style.top = (navbox_object.windowY - window_object.windowY) + "px";
}

navbox_margin_check = function() {
    if ((navbox.getBoundingClientRect().left + navbox.getBoundingClientRect().width) > (window.innerWidth - 25)) {
        navbox_object.windowX = window.innerWidth - 25 - navbox.getBoundingClientRect().width;
        navbox.style.left = (window.innerWidth - 25 - navbox.getBoundingClientRect().width)+"px";
    }
    if (navbox.getBoundingClientRect().left < 25) {
        navbox.style.left = "25px";
        navbox_object.windowX = 25;
    }
    if ((navbox.getBoundingClientRect().top + navbox.getBoundingClientRect().height) > (window.innerHeight - 25)) {
        navbox_object.windowY = window.innerHeight - 25 - navbox.getBoundingClientRect().height;
        navbox.style.top = (window.innerHeight - 25 - navbox.getBoundingClientRect().height)+"px";
    }
    if (navbox.getBoundingClientRect().top < 25) {
        navbox.style.top = "25px";
        navbox_object.windowY = 25;
    }
};


