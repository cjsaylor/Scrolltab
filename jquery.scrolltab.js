/**
 * jQuery Scrolltab Plugin v1.0.4
 * https://github.com/cjsaylor/scrolltab
 * 
 * Options
 *    title: HTML to display within the pin.
 *    classname: Choose the classname you want the pin to use.
 * 
 * Supported events:
 *    click, mouseenter, mouseleave
 * 
 * This is a simple plugin that enables a developer to attach floating
 * tabs to the scrollbar of the browser that will scroll the user to
 * the position indicated by the tab.  This tab is expandable with content 
 * within.
 * 
 * The pins react to changes in the pinned object, dom structure/size,
 * and the size of the window.
 * 
 * ---------------------------------------------------------------------
 * Copyright (c) 2010 - 2014 Chris Saylor
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

(function($) {

  $.fn.scrolltab = function(options) {

    var settings = $.extend({}, $.fn.scrolltab.defaults, options);

    var data = {
      body: 0,
      pinId: 1
    };

    return this.each(function() {
      var obj = $(this);

      // Detect if this object has already had a pin created
      if(!obj.data('scrolltab_enabled')) {
        initializePin.call(obj);
      } else {
        // The pin already exists, so lets select the existing pin.
        updateExistingPin.call(obj);
      }
    });

    /**
     * Create a pin associated with the subject object.
     *
     * @return void
     */
    function initializePin() {
      this.data('scrolltab_enabled', true);
      data.body = $('body').height();

      var id = 'scrolltab_' + data.pinId++;

      // Create the pin and position
      var pin = $('<div/>')
        .attr('id', id)
        .attr('class', this.data('st-classname') || settings.classname)
        .html(this.data('st-title') || settings.title)
        .css('position', 'fixed')
        .css('right', 0)
        .bind('mouseenter.scrolltab', settings.mouseenter)
        .bind('mouseleave.scrolltab', settings.mouseleave)
        .bind('click.scrolltab', settings.click);

      this.data('scrolltab_id', id);
              
      // Append to dom so we can calculate object height.
      $('body').append(pin);
           
      // Calculate scroll bar position for this element
      var pos = calc.call(this, pin);

      // Attach click action (scroll)
      pin.css('top', pos)
        .hide()
        .bind('click.scrolltab', function(e) {
          e.preventDefault();
          $('html,body').animate({scrollTop: this.offset().top+"px"}, 1000);
        }.bind(this))
        .css('cursor', 'pointer');
           
      $.fn.scrolltab.pinInitialDisplay.call(this, pin);
       
      // Update pin status (if applicable) every second.
      setInterval(function() {
        update.call(this, pin);
      }.bind(this), 1000);
    }

    /**
     * Update a pin via the pin's subject.
     *
     * @param object obj
     * @return void
     */
    function updateExistingPin() {
      var pin = $('#' + this.data('scrolltab_id'));

      // Only remap what has been set in the options.
      if(options.mouseenter) {
        pin.unbind('mouseenter.scrolltab').on('mouseenter.scrolltab', options.mouseenter);
      }
      if(options.mouseleave) {
        pin.unbind('mouseleave.scrolltab').on('mouseleave.scrolltab', options.mouseleave);
      }
      if(options.click) {
        pin.unbind('click.scrolltab').on('click.scrolltab', options.click);
      }
      if(options.classname) {
        pin.attr('class', options.classname);
      }
      if(options.title) {
        pin.html(options.title);
      }
    }
  
         
    /**
     * Updates the positions of each scroll pin.  If the object of the scroll
     * pin is no longer within the visible dom, the corresponding pin is removed.
     * 
     * If the window size is greater than that of the body, hide all pins.
     * 
     * @param jQuery pin - Pin object
     * @return void
     */
    function update(pin) {
      if(this.parents().length === 0) {
        setTimeout(function() { pin.remove(); }, 1000);
      } else if(this.css('display') === 'none') {
        $.fn.scrolltab.pinHide.call(this, pin);
      } else {
        setTimeout(function() {
          pin.animate({top: calc.call(this, pin)}); 
        }.bind(this), 1000);
      }

      if(!isPinable()) {
        $.fn.scrolltab.pinHide.call(this, pin);
      } else if(isPinable() && this.css('display') !== 'none') {
        $.fn.scrolltab.pinDisplay.call(this, pin);
      }
    }

    /**
     * Calculates the vertical position of the main object to pin for scrolling.
     *
     * @param jQuery pin - Pin object
     * @return float Vertical position result
     */
    function calc(pin) {
      return parseInt(
        this.offset().top / $('body').height() * $(window).height() + (pin.height() / 2), 
        10
      );
    }
         
    /**
     * Returns true if the any of the pins should be showing
     * 
     * @return boolean
     */
    function isPinable() {
      return $('body').height() > $(window).height();
    }

  };

  /**
   * Exposed default options.
   *
   * @type Object
   */
  $.fn.scrolltab.defaults = {
    title: '',
    classname: 'scrolltab-item',
    mouseenter: function(){},
    mouseleave: function(){},
    click: function(){}
  };

  /**
   * Behavior when a pin needs to be displayed.
   *
   * This is both the initial display and pin display on update.
   *
   * @param Object pin jQuery object pin
   * @return void
   */
  $.fn.scrolltab.pinInitialDisplay = $.fn.scrolltab.pinDisplay = function (pin) {
    pin.fadeIn('slow');
  };

  /**
   * Behavior when a pin needs to be hidden.
   *
   * @param object pin jQuery object pin
   * @return void
   */
  $.fn.scrolltab.pinHide = function (pin) {
    pin.fadeOut('fast');
  };

})(jQuery);
