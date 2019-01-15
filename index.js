var marked = require('marked');

module.exports = function(fastn, component, type, settings, children){
    settings.tagName = component._tagName || type;

    component.extend('_generic', settings, children);

    function update(){
        if(!component.element){
            return;
        }

        var options = component.options() || {};

        marked(component.content(), options, function(err, res) {
            if (!err){
                component.element.innerHTML = res;
            }
        });
    }

    component.setProperty('options', fastn.property({}, update));
    component.setProperty('content', fastn.property('', update));

    return component;
};
