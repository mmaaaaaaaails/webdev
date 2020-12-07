import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import css from 'highlight.js/lib/languages/css';
import 'highlight.js/styles/ocean.css';

hljs.registerLanguage('css', css);
hljs.initHighlightingOnLoad();
