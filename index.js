var marked = require('marked');

module.exports = function(fastn, component, type, settings, children){
    settings.tagName = component._tagName || type;

    component.extend('_generic', settings, children);
    component.setProperty('content', fastn.property('', function(){
        if(!component.element){
            return;
        }

        component.element.innerHTML = marked(component.content());
    }));

    return component;
};