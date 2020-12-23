const preloader = document.createElement('div');
preloader.className = 'preloader preloader__visible';
document.body.append(preloader);

function loadData() {
    return new Promise((resolve) => {
        setTimeout(resolve, 1000);
    });
}

loadData()
    .then(() => {
        const preloaderEl = document.querySelector('.preloader');
        preloaderEl.classList.add('preloader__hidden');
        preloaderEl.classList.remove('preloader__visible');
    });
