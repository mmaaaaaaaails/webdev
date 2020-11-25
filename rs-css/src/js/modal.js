const popup = document.createElement('div');
popup.className = 'modal modal__hide';
document.body.append(popup);

const modal = document.querySelector('.modal');

function showModal() {
    const popupContent = document.createElement('div');
    popupContent.className = 'modal__content';
    popup.append(popupContent);

    const popupClose = document.createElement('span');
    popupClose.className = 'modal__close';
    popupClose.innerHTML = '&times;';
    popupContent.append(popupClose);

    const popupInfo = document.createElement('div');
    popupInfo.className = 'info';
    popupContent.append(popupInfo);

    const infoTitle = document.createElement('h2');
    infoTitle.className = 'info__title';
    infoTitle.innerHTML = 'No worries, you have got this!';
    popupInfo.append(infoTitle);

    const infoDescription = document.createElement('p');
    infoDescription.className = 'info__description';
    infoDescription.innerHTML = 'You are about to learn CSS Selectors! Selectors are how you pick which element to apply styles to.';
    popupInfo.append(infoDescription);

    const infoSubTitle = document.createElement('h3');
    infoSubTitle.className = 'info__subtitle';
    infoSubTitle.innerHTML = 'Exhibit 1 - A CSS Rule';
    popupInfo.append(infoSubTitle);

    const infoExample = document.createElement('div');
    infoExample.className = 'info__example';
    infoExample.innerHTML = 'p { margin-bottom: 10px; }';
    popupInfo.append(infoExample);

    const infoDescriptionOne = document.createElement('p');
    infoDescriptionOne.className = 'info__description';
    infoDescriptionOne.innerHTML = 'Here, the "p" is the selector (selects all <р> elements) and applies the margin-bottom style.';
    popupInfo.append(infoDescriptionOne);

    const infoDescriptionTwo = document.createElement('p');
    infoDescriptionTwo.className = 'info__description';
    infoDescriptionTwo.innerHTML = 'To play, type in a CSS selector in the editor below to select the correct items on the table.If you get it right, you will advance to the next level.';
    popupInfo.append(infoDescriptionTwo);

    const infoDescriptionThree = document.createElement('p');
    infoDescriptionThree.className = 'info__description';
    infoDescriptionThree.innerHTML = 'Hover over the items on the table to see their HTML markup.';
    popupInfo.append(infoDescriptionThree);
}

function openModal() {
    const buttonHelp = document.querySelector('.example__help');
    buttonHelp.addEventListener('click', () => {
        modal.classList.add('modal__open');
        modal.classList.remove('modal__hide');
    });
}

function closeModalCross() {
    const modalClose = document.querySelector('.modal__close');
    modalClose.addEventListener('click', () => {
        modal.classList.remove('modal__open');
    });
}

function closeModal() {
    document.addEventListener('click', (event) => {
        if (event.target.closest('.modal')) {
            modal.classList.remove('modal__open');
        }
    });
}

showModal();
openModal();
closeModalCross();
closeModal();
