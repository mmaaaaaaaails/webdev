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
textArea.placeholder = 'Click here.';
document.body.append(textArea);

const textareaInput = document.querySelector('textarea');

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
        shift: false,
        capsLock: false,
        lang: 'en',
    },

    init() {
        this.elements.main = document.createElement('div');
        this.elements.keysContainer = document.createElement('div');

        this.elements.main.classList.add('keyboard', 'keyboard--hidden');
        this.elements.keysContainer.classList.add('keyboard__keys');
        this.elements.keysContainer.append(this.createKeys());

        this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');

        this.elements.main.append(this.elements.keysContainer);
        document.body.append(this.elements.main);

        document.querySelectorAll('.textArea').forEach(element => {
            element.addEventListener('focus', () => {
                this.open(textArea.value, currentValue => {
                    textArea.value = currentValue;
                    textArea.focus();
                });
            });
        });
    },

    createKeys() {
        const fragment = document.createDocumentFragment();
        const keyEn = [
            '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '=', 'backspace',
            'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', 'done',
            'caps Lock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'enter',
            'shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '↑',
            'en','space', '←', '↓', '→',
        ];

        const KeyEnShift = [
            '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '+', 'backspace',
            'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '{', '}','done',
            'caps Lock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ':', "'", 'enter',
            'shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '<', '>', '?', '↑',
            'en','space', '←', '↓', '→',
        ];

        const keyRu = [
            '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '=', 'backspace',
            'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ','done',
            'caps Lock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'enter',
            'shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '↑',
            'ru','space', '←', '↓', '→',
        ];
        const keyRuShift = [
            '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '+', 'backspace',
            'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ','ru','done',
            'caps Lock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'enter',
            'shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', ',', '↑',
            'ru','space', '←', '↓', '→',
        ];

        let layout = [];
        if (this.properties.lang === 'en') {
            if (this.properties.shift) {
                layout = KeyEnShift;
            } else {
                layout = keyEn;
            }
        } else {
            if (this.properties.shift) {
                layout = keyRuShift;
            } else {
                layout = keyRu;
            }
        }


        layout.forEach(key => {
            const keyElement = document.createElement('button');
            const insertLineBreak = ['backspace','done', 'enter', 'done'].indexOf(key) !== -1;

            keyElement.setAttribute('id', 'button');
            keyElement.classList.add('keyboard__key');

            switch (key) {
                case 'backspace':
                    keyElement.classList.add('keyboard__key--wide');
                    keyElement.innerHTML = '⇐';

                    keyElement.addEventListener('click', () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this.triggerEvent('oninput');
                        textareaInput.focus();
                    });

                    break;

                case 'caps Lock':
                    keyElement.classList.add('keyboard__key--wide', 'keyboard__key--activatable');
                    keyElement.innerHTML = '▲';


                    keyElement.addEventListener('click', () => {
                        this.toggleCapsLock();
                        keyElement.classList.toggle('keyboard__key--active', this.properties.capsLock);
                        textareaInput.focus();
                    });

                    break;

                case 'shift':
                    if (this.properties.shift) {
                        keyElement.classList.add('keyboard__key--wide', 'keyboard__key--activatable', 'keyboard__key--shift');
                    } else {
                        keyElement.classList.add('keyboard__key--wide', 'keyboard__key--activatable');
                    }
                    keyElement.innerHTML = '⇑';

                    keyElement.addEventListener('click', () => {
                        this.toggleShift();
                        keyElement.classList.toggle('keyboard__key--shift', this.properties.shift);
                        textareaInput.focus();
                    });

                    break;

                case 'enter': {
                    keyElement.textContent = key.toLowerCase();
                    keyElement.classList.add('keyboard__key--wide');
                    keyElement.innerHTML = '↵';

                    keyElement.addEventListener('click', () => {
                        this.properties.value += '\n';
                        this.triggerEvent('oninput');
                        textareaInput.focus();
                    });
                }

                    break;

                case '←':
                    keyElement.innerHTML = '←';
                    keyElement.addEventListener('click', () => {
                        textareaInput.selectionStart = textareaInput.selectionEnd -= 1;
                        this.triggerEvent('oninput');
                        textareaInput.focus();
                    });

                    break;

                case '→':
                    keyElement.innerHTML = '→';
                    keyElement.addEventListener('click', () => {
                        textareaInput.selectionStart = textareaInput.selectionEnd += 1;
                        this.triggerEvent('oninput');
                        textareaInput.focus();
                    });

                    break;

                case '↑':
                    keyElement.innerHTML = '↑';
                    keyElement.addEventListener('click', () => {
                        this.arrowUp();
                        this.triggerEvent('oninput');
                        textareaInput.focus();
                    });

                    break;

                case '↓':
                    keyElement.innerHTML = '↓';
                    keyElement.addEventListener('click', () => {
                        this.arrowDown();
                        this.triggerEvent('oninput');
                        textareaInput.focus();
                });

                    break;

                case 'space':
                    keyElement.classList.add('keyboard__key--extra-wide');

                    keyElement.addEventListener('click', () => {
                        this.properties.value += ' ';
                        this.triggerEvent('oninput');
                        textareaInput.focus();
                    });

                    break;

                case 'done':
                    keyElement.classList.add('keyboard__key--wide');
                    keyElement.innerHTML = '✔';

                    keyElement.addEventListener('click', () => {
                        this.close();
                        this.triggerEvent('onclose');
                    });

                    break;

                case 'en':
                case 'ru': {
                    keyElement.classList.add('keyboard__key--wide');
                    keyElement.textContent = key.toLowerCase();
                    keyElement.addEventListener('click', () => {
                        this.toggleLang();
                    });

                    break;
                }

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



    triggerEvent(handlerName) {
        if (typeof this.eventHandlers[handlerName] == 'function') {
            this.eventHandlers[handlerName](this.properties.value);
        }
    },

    toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;

        for (const key of this.elements.keys) {
            if (key.childElementCount === 0 && (key.textContent !== 'ru' && key.textContent !== 'en')) {
                if ((this.properties.capsLock && !this.properties.shift) ||
                    (!this.properties.capsLock && this.properties.shift)) {
                    key.textContent = key.textContent.toUpperCase();
                } else {
                    key.textContent = key.textContent.toLowerCase();
                }
            }
        }
    },

    toggleShift() {
        this.properties.shift = !this.properties.shift;

        this.elements.keysContainer.innerHTML = '';
        this.elements.keysContainer.append(this.createKeys());
        this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');

        for (const key of this.elements.keys) {
            if (key.childElementCount === 0 && (key.textContent !== 'ru' && key.textContent !== 'en')) {
                if ((this.properties.capsLock && !this.properties.shift) ||
                    (!this.properties.capsLock && this.properties.shift)) {
                    key.textContent = key.textContent.toUpperCase();
                } else {
                    key.textContent = key.textContent.toLowerCase();
                }
            }
        }

    },

    toggleLang() {
        this.elements.keysContainer.innerHTML = '';
        this.elements.keysContainer.append(this.createKeys());
        this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');

        this.properties.lang = this.properties.lang === 'en' ? 'ru' : 'en';
    },

    open(initialValue, oninput, onclose) {
        this.properties.value = initialValue || '';
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.remove('keyboard--hidden');
    },

    close() {
        this.properties.value = '';
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.add('keyboard--hidden');
    },

    arrowUp() {
        let pos = textareaInput.selectionEnd;
        let prevLine = textareaInput.value.lastIndexOf('\n', pos);
        let TwoBLine = textareaInput.value.lastIndexOf('\n', prevLine - 1);
        if (prevLine === -1) {
                return;
        }
        pos = pos - prevLine;
        textareaInput.selectionStart = textareaInput.selectionEnd = TwoBLine + pos;
    },

    arrowDown() {
        let pos = textareaInput.selectionEnd;
        let prevLine = textareaInput.value.lastIndexOf('\n', pos);
        let nextLine = textareaInput.value.indexOf('\n', pos + 1);
            if (nextLine === -1) {
                return;
        }
        pos = pos - prevLine;
        textareaInput.selectionStart = textareaInput.selectionEnd = nextLine + pos;
    },
};

window.addEventListener('DOMContentLoaded', function () {
    Keyboard.init();
});
