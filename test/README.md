# fastn-markdown-component

markdown renderer for fastn

# usage

```javascript
var markdownComponent = require('fastn-markdown-component');
var fastn = require('fastn')(
    require('fastn/domComponents')({
        markdown: markdownComponent
    })
);

fastn('markdown', { content: '# Hello World' });
```
