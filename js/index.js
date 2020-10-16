var snappedProjects = false;
var snappedAbout = false;
var margin = 25;

window.addEventListener('load', function () {
	const main = document.querySelector('main');
	const projects = document.querySelector('.projects');
	const about = document.querySelector('.about');
	
	const scrollEvent = () => {
		function sleep(ms) {
			return new Promise(resolve => setTimeout(resolve, ms));
		};
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
		if (projects.getBoundingClientRect().top < margin*2 && projects.getBoundingClientRect().top > -margin*3 && !snappedProjects) {
			/*main.scrollBy(0, projects.getBoundingClientRect().top);*/
			smoothScroll(main, projects.getBoundingClientRect().top);
			snappedProjects = true;
		} else if (projects.getBoundingClientRect().top > margin*2 || projects.getBoundingClientRect().top < -margin*3) {
			snappedProjects = false;
		}
		
		if (about.getBoundingClientRect().top < margin*3 && about.getBoundingClientRect().top > -margin*3 && !snappedAbout) {
			/*main.scrollBy(0, about.getBoundingClientRect().top);*/
			smoothScroll(main, about.getBoundingClientRect().top);
			snappedAbout = true;
		} else if (about.getBoundingClientRect().top > margin*3 || about.getBoundingClientRect().top < -margin*3) {
			snappedAbout = false;
		}
	}
	
	main.addEventListener('scroll', scrollEvent);
	
	var stage = document.querySelector(".project-visual");
    var fadeComplete = function(e) {
		stage.appendChild(arr[0]);
	};
    var arr = stage.getElementsByTagName("a");
    for(var i=0; i < arr.length; i++) {
		arr[i].addEventListener("animationend", fadeComplete, false);
	}
	
	
});
