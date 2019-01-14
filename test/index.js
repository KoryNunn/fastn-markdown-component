var test = require('tape');
var markdownComponent = require('../');
var fastn = require('fastn')(
    require('fastn/domComponents')({
        markdown: markdownComponent
    })
);

function createHarness(fn){
    var rootEl = document.createElement('div');

    document.body.appendChild(rootEl);

    fn(rootEl, function(){
        document.body.removeChild(rootEl);
    });
}

test('Create markdown component', function(t){
    t.plan(2);
    createHarness(function(rootEl, callback){
        var component = fastn('markdown', {
            content: '# Hello world\n [site](/)'
        });

        component.render();
        rootEl.appendChild(component.element);

        t.equal(component.element.querySelectorAll('h1').length, 1, 'Contains H1 element');
        t.equal(component.element.querySelectorAll('a').length, 1, 'Contains A element');

        callback();
    });
});