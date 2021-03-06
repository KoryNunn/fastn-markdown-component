var test = require('tape');
var MockBrowser = require('mock-browser').mocks.MockBrowser;
var mock = new MockBrowser();
var markdownComponent = require('../');

global.document = mock.getDocument();
global.window = mock.getWindow();
global.Node = global.window.Node;

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

test('Markdown options', function(t){
    t.plan(1);
    createHarness(function(rootEl, callback){
        var component = fastn('markdown', {
            options: {
                breaks: true
            },
            content: 'foo\nbar'
        });

        component.render();
        rootEl.appendChild(component.element);

        t.equal(component.element.querySelectorAll('br').length, 1, 'Contains configured br');

        callback();
    });
});

test('Handles errors', function(t){
    t.plan(1);
    createHarness(function(rootEl, callback){
        var component = fastn('markdown', {
            content: '```javascript\nfoo\n```',
            options: {
                highlight: function(code, something, callback){
                    callback('Error');
                }
            }
        });

        component.on('error', () => {}); // ignore generally
        component.once('error', function(){
            t.pass();
        });

        component.render();

        callback();
    });
});

test('Handles no content', function(t){
    t.plan(1);
    createHarness(function(rootEl, callback){
        var component = fastn('markdown', {
            content: null
        });

        component.render();

        t.pass();

        callback();
    });
});