const title = document.createElement('h1');
title.className = 'title';
title.innerHTML = 'RSS Virtual-keyboard';
document.body.append(title);

const subTitle = document.createElement('h3');
subTitle.className = 'title';
subTitle.innerHTML = 'The keyboard was created in the Windows';
document.body.append(subTitle);

const textArea = document.createElement('textarea');
textArea.className = 'textArea';
document.body.append(textArea);
textArea.focus();

const Keyboard = {
    elements: {
        main: null,
        keysContainer: null,
        keys: []
    },

    eventHandlers: {
        oninput: null,
        onclose: null
    },

    properties: {
        value: '',
        capsLock: false
    },

    init() {

        this.elements.main = document.createElement('div');
        this.elements.keysContainer = document.createElement('div');

        this.elements.main.classList.add('keyboard', 'keyboard--hidden');
        this.elements.keysContainer.classList.add('keyboard__keys');
        this.elements.keysContainer.appendChild(this.createKeys());

        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);

        document.querySelectorAll('.textArea').forEach(element => {
            element.addEventListener('focus', () => {
                this.open(element.value, currentValue => {
                    element.value = currentValue;
                });
            });
        });

    },

    createKeys() {
        const fragment = document.createDocumentFragment();
        const keyLayout = [
            '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'backspace',
            'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p',
            'caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'enter',
            'done', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '?',
            'space'
        ];

        keyLayout.forEach(key => {
            const keyElement = document.createElement('button');
            const insertLineBreak = ['backspace', 'p', 'enter', '?'].indexOf(key) !== -1;

            keyElement.setAttribute('type', 'button');
            keyElement.classList.add('keyboard__key');

            switch (key) {
                case 'backspace':
                    keyElement.classList.add('keyboard__key--wide');

                    keyElement.addEventListener('click', () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this._triggerEvent('oninput');
                    });

                    break;

                case 'caps':
                    keyElement.classList.add('keyboard__key--wide', 'keyboard__key--activatable');

                    keyElement.addEventListener('click', () => {
                        this.toggleCapsLock();
                        keyElement.classList.toggle('keyboard__key--active', this.properties.capsLock);
                    });

                    break;

                case 'enter':
                    keyElement.classList.add('keyboard__key--wide');

                    keyElement.addEventListener('click', () => {
                        this.properties.value += '\n';
                        this.triggerEvent('oninput');
                    });

                    break;

                case 'space':
                    keyElement.classList.add('keyboard__key--extra-wide');

                    keyElement.addEventListener('click', () => {
                        this.properties.value += ' ';
                        this.triggerEvent('oninput');
                    });

                    break;

                case 'done':
                    keyElement.classList.add('keyboard__key--wide', 'keyboard__key--dark');

                    keyElement.addEventListener('click', () => {
                        this.close();
                        this.triggerEvent('onclose');
                    });

                    break;

                default:
                    keyElement.textContent = key.toLowerCase();

                    keyElement.addEventListener('click', () => {
                        this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                        this.triggerEvent('oninput');
                    });

                    break;
            }

            fragment.append(keyElement);

            if (insertLineBreak) {
                fragment.append(document.createElement('br'));
            }
        });

        return fragment;
    },

    triggerEvent() {

    },

    toggleCapsLock() {

    },

    open(initialValue, oninput, onclose) {
    },

    close() {

    }
};

window.addEventListener('DOMContentLoaded', function () {
    Keyboard.init();
});
