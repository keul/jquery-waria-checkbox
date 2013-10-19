jQuery WAI-ARIA Plugin for Checkbox
===================================

.. contents:: **Table of contents**

Introduction
------------

The scope of this jQuery plugin is to hide the difference between canonical **checkbox** HTML elements
and generic `WAI-ARIA versions`__, when using jQuery selectors like ``:checkbox`` and ``:checked`` or the
``.prop()`` method of jQuery objects.

__ http://www.w3.org/TR/wai-aria/roles#checkbox

How it works
------------

Let say we have an HTML snippet as follow:

.. code:: html

    <input type="checkbox" />
    <input type="checkbox" checked="checked" /> 
    <div role="checkbox" aria-checked="true">I'm a WAI ARIA checkbox</div>
    <div role="checkbox" aria-checked="false">I'm a WAI ARIA checkbox</div>

So assistive technologies able to understand WAI ARIA can find 4 checkbox inside that page.

But there are two jQuery selectors not able do recognize ARIA versions.

``:checkbox``
~~~~~~~~~~~~~

Let say we want to run the code below:

.. code:: javascript

    $(':checkbox').length

The result on this command on the page above will be '2', while we have *4* checkbox-like elements here.

``:checked``
~~~~~~~~~~~~

Let say we want to run the code below:

.. code:: javascript

    $(':checked').length

The result on this command on the page above will be '1' at load time, or this value could be also '0' or '2' if
you play with the HTML ``input`` checkbox element, but the ``div`` with checkbox ``role`` are never counted.

Fix those issues
----------------

Installing this jQuery plugin will change the way jQuery use those selectors. HTML elements with
``role="checkbox"`` are now part of the ``:checkbox`` selector, and the ``aria-checked`` is now analyzed when
querying for ``:checked`` elements.

Fixing ``.prop()`` usage
~~~~~~~~~~~~~~~~~~~~~~~~

jQuery methods like ``.prop()`` (and ``removeProp()`` also) used on real checkbox objects can be used to switch
of the the ``checked`` state.
This plugin will intercept those kind of call to WAI ARIA compatible checkbox, translating the call to the proper
attribute change. So:

* a call to ``.prop()`` will return the boolean check state
* a call to ``.prop(checkState)`` will change the ``aria-checked`` attribute to true" or "false"

Installation
------------

You can install this plugin by `manually downloading it`__, or use `bower`__::

    bower install waria-checkbox

__ https://raw.github.com/keul/jquery-waria-checkbox/master/jquery.waria-checkbox.js
__ http://bower.io/