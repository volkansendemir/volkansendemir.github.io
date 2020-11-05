var h1_flying = false;
var welcome_flying = false;
var description_flying = false;
var tag_flying = false;
var site_flying = false;
var prev_top = 0;
var going_up = false;

var snappedCover = false;
var snappedProjects = false;
var snappedAbout = false;


window.addEventListener('load', function () {


	/*     cover     */
	const main = document.querySelector('main');
	const header = document.querySelector('aside');

	function header_opacity() {
		if (document.querySelector("section.cover").getBoundingClientRect().bottom - header.getBoundingClientRect().height < 0) {
			header.setAttribute("style", "background-color: rgba(0, 0, 0, 0.8);");
		} else {
			header.setAttribute("style", "background-color: rgba(0, 0, 0, 0.9);");
		}
	};

	main.addEventListener("scroll", header_opacity);


	const h1 = document.querySelector('h1');
	const welcome = document.querySelector('.welcome');
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

	function taxi_description() {
		description.setAttribute("class", "description hidden");
		description_flying = false;
	};

	const cover_flys = () => {
		/*     establish direction     */
		if (main.querySelector(".cover").getBoundingClientRect().top < prev_top) {
			going_up = false;
			prev_top = main.querySelector(".cover").getBoundingClientRect().top;
		} else {
			going_up = true;
			prev_top = main.querySelector(".cover").getBoundingClientRect().top;
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

	main.addEventListener("scroll", cover_flys);


	/*     header     */
	const project_header = document.querySelector('.header');

	const header_color = () => {
		if (!going_up && project_header.getBoundingClientRect().top <= header.getBoundingClientRect().height + 0.125) {
			project_header.setAttribute("class", "header black");
		} else if (going_up && project_header.getBoundingClientRect().top > header.getBoundingClientRect().height) {
			project_header.setAttribute("class", "header white");
		}
	}

	main.addEventListener("scroll", header_color);


	/*     about     */
	const tag = document.querySelector('.tag');
	const site = document.querySelector('.site');
	const footer = document.querySelector('footer');

	function land_tag() {
		tag.setAttribute("class", "tag visible");
		tag_flying = false;
	};

	function land_site() {
		site.setAttribute("class", "site visible");
		site_flying = false;
	};

	function taxi_tag() {
		tag.setAttribute("class", "tag hidden");
		tag_flying = false;
	};

	function taxi_site() {
		site.setAttribute("class", "site hidden");
		site_flying = false;
	};

	const about_flys = () => {
		/*     react     */
		if ((tag.className.indexOf("visible") > -1) && tag.getBoundingClientRect().top > (footer.getBoundingClientRect().top - header.getBoundingClientRect().height * 7.5) && !tag_flying && going_up) {
			tag_flying = true;
			tag.removeEventListener("animationend", land_tag, false);
			tag.addEventListener("animationend", taxi_tag, false);
			tag.setAttribute("class", "tag visible flyout");
		} else if ((tag.className.indexOf("hidden") > -1) && tag.getBoundingClientRect().top < (footer.getBoundingClientRect().top - header.getBoundingClientRect().height * 2.5) && !tag_flying && !going_up) {
			tag_flying = true;
			tag.removeEventListener("animationend", taxi_tag, false);
			tag.addEventListener("animationend", land_tag, false);
			tag.setAttribute("class", "tag visible flyin");
		}
		if ((site.className.indexOf("visible") > -1) && site.getBoundingClientRect().top > (footer.getBoundingClientRect().top - header.getBoundingClientRect().height * 7.5) && !site_flying && going_up) {
			site_flying = true;
			site.removeEventListener("animationend", land_site, false);
			site.addEventListener("animationend", taxi_site, false);
			site.setAttribute("class", "site visible flyout");
		} else if ((site.className.indexOf("hidden") > -1) && site.getBoundingClientRect().top < (footer.getBoundingClientRect().top - header.getBoundingClientRect().height * 2.5) && !site_flying && !going_up) {
			site_flying = true;
			site.removeEventListener("animationend", taxi_site, false);
			site.addEventListener("animationend", land_site, false);
			site.setAttribute("class", "site visible flyin");
		}

		/*     reverse     */
		if (going_up && (tag.className.indexOf("flyin") > -1) && tag.getBoundingClientRect().top > (footer.getBoundingClientRect().top - header.getBoundingClientRect().height * 2.5)) {
			tag_flying = true;
			tag.removeEventListener("animationend", land_tag, false);
			tag.addEventListener("animationend", taxi_tag, false);
			tag.setAttribute("class", "tag visible flyout");
		} else if (!going_up && (tag.className.indexOf("flyout") > -1) && tag.getBoundingClientRect().top < (footer.getBoundingClientRect().top - header.getBoundingClientRect().height * 7.5)) {
			tag_flying = true;
			tag.removeEventListener("animationend", taxi_tag, false);
			tag.addEventListener("animationend", land_tag, false);
			tag.setAttribute("class", "tag visible flyin");
		}
		if (going_up && (site.className.indexOf("flyin") > -1) && site.getBoundingClientRect().top > (footer.getBoundingClientRect().top - header.getBoundingClientRect().height * 2.5)) {
			site_flying = true;
			site.removeEventListener("animationend", land_site, false);
			site.addEventListener("animationend", taxi_site, false);
			site.setAttribute("class", "site visible flyout");
		} else if (!going_up && (site.className.indexOf("flyout") > -1) && site.getBoundingClientRect().top < (footer.getBoundingClientRect().top - header.getBoundingClientRect().height * 7.5)) {
			site_flying = true;
			site.removeEventListener("animationend", taxi_site, false);
			site.addEventListener("animationend", land_site, false);
			site.setAttribute("class", "site visible flyin");
		}
	};

	main.addEventListener("scroll", about_flys);

	/*     snap     */

	const cover = document.querySelector('.cover');
	const projects = document.querySelector('.projects');
	const about = document.querySelector('.about');

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

		if (projects.getBoundingClientRect().top < header.getBoundingClientRect().height * 3 && projects.getBoundingClientRect().top > -header.getBoundingClientRect().height * 3 && !snappedProjects) {
			/*main.scrollBy(0, projects.getBoundingClientRect().top);*/
			smoothScroll(main, projects.getBoundingClientRect().top);
			snappedProjects = true;
		} else if (projects.getBoundingClientRect().top > header.getBoundingClientRect().height * 3 || projects.getBoundingClientRect().top < -header.getBoundingClientRect().height * 3) {
			snappedProjects = false;
		}

		if (about.getBoundingClientRect().top < header.getBoundingClientRect().height * 3 && about.getBoundingClientRect().top > -header.getBoundingClientRect().height * 3 && !snappedAbout) {
			/*main.scrollBy(0, about.getBoundingClientRect().top);*/
			smoothScroll(main, about.getBoundingClientRect().top);
			snappedAbout = true;
		} else if (about.getBoundingClientRect().top > header.getBoundingClientRect().height * 3 || about.getBoundingClientRect().top < -header.getBoundingClientRect().height * 3) {
			snappedAbout = false;
		}
	};

	main.addEventListener('scroll', snap);

});
