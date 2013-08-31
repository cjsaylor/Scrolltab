Scrolltab is a jQuery plugin that adds tabs visually associated to their position relative to the scroll bar.

This enables a developer to attach floating tabs to the scrollbar of the brwoser that will scroll the user to the position indicated by the tab.  This tab is expandable with content within.

## Demo

http://chris-saylor.com/Scrolltab/example.html

## Options

* `title`: HTML to display within the pin
* `classname`: The classname for the pin to use
* `mouseenter`: function to execute when the mouseenter event fires on this pin
* `mouseleave`: function to execute when the mouseleave event fires on this pin
* `click`: function to execute when the click event fire on this pin

## Examples

```javascript
	// Enables a pin with the default classname
	$('<dom object>').scrolltab();
```

```javascript
	// Changes the classname of the created (or existing) pin
	$('<dom object>').scrolltab({ classname: 'test' });
```

```javascript
	// Modifies the behavior of the click event on the pin
	$('<dom object').scrolltab({
		click: function (e) {
			e.preventDefault();
			alert('Pin clicked.')
		}
	});
```

```javascript
	// Modify the initial behavior of pins showing on page load
	$.fn.scrolltab.pinInitialDisplay = function(pin) {
		// I don't want the fancy fadein affect.
		pin.show();
	};
	$('<dom object>').scrolltab();
```

```javascript
	// Modify the default attributes of all pins created now on
	// In this example, I want all pins to have a click event function
	// callback attached.
	$.fn.scrolltab.default = $.extend($.fn.scrolltab.default, {
		click: function (e) {
			e.preventDefault();
			alert('Pin clicked!');
		}
	});
	$('<dom object>').scrolltab();
```

## Build

Scrolltab uses [Grunt CLI](http://gruntjs.com/) via [NodeJS](http://nodejs.org/) for linting and building the minified production file.

#### Setup

Install grunt cli globally:

```bash
$ npm install -g grunt-cli
```

Install dev dependencies:

```bash
$ npm install -d
```

Execute lint and build:

```bash
$ grunt
```

## License

This software is protected under the MIT license.
