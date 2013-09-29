/**
 * jQuery WAI ARIA Compatible Checkbox Plugin
 * by keul <luca@keul.it>
 */

;(function($) {

    var pattern = /\:checked/,
        jq_original = {};

    if (document.querySelectorAll !== 'undefined') {
        // need to partially disable querySelectorAll for :checked
        document.nativeQuerySelectorAll = document.querySelectorAll;
        document.querySelectorAll = function(selector) {
            if (pattern.test(selector)) {
                throw('Native ":checked" selector disabled');
            }
            return this.nativeQuerySelectorAll(selector);
        }
        // need to to the same for Element base class
        Element.prototype.nativeQuerySelectorAll = Element.prototype.querySelectorAll;
        Element.prototype.querySelectorAll = function(selector) {
            if (pattern.test(selector)) {
                throw('Native ":checked" selector disabled');
            }
            return this.nativeQuerySelectorAll(selector);
        }        
    }

    jq_original['checkbox'] = $.expr[':'].checkbox;

    $.expr[':'].checkbox = function(elem) {
        return (elem.getAttribute("role")==="checkbox" && !!elem.getAttribute("aria-checked"))
            || jq_original['checkbox'](elem);
    };

    jq_original['checked'] = $.expr[':'].checked;

    $.expr[':'].checked = function(elem) {
        if (elem.getAttribute("role")==="checkbox" && !!elem.getAttribute("aria-checked")) {
            return elem.getAttribute("aria-checked")==="true"; 
        }
        return jq_original['checked'](elem);
    };

    $.fn.extend({
        prop : function( name, value ) {
            if (name==='checked') {
                var propargs = arguments;
                var elements = [];
                for (var i=0;i<this.length;i++) {
                    var elem = this.get(i);
                    if (elem.getAttribute("role")==="checkbox" && elem.getAttribute("aria-checked")) {
                        var res = jQuery.access( $(elem), jQuery.attr, 'aria-checked', value, propargs.length > 1 );
                        if (typeof(res)==='string') {
                            return res==='true';
                        };
                        elements.push(res);
                    } else {
                        var res = jQuery.access( $(elem), jQuery.prop, name, value, propargs.length > 1 );
                        if (typeof(res)==='boolean') {
                            return res;
                        }
                        elements.push(res);
                    }
                };
                return elements;
            }
            return jQuery.access( this, jQuery.prop, name, value, arguments.length > 1 );
        },
        
        removeProp: function( name ) {
            name = jQuery.propFix[ name ] || name;
            return this.each(function() {
                if (this.getAttribute("role")==="checkbox" && this.getAttribute("aria-checked")) {
                    $(this).attr("aria-checked", "false");
                } else {
                    // try/catch handles cases where IE balks (such as removing a property on window)
                    try {
                        this[ name ] = undefined;
                        delete this[ name ];
                    } catch( e ) {}                    
                }
            });
        }

    });

})(jQuery);
