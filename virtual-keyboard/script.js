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
        capsLock: false
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
                this.open(element.value, currentValue => {
                    element.value = currentValue;
                });
            });
        });
    },

    createKeys() {
        const fragment = document.createDocumentFragment();
        const keyLayout = [
            '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
            'Tab','`', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']',
            'Caps Lock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'enter',
            'shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '↑', 'done',
            'ctrl','space', '←', '↓', '→',
        ];

        // 'ctrl','space', '←', '↓', '→',

        keyLayout.forEach(key => {
            const keyElement = document.createElement('button');
            const insertLineBreak = ['backspace', ']', 'enter', 'done'].indexOf(key) !== -1;

            keyElement.setAttribute('type', 'button');
            keyElement.classList.add('keyboard__key');

            switch (key) {
                case 'backspace':
                    keyElement.classList.add('keyboard__key--wide');
                    keyElement.innerHTML = 'backspace';

                    keyElement.addEventListener('click', () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this.triggerEvent('oninput');
                        textareaInput.focus();
                    });

                    break;

                case 'Caps Lock':
                    keyElement.classList.add('keyboard__key--wide', 'keyboard__key--activatable');
                    keyElement.innerHTML = 'Caps Lock';


                    keyElement.addEventListener('click', () => {
                        this.toggleCapsLock();
                        keyElement.classList.toggle('keyboard__key--active', this.properties.capsLock);
                        textareaInput.focus();
                    });

                    break;

                case 'enter':
                    keyElement.classList.add('keyboard__key--wide');
                    keyElement.innerHTML = 'enter';

                    keyElement.addEventListener('click', () => {
                        this.properties.value += '\n';
                        this.triggerEvent('oninput');
                        textareaInput.focus();
                    });

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



                case "done":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
                    keyElement.innerHTML = 'done';

                    keyElement.addEventListener("click", () => {
                        this.close();
                        this.triggerEvent("onclose");
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

    triggerEvent(handlerName) {
        if (typeof this.eventHandlers[handlerName] == 'function') {
            this.eventHandlers[handlerName](this.properties.value);
        }
    },

    toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;

        for (const key of this.elements.keys) {
            if (key.childElementCount === 0) {
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
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
    }
};

window.addEventListener('DOMContentLoaded', function () {
    Keyboard.init();
});
