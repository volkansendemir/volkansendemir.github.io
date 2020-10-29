var h1_flying = false;
var welcome_flying = false;
var summary_flying = false;
var description_flying = false;
var tag_flying = false;
var site_flying = false;
var prev_top = 0;
var going_up = false;

var snappedCover = true;
var snappedExperiences = false;
var snappedAdditional = false;
var snappedTranscript = false;

var edu_flying = [];
var edu_fb = [];
var edu_ft = [];

var we_flying = [];
var we_fb = [];
var we_ft = [];

var addi_flying = [];
var addi_fb = [];
var addi_ft = [];

window.addEventListener('load', function () {	
	
	prev_top = document.querySelector("main").scrollTop;
	
	
	/*     cover     */
	const main = document.querySelector('main');
	const header = document.querySelector('aside');
	const footer = document.querySelector('footer');
	
	function header_opacity() {
		if (document.querySelector("section.cover").getBoundingClientRect().bottom - header.getBoundingClientRect().height < 0) {
			header.setAttribute("style", "background-color: rgba(0, 0, 0, 0.8);");
		} else {
			header.setAttribute("style", "background-color: rgba(0, 0, 0, 0.9);");
		}
	};
	
	main.addEventListener("scroll", header_opacity);
	
	
	const cover = document.querySelector('.cover');
	const h1 = document.querySelector('h1');
	const welcome = document.querySelector('.welcome');
	const summary = document.querySelector('.summary');
	const description = document.querySelector('.description');
	
	function sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	};
	
	function land_h1() {
		h1.setAttribute("class", "visible");
		h1_flying = false;
	};
	
	function land_welcome() {
		welcome.setAttribute("class", "welcome visible");
		welcome_flying = false;
	};
	
	function land_summary() {
		summary.setAttribute("class", "summary visible");
		summary_flying = false;
	};
	
	function land_description() {
		description.setAttribute("class", "description visible");
		description_flying = false;
	};
	
	async function initial_fly() {
		await sleep(50);
		h1.addEventListener("animationend", land_h1);
		h1.setAttribute("class", "visible flyin");
		await sleep(250);
		welcome.addEventListener("animationend", land_welcome);
		welcome.setAttribute("class", "welcome visible flyin");
		await sleep(250);
		summary.addEventListener("animationend", land_summary);
		summary.setAttribute("class", "summary visible flyin");
		await sleep(250);
		description.addEventListener("animationend", land_description);
		description.setAttribute("class", "description visible flyin");
	};
	
	initial_fly();
	
	
	function taxi_h1() {
		h1.setAttribute("class", "hidden");
		h1_flying = false;
	};
	
	function taxi_welcome() {
		welcome.setAttribute("class", "welcome hidden");
		welcome_flying = false;
	};
	
	function taxi_summary() {
		summary.setAttribute("class", "summary hidden");
		summary_flying = false;
	};
	
	function taxi_description() {
		description.setAttribute("class", "description hidden");
		description_flying = false;
	};
	
	const cover_flys = () => {
		/*     establish direction     */
		if (main.scrollTop >= prev_top) {
			going_up = false;
			prev_top = main.scrollTop; 
		} else {
			going_up = true;
			prev_top = main.scrollTop;
		}
		
		/*     react     */
		if ((h1.className.indexOf("visible") > -1) && h1.getBoundingClientRect().top < (header.getBoundingClientRect().height * 2) && !h1_flying && !going_up) {
			h1_flying = true;
			h1.removeEventListener("animationend", land_h1, false);
			h1.addEventListener("animationend", taxi_h1, false);
			h1.setAttribute("class", "visible flyout");
		} else if ((h1.className.indexOf("hidden") > -1) && h1.getBoundingClientRect().top > (header.getBoundingClientRect().height * 2) && !h1_flying && going_up) {
			h1_flying = true;
			h1.removeEventListener("animationend", taxi_h1, false);
			h1.addEventListener("animationend", land_h1, false);
			h1.setAttribute("class", "visible flyin");
		}
		if ((welcome.className.indexOf("visible") > -1) && welcome.getBoundingClientRect().top < (header.getBoundingClientRect().height * 2.25) && !welcome_flying && !going_up) {
			welcome_flying = true;
			welcome.removeEventListener("animationend", land_welcome, false);
			welcome.addEventListener("animationend", taxi_welcome, false);
			welcome.setAttribute("class", "welcome visible flyout");
		} else if ((welcome.className.indexOf("hidden") > -1) && welcome.getBoundingClientRect().top > (header.getBoundingClientRect().height * 2.25) && !welcome_flying && going_up) {
			welcome_flying = true;
			welcome.removeEventListener("animationend", taxi_welcome, false);
			welcome.addEventListener("animationend", land_welcome, false);
			welcome.setAttribute("class", "welcome visible flyin");
		}
		if ((summary.className.indexOf("visible") > -1) && summary.getBoundingClientRect().top < (header.getBoundingClientRect().height * 2.25) && !summary_flying && !going_up) {
			summary_flying = true;
			summary.removeEventListener("animationend", land_summary, false);
			summary.addEventListener("animationend", taxi_summary, false);
			summary.setAttribute("class", "summary visible flyout");
		} else if ((summary.className.indexOf("hidden") > -1) && summary.getBoundingClientRect().top > (header.getBoundingClientRect().height * 2.25) && !summary_flying && going_up) {
			summary_flying = true;
			summary.removeEventListener("animationend", taxi_summary, false);
			summary.addEventListener("animationend", land_summary, false);
			summary.setAttribute("class", "summary visible flyin");
		}
		if ((description.className.indexOf("visible") > -1) && description.getBoundingClientRect().top < (header.getBoundingClientRect().height * 2.5) && !description_flying && !going_up) {
			description_flying = true;
			description.removeEventListener("animationend", land_description, false);
			description.addEventListener("animationend", taxi_description, false);
			description.setAttribute("class", "description visible flyout");
		} else if ((description.className.indexOf("hidden") > -1) && description.getBoundingClientRect().top > (header.getBoundingClientRect().height * 2.5) && !description_flying && going_up) {
			description_flying = true;
			description.removeEventListener("animationend", taxi_description, false);
			description.addEventListener("animationend", land_description, false);
			description.setAttribute("class", "description visible flyin");
		}
		
		/*     reverse     */
		if (going_up && (h1.className.indexOf("flyout") > -1) && h1.getBoundingClientRect().top < (header.getBoundingClientRect().height * 3)) {
			h1_flying = true;
			h1.removeEventListener("animationend", taxi_h1, false);
			h1.addEventListener("animationend", land_h1, false);
			h1.setAttribute("class", "visible flyin");
		} else if (!going_up && (h1.className.indexOf("flyin") > -1) && h1.getBoundingClientRect().top > (header.getBoundingClientRect().height * 1.5)) {
			h1_flying = true;
			h1.removeEventListener("animationend", land_h1, false);
			h1.addEventListener("animationend", taxi_h1, false);
			h1.setAttribute("class", "visible flyout");
		}
		if (going_up && (welcome.className.indexOf("flyout") > -1) && welcome.getBoundingClientRect().top < (header.getBoundingClientRect().height * 4)) {
			welcome_flying = true;
			welcome.removeEventListener("animationend", taxi_welcome, false);
			welcome.addEventListener("animationend", land_welcome, false);
			welcome.setAttribute("class", "welcome visible flyin");
		} else if (!going_up && (welcome.className.indexOf("flyin") > -1) && welcome.getBoundingClientRect().top > (header.getBoundingClientRect().height * 2)) {
			welcome_flying = true;
			welcome.removeEventListener("animationend", land_welcome, false);
			welcome.addEventListener("animationend", taxi_welcome, false);
			welcome.setAttribute("class", "welcome visible flyout");
		}
		if (going_up && (summary.className.indexOf("flyout") > -1) && summary.getBoundingClientRect().top < (header.getBoundingClientRect().height * 4)) {
			welcome_flying = true;
			summary.removeEventListener("animationend", taxi_summary, false);
			summary.addEventListener("animationend", land_summary, false);
			summary.setAttribute("class", "summary visible flyin");
		} else if (!going_up && (summary.className.indexOf("flyin") > -1) && summary.getBoundingClientRect().top > (header.getBoundingClientRect().height * 2)) {
			summary_flying = true;
			summary.removeEventListener("animationend", land_summary, false);
			summary.addEventListener("animationend", taxi_summary, false);
			summary.setAttribute("class", "summary visible flyout");
		}
		if (going_up && (description.className.indexOf("flyout") > -1) && description.getBoundingClientRect().top < (header.getBoundingClientRect().height * 5)) {
			description_flying = true;
			description.removeEventListener("animationend", taxi_description, false);
			description.addEventListener("animationend", land_description, false);
			description.setAttribute("class", "description visible flyin");
		} else if (!going_up && (description.className.indexOf("flyin") > -1) && description.getBoundingClientRect().top > (header.getBoundingClientRect().height * 2)) {
			description_flying = true;
			description.removeEventListener("animationend", land_description, false);
			description.addEventListener("animationend", taxi_description, false);
			description.setAttribute("class", "description visible flyout");
		}
	};
	
	const cover_mobile_flys = () => {
		/*     establish direction     */
		if (main.scrollTop >= prev_top) {
			going_up = false;
			prev_top = main.scrollTop; 
		} else {
			going_up = true;
			prev_top = main.scrollTop;
		}
		
		/*     react     */
		if ((h1.className.indexOf("visible") > -1) && h1.getBoundingClientRect().top < (header.getBoundingClientRect().height * 0.75) && !h1_flying && !going_up) {
			h1_flying = true;
			h1.removeEventListener("animationend", land_h1, false);
			h1.addEventListener("animationend", taxi_h1, false);
			h1.setAttribute("class", "visible flyout");
		} else if ((h1.className.indexOf("hidden") > -1) && h1.getBoundingClientRect().top > (header.getBoundingClientRect().height * 1.5) && !h1_flying && going_up) {
			h1_flying = true;
			h1.removeEventListener("animationend", taxi_h1, false);
			h1.addEventListener("animationend", land_h1, false);
			h1.setAttribute("class", "visible flyin");
		}
		if ((welcome.className.indexOf("visible") > -1) && welcome.getBoundingClientRect().top < (header.getBoundingClientRect().height * 0.75) && !welcome_flying && !going_up) {
			welcome_flying = true;
			welcome.removeEventListener("animationend", land_welcome, false);
			welcome.addEventListener("animationend", taxi_welcome, false);
			welcome.setAttribute("class", "welcome visible flyout");
		} else if ((welcome.className.indexOf("hidden") > -1) && welcome.getBoundingClientRect().top > (header.getBoundingClientRect().height * 1.5) && !welcome_flying && going_up) {
			welcome_flying = true;
			welcome.removeEventListener("animationend", taxi_welcome, false);
			welcome.addEventListener("animationend", land_welcome, false);
			welcome.setAttribute("class", "welcome visible flyin");
		}
		if ((summary.className.indexOf("visible") > -1) && summary.getBoundingClientRect().top < (header.getBoundingClientRect().height * 0.75) && !summary_flying && !going_up) {
			summary_flying = true;
			summary.removeEventListener("animationend", land_summary, false);
			summary.addEventListener("animationend", taxi_summary, false);
			summary.setAttribute("class", "summary visible flyout");
		} else if ((summary.className.indexOf("hidden") > -1) && summary.getBoundingClientRect().top > (header.getBoundingClientRect().height * 1.5) && !summary_flying && going_up) {
			summary_flying = true;
			summary.removeEventListener("animationend", taxi_summary, false);
			summary.addEventListener("animationend", land_summary, false);
			summary.setAttribute("class", "summary visible flyin");
		}
		if ((description.className.indexOf("visible") > -1) && description.getBoundingClientRect().top < (header.getBoundingClientRect().height * 0.75) && !description_flying && !going_up) {
			description_flying = true;
			description.removeEventListener("animationend", land_description, false);
			description.addEventListener("animationend", taxi_description, false);
			description.setAttribute("class", "description visible flyout");
		} else if ((description.className.indexOf("hidden") > -1) && description.getBoundingClientRect().top > (header.getBoundingClientRect().height * 1.5) && !description_flying && going_up) {
			description_flying = true;
			description.removeEventListener("animationend", taxi_description, false);
			description.addEventListener("animationend", land_description, false);
			description.setAttribute("class", "description visible flyin");
		}
		
		/*     reverse     */
		if (going_up && (h1.className.indexOf("flyout") > -1) && h1.getBoundingClientRect().top < (header.getBoundingClientRect().height * 0.75)) {
			h1_flying = true;
			h1.removeEventListener("animationend", taxi_h1, false);
			h1.addEventListener("animationend", land_h1, false);
			h1.setAttribute("class", "visible flyin");
		} else if (!going_up && (h1.className.indexOf("flyin") > -1) && h1.getBoundingClientRect().top > (header.getBoundingClientRect().height * 1.25)) {
			h1_flying = true;
			h1.removeEventListener("animationend", land_h1, false);
			h1.addEventListener("animationend", taxi_h1, false);
			h1.setAttribute("class", "visible flyout");
		}
		if (going_up && (welcome.className.indexOf("flyout") > -1) && welcome.getBoundingClientRect().top < (header.getBoundingClientRect().height * 0.75)) {
			welcome_flying = true;
			welcome.removeEventListener("animationend", taxi_welcome, false);
			welcome.addEventListener("animationend", land_welcome, false);
			welcome.setAttribute("class", "welcome visible flyin");
		} else if (!going_up && (welcome.className.indexOf("flyin") > -1) && welcome.getBoundingClientRect().top > (header.getBoundingClientRect().height * 1.25)) {
			welcome_flying = true;
			welcome.removeEventListener("animationend", land_welcome, false);
			welcome.addEventListener("animationend", taxi_welcome, false);
			welcome.setAttribute("class", "welcome visible flyout");
		}
		if (going_up && (summary.className.indexOf("flyout") > -1) && summary.getBoundingClientRect().top < (header.getBoundingClientRect().height * 0.75)) {
			welcome_flying = true;
			summary.removeEventListener("animationend", taxi_summary, false);
			summary.addEventListener("animationend", land_summary, false);
			summary.setAttribute("class", "summary visible flyin");
		} else if (!going_up && (summary.className.indexOf("flyin") > -1) && summary.getBoundingClientRect().top > (header.getBoundingClientRect().height * 1.25)) {
			summary_flying = true;
			summary.removeEventListener("animationend", land_summary, false);
			summary.addEventListener("animationend", taxi_summary, false);
			summary.setAttribute("class", "summary visible flyout");
		}
		if (going_up && (description.className.indexOf("flyout") > -1) && description.getBoundingClientRect().top < (header.getBoundingClientRect().height * 0.75)) {
			description_flying = true;
			description.removeEventListener("animationend", taxi_description, false);
			description.addEventListener("animationend", land_description, false);
			description.setAttribute("class", "description visible flyin");
		} else if (!going_up && (description.className.indexOf("flyin") > -1) && description.getBoundingClientRect().top > (header.getBoundingClientRect().height * 1.25)) {
			description_flying = true;
			description.removeEventListener("animationend", land_description, false);
			description.addEventListener("animationend", taxi_description, false);
			description.setAttribute("class", "description visible flyout");
		}
		if (cover.getBoundingClientRect().top > 30) {
			console.log(cover.getBoundingClientRect().top);
			main.scrollTo(0, 0);
			h1.removeEventListener("animationend", taxi_h1, false);
			h1.removeEventListener("animationend", land_h1, false);
			h1.setAttribute("class", "visible");
			welcome.removeEventListener("animationend", taxi_h1, false);
			welcome.removeEventListener("animationend", land_h1, false);
			welcome.setAttribute("class", "welcome visible");
			summary.removeEventListener("animationend", taxi_h1, false);
			summary.removeEventListener("animationend", land_h1, false);
			summary.setAttribute("class", "summary visible");
			description.removeEventListener("animationend", taxi_h1, false);
			description.removeEventListener("animationend", land_h1, false);
			description.setAttribute("class", "description visible");
			h1_flying = false;
			welcome_flying = false;
			summary_flying = false;
			description_flying = false;
		}
	};
	
	if (window.matchMedia("(max-width: 700px)").matches) {
		main.addEventListener("scroll", cover_mobile_flys);
		
	} else {
		main.addEventListener("scroll", cover_flys);
	}
	
	/*     header     */
	const education_header = document.querySelector('.education');
	const work_header = document.querySelector('.work');
	const addition_header = document.querySelector('.addition');
	const trans_header = document.querySelector('.trans');
	
	const header_color = () => {
		if (!going_up && education_header.getBoundingClientRect().top < header.getBoundingClientRect().height * 0.965) {
			education_header.setAttribute("class", "education white");
		} else if (education_header.getBoundingClientRect().top <= header.getBoundingClientRect().height) {
			education_header.setAttribute("class", "education black");
		} else if (going_up && education_header.getBoundingClientRect().top > header.getBoundingClientRect().height) {
			education_header.setAttribute("class", "education white");
		}
		if (!going_up && work_header.getBoundingClientRect().top < header.getBoundingClientRect().height * 0.965) {
			work_header.setAttribute("class", "work white");
		} else if (work_header.getBoundingClientRect().top <= header.getBoundingClientRect().height) {
			work_header.setAttribute("class", "work black");
		} else if (going_up && work_header.getBoundingClientRect().top > header.getBoundingClientRect().height) {
			work_header.setAttribute("class", "work white");
		}
		if (!going_up && addition_header.getBoundingClientRect().top < header.getBoundingClientRect().height * 0.965) {
			addition_header.setAttribute("class", "addition white");
		} else if (addition_header.getBoundingClientRect().top <= header.getBoundingClientRect().height) {
			addition_header.setAttribute("class", "addition black");
		} else if (going_up && addition_header.getBoundingClientRect().top > header.getBoundingClientRect().height) {
			addition_header.setAttribute("class", "addition white");
		}
		if (!going_up && trans_header.getBoundingClientRect().top < header.getBoundingClientRect().height * 0.965) {
			trans_header.setAttribute("class", "trans white");
		} else if (trans_header.getBoundingClientRect().top <= header.getBoundingClientRect().height) {
			trans_header.setAttribute("class", "trans black");
		} else if (going_up && trans_header.getBoundingClientRect().top > header.getBoundingClientRect().height) {
			trans_header.setAttribute("class", "trans white");
		}
	}
	
	main.addEventListener("scroll", header_color);
	
	
	
	
	
	const edu = document.querySelectorAll('.education-item');
	const we = document.querySelectorAll('.work-item');
	const addi = document.querySelectorAll('.addition-item');
	
	function land_edu() {
		this.setAttribute("class", "education-item visible");
		for (var i = 0; i < edu.length; i++) {
			if (edu[i] == this) {
				edu_flying[i] = false;
			}
		}
	};
	
	function land_we() {
		this.setAttribute("class", "work-item visible");
		for (var i = 0; i < we.length; i++) {
			if (we[i] == this) {
				we_flying[i] = false;
			}
		}
	};
	
	function land_addi() {
		this.setAttribute("class", "addition-item visible");
		for (var i = 0; i < addi.length; i++) {
			if (addi[i] == this) {
				addi_flying[i] = false;
			}
		}
	};
	
	function taxi_edu() {
		this.setAttribute("class", "education-item hidden");
		for (var i = 0; i < edu.length; i++) {
			if (edu[i] == this) {
				edu_flying[i] = false;
				break;
			}
		}
	};
	
	function taxi_we() {
		this.setAttribute("class", "work-item hidden");
		for (var i = 0; i < we.length; i++) {
			if (we[i] == this) {
				we_flying[i] = false;
				break;
			}
		}
	};
	
	function taxi_addi() {
		this.setAttribute("class", "addition-item hidden");
		for (var i = 0; i < addi.length; i++) {
			if (addi[i] == this) {
				addi_flying[i] = false;
				break;
			}
		}
	};
	
	
	for (var i = 0; i < edu.length; i++) {
	  edu_flying.push(false);
	  edu_fb.push(false);
	  edu_ft.push(true);
	}
	
	for (var i = 0; i < we.length; i++) {
	  we_flying.push(false);
	  we_fb.push(false);
	  we_ft.push(true);
	}
	
	for (var i = 0; i < addi.length; i++) {
	  addi_flying.push(false);
	  addi_fb.push(false);
	  addi_ft.push(true);
	}
		
	const exp_flys = () => {
		
		/*     react     */
		for (var i = 0; i < edu.length; i++) {
			if ((edu[i].className.indexOf("hidden") > -1) && edu[i].getBoundingClientRect().top < (footer.getBoundingClientRect().top - (footer.getBoundingClientRect().height * 3)) && !edu_flying[i] && !going_up && !edu_fb[i]) {
				edu_flying[i] = true;
				edu_fb[i] = true;
				edu[i].removeEventListener("animationend", taxi_edu, false);
				edu[i].addEventListener("animationend", land_edu, false);
				edu[i].setAttribute("class", "education-item visible floatinbot");
			} else if ((edu[i].className.indexOf("visible") > -1) && edu[i].getBoundingClientRect().top < header.getBoundingClientRect().height * 1.5 && !edu_flying[i] && !going_up && edu_ft[i]) {
				edu_flying[i] = true;
				edu_ft[i] = false;
				edu[i].removeEventListener("animationend", land_edu, false);
				edu[i].addEventListener("animationend", taxi_edu, false);
				edu[i].setAttribute("class", "education-item visible floatouttop");
			} else if ((edu[i].className.indexOf("hidden") > -1) && edu[i].getBoundingClientRect().top > header.getBoundingClientRect().height * 1.5 && !edu_flying[i] && going_up && !edu_ft[i]) {
				edu_flying[i] = true;
				edu_ft[i] = true;
				edu[i].removeEventListener("animationend", taxi_edu, false);
				edu[i].addEventListener("animationend", land_edu, false);
				edu[i].setAttribute("class", "education-item visible floatintop");
			} else if ((edu[i].className.indexOf("visible") > -1) && edu[i].getBoundingClientRect().top > (footer.getBoundingClientRect().top - (footer.getBoundingClientRect().height * 3)) && !edu_flying[i] && going_up && edu_fb[i]) {
				edu_flying[i] = true;
				edu_fb[i] = false;
				edu[i].removeEventListener("animationend", land_edu, false);
				edu[i].addEventListener("animationend", taxi_edu, false);
				edu[i].setAttribute("class", "education-item visible floatoutbot");
			}
		}
		
		for (var i = 0; i < we.length; i++) {
			if ((we[i].className.indexOf("hidden") > -1) && we[i].getBoundingClientRect().top < (footer.getBoundingClientRect().top - (footer.getBoundingClientRect().height * 3)) && !we_flying[i] && !going_up && !we_fb[i]) {
				we_flying[i] = true;
				we_fb[i] = true;
				we[i].removeEventListener("animationend", taxi_we, false);
				we[i].addEventListener("animationend", land_we, false);
				we[i].setAttribute("class", "work-item visible floatinbot");
			} else if ((we[i].className.indexOf("visible") > -1) && we[i].getBoundingClientRect().top < header.getBoundingClientRect().height * 1.5 && !we_flying[i] && !going_up && we_ft[i]) {
				we_flying[i] = true;
				we_ft[i] = false;
				we[i].removeEventListener("animationend", land_we, false);
				we[i].addEventListener("animationend", taxi_we, false);
				we[i].setAttribute("class", "work-item visible floatouttop");
			} else if ((we[i].className.indexOf("hidden") > -1) && we[i].getBoundingClientRect().top > ((header.getBoundingClientRect().height * 1.5) - (we[i].getBoundingClientRect().height / 2)) && !we_flying[i] && going_up && !we_ft[i]) {
				we_flying[i] = true;
				we_ft[i] = true;
				we[i].removeEventListener("animationend", taxi_we, false);
				we[i].addEventListener("animationend", land_we, false);
				we[i].setAttribute("class", "work-item visible floatintop");
			} else if ((we[i].className.indexOf("visible") > -1) && we[i].getBoundingClientRect().top > (footer.getBoundingClientRect().top - (footer.getBoundingClientRect().height * 3)) && !we_flying[i] && going_up && we_fb[i]) {
				we_flying[i] = true;
				we_fb[i] = false;
				we[i].removeEventListener("animationend", land_we, false);
				we[i].addEventListener("animationend", taxi_we, false);
				we[i].setAttribute("class", "work-item visible floatoutbot");
			}
		}
		
		for (var i = 0; i < addi.length; i++) {
			if ((addi[i].className.indexOf("hidden") > -1) && addi[i].getBoundingClientRect().top < (footer.getBoundingClientRect().top - (footer.getBoundingClientRect().height * 3)) && !addi_flying[i] && !going_up && !addi_fb[i]) {
				addi_flying[i] = true;
				addi_fb[i] = true;
				addi[i].removeEventListener("animationend", taxi_addi, false);
				addi[i].addEventListener("animationend", land_addi, false);
				addi[i].setAttribute("class", "addition-item visible floatinbot");
			} else if ((addi[i].className.indexOf("visible") > -1) && addi[i].getBoundingClientRect().top < header.getBoundingClientRect().height * 1.5 && !addi_flying[i] && !going_up && addi_ft[i]) {
				addi_flying[i] = true;
				addi_ft[i] = false;
				addi[i].removeEventListener("animationend", land_addi, false);
				addi[i].addEventListener("animationend", taxi_addi, false);
				addi[i].setAttribute("class", "addition-item visible floatouttop");
			} else if ((addi[i].className.indexOf("hidden") > -1) && addi[i].getBoundingClientRect().top > ((header.getBoundingClientRect().height * 1.5) - (addi[i].getBoundingClientRect().height / 2)) && !addi_flying[i] && going_up && !addi_ft[i]) {
				addi_flying[i] = true;
				addi_ft[i] = true;
				addi[i].removeEventListener("animationend", taxi_addi, false);
				addi[i].addEventListener("animationend", land_addi, false);
				addi[i].setAttribute("class", "addition-item visible floatintop");
			} else if ((addi[i].className.indexOf("visible") > -1) && addi[i].getBoundingClientRect().top > (footer.getBoundingClientRect().top - (footer.getBoundingClientRect().height * 3)) && !addi_flying[i] && going_up && addi_fb[i]) {
				addi_flying[i] = true;
				addi_fb[i] = false;
				addi[i].removeEventListener("animationend", land_addi, false);
				addi[i].addEventListener("animationend", taxi_addi, false);
				addi[i].setAttribute("class", "addition-item visible floatoutbot");
			}
		}
		
		
		/*     reverse     */
		
	};
	
	main.addEventListener("scroll", exp_flys);
	
	
	
	
	/*     snap     */
	
	const experiences = document.querySelector('.experiences');
	const additional = document.querySelector('.additional');
	const transcript = document.querySelector('.transcript');
	
	const snap = () => {
		async function smoothScroll(main, scrollBy) {
			var i, scrollLim;
			var dir = 1;
			scrollLim = scrollBy
			if (scrollBy < 0) {
				scrollBy = -scrollBy;
				dir = -1;
			}
			for (i=0; i<scrollBy-1; i++) {
				await sleep(1);
				main.scrollBy(0, dir);
			}
			await sleep(1);
			main.scrollBy(0, dir*(scrollBy-i));
		};
		
		if (cover.getBoundingClientRect().top < header.getBoundingClientRect().height * 3 && cover.getBoundingClientRect().top > -header.getBoundingClientRect().height * 3 && !snappedCover) {
			/*main.scrollBy(0, projects.getBoundingClientRect().top);*/
			smoothScroll(main, cover.getBoundingClientRect().top - header.getBoundingClientRect().height);
			snappedCover = true;
		} else if (cover.getBoundingClientRect().top > header.getBoundingClientRect().height * 3 || cover.getBoundingClientRect().top < -header.getBoundingClientRect().height * 3) {
			snappedCover = false;
		}
		
		if (experiences.getBoundingClientRect().top < header.getBoundingClientRect().height * 3 && experiences.getBoundingClientRect().top > -header.getBoundingClientRect().height * 3 && !snappedExperiences) {
			/*main.scrollBy(0, projects.getBoundingClientRect().top);*/
			smoothScroll(main, experiences.getBoundingClientRect().top);
			snappedExperiences = true;
		} else if (experiences.getBoundingClientRect().top > header.getBoundingClientRect().height * 3 || experiences.getBoundingClientRect().top < -header.getBoundingClientRect().height * 3) {
			snappedExperiences = false;
		}
		
		if (additional.getBoundingClientRect().top < header.getBoundingClientRect().height * 3 && additional.getBoundingClientRect().top > -header.getBoundingClientRect().height * 3 && !snappedAdditional) {
			/*main.scrollBy(0, projects.getBoundingClientRect().top);*/
			smoothScroll(main, additional.getBoundingClientRect().top);
			snappedAdditional = true;
		} else if (additional.getBoundingClientRect().top > header.getBoundingClientRect().height * 3 || additional.getBoundingClientRect().top < -header.getBoundingClientRect().height * 3) {
			snappedAdditional = false;
		}
		
		if (transcript.getBoundingClientRect().top < header.getBoundingClientRect().height * 3 && transcript.getBoundingClientRect().top > -header.getBoundingClientRect().height * 3 && !snappedTranscript) {
			/*main.scrollBy(0, about.getBoundingClientRect().top);*/
			smoothScroll(main, transcript.getBoundingClientRect().top);
			snappedTranscript = true;
		} else if (transcript.getBoundingClientRect().top > header.getBoundingClientRect().height * 3 || transcript.getBoundingClientRect().top < -header.getBoundingClientRect().height * 3) {
			snappedTranscript = false;
		}
	};
	
	main.addEventListener('scroll', snap);
	
	
	
	/*     expand-collapse     */
	
	var buttons = document.getElementsByClassName("fa");
	var i;
	for (i=0; i < buttons.length; i++) {
		buttons[i].addEventListener("click", function() {
			if (this.className == "fa fa-angle-down") {
				var fas = document.getElementsByClassName("fa");
				for (var j = 0; j < fas.length; j++) {
					if (fas[j] != this) {
						if (fas[j].className == "fa fa-angle-up") {
							fas[j].parentElement.parentElement.querySelector(".transcript-table").className = "transcript-table nodisp";
							fas[j].className = "fa fa-angle-down";
						}
					}
				}
				this.className = "fa fa-angle-up";
			} else {
				this.className = "fa fa-angle-down";
			}
			var table = this.parentElement.parentElement.querySelector(".transcript-table");
			if (table.className.indexOf("nodisp") > -1) {
				table.className = "transcript-table";
				document.querySelector("main").scrollBy(0, document.querySelector("main").getBoundingClientRect().height);
				document.querySelector("main").scrollIntoView(this);
				while (this.getBoundingClientRect().top < document.querySelector("aside").getBoundingClientRect().height) {
					document.querySelector("main").scrollBy(0, -document.querySelector("aside").getBoundingClientRect().height);
				}
				document.querySelector("main").scrollBy(0, -document.querySelector(".trans").getBoundingClientRect().height);
				while (this.parentElement.parentElement.getBoundingClientRect().bottom > document.querySelector("footer").getBoundingClientRect().top) {
					document.querySelector("main").scrollBy(0, document.querySelector("footer").getBoundingClientRect().height);
				}
			} else {
				table.className = "transcript-table nodisp";
			}
	  });
	}
});
