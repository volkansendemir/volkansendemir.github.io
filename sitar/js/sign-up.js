window.addEventListener('load', function () {
    const thisForm = document.getElementById('sign-up');
    thisForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        const formData = new FormData(thisForm).entries()
        const response = await fetch("https://api.volkansendemir.com/sitar/login/sign-up", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'x-api-key': 'sitar-test-input-api-key' },
            body: JSON.stringify(Object.fromEntries(formData))
        });

        const result = await response.json();
        window.localStorage.setItem('username', JSON.stringify(response["user"]["username"]));
        window.localStorage.setItem('user-key', JSON.stringify(response["user"]["user-key"]));
        window.localStorage.setItem('user-details', JSON.stringify(response["user"]["details"]));
        window.localStorage.setItem('projects', JSON.stringify(response["user"]["projects"]));
    });
});
