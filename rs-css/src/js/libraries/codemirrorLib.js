import * as CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/lib/codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/css/css';
import 'codemirror/addon/display/placeholder';

const textarea = CodeMirror.fromTextArea(document.getElementById('mirror'), {
    mode: 'htmlmixed',
    htmlMode: true,
    lineWrapping: true,
    fixedGutter: true,
});

textarea.setOption('placeholder', 'Type in a CSS selector');

export default textarea;
