window.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const id = entry.target.getAttribute('id');
            if (entry.intersectionRatio > 0) {
                document.querySelector(`.cv-nav-item a[href="#${id}"]`).parentElement.classList.add('active');
            } else {
                document.querySelector(`.cv-nav-item a[href="#${id}"]`).parentElement.classList.remove('active');
            }
        });
    });
    document.querySelectorAll('li[id]').forEach((section) => {
        observer.observe(section);
    });
	var coll = document.getElementsByClassName("fa");
	var i;
	for (i = 0; i < coll.length; i++) {
		coll[i].addEventListener("click", function() {
			if (this.className == "fa fa-angle-down") {
				console.log(this.className);
				var j;
				var fas = document.getElementsByClassName("fa");
				for (j = 0; j < fas.length; j++) {
					if (j != i) {
						if (fas[j].className == "fa fa-angle-up") {
							fas[j].parentElement.parentElement.querySelector(".transcript-table").style.display = "none";
							fas[j].className = "fa fa-angle-down";
						}
					}
				}
				this.className = "fa fa-angle-up";
			} else {
				this.className = "fa fa-angle-down";
			}
			var content = this.parentElement.parentElement.querySelector(".transcript-table");
			if (content.style.display === "inline-table") {
				content.style.display = "none";
			} else {
				content.style.display = "inline-table";
				document.querySelector('main').scrollTo(0, document.querySelector('main').scrollHeight);
				this.scrollIntoView();
			}
	  });
	}
});