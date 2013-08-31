/**
 * jQuery WAI ARIA Compatible Checkbox Plugin
 * by keul <luca@keul.it>
 */

;(function($) {

    var pattern = /\:checked/;

    if (document.querySelectorAll !== 'undefined') {
        // need to partially disable querySelectorAll for :checked
        document.nativeQuerySelectorAll = document.querySelectorAll;
        document.querySelectorAll = function(selector) {
            if (pattern.test(selector)) {
                throw('Native ":checked" selector disabled');
            }
            return this.nativeQuerySelectorAll(selector);
        }
    }

    $.expr[':'].checkbox = function(elem) {
        return (elem.nodeName.toLowerCase() === "input" && "checkbox" === elem.type) ||
            (elem.getAttribute("role")==="checkbox" && !!elem.getAttribute("aria-checked"));
    };

    $.expr[':'].checked = function(elem) {
        // In CSS3, :checked should return both checked and selected elements
        // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
        var nodeName = elem.nodeName.toLowerCase();
        return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected) ||
            (elem.getAttribute("role")==="checkbox" && elem.getAttribute("aria-checked")==="true");
    };

})(jQuery);
