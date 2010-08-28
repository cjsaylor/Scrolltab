/**
 * jQuery Scrolltab
 * By: Chris Saylor
 * chris.saylor@criusinteractive.com
 * 
 * Options
 *    title: HTML to display within the pin.
 *    classname: Choose the classname you want the pin to use.
 * 
 * Supported events:
 *    click, hoverin, hoverout
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
 * Copyright (c) 2010 Chris Saylor
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
   $.fn.extend({
      scrolltab: function(options) {
         var defaults = {
            title: '',
            classname: 'scrolltab-item',
            hoverin: function(){},
            hoverout: function(){},
            click: function(){}
         }
         var settings = $.extend(defaults, options);
         
         var data = {
            body: 0
         }
         
         return this.each(function(index) {
            var obj = $(this);
            
            // Detect if this object has already had a pin created
            if(!obj.data('scrolltab_enabled')) {
               obj.data('scrolltab_enabled', true);
               data.body = $('body').height();
               
               var id = 'scrolltab_' + Math.floor(Math.random() * 10001);
               
               // Create the pin and position
               var pin = $('<div/>')
                  .attr('id', id)
                  .attr('class', settings.classname)
                  .html(settings.title)
                  .css('position', 'fixed')
                  .css('right', 0)
                  .bind('mouseenter.userdefined', settings.hoverin)
                  .bind('mouseleave.userdefined', settings.hoverout)
                  .bind('click.userdefined', settings.click);
                  
               obj.data('scrolltab_id', id);
                  
               // Append to dom so we can calculate object height.
               $('body').append(pin);
               
               // Calculate scroll bar position for this element
               var pos = calc(obj, pin);
               
               
               // Attach click action (scroll)
               pin.css('top', pos)
                  .hide()
                  .bind('click.scrolltab', function() {
                     $('html,body').animate({scrollTop: obj.offset().top+"px"}, 1000);
                     return false;
                  })
                  .css('cursor', 'pointer')
               
               // Fade in the tabs after 1 second   
               setTimeout(function() { pin.fadeIn('slow'); }, 1000);
               
               // Update pin status (if applicable) every second.
               setInterval(function() {
                  update(obj, pin);
               }, 1000);
            } else {
               // The pin already exists, so lets select the existing pin.
               var pin = $('#' + obj.data('scrolltab_id'));
               
               // Only remap what has been set in the options.
               if(options.hoverin)
                  pin.unbind('mouseenter.userdefined').bind('mouseenter.userdefined', options.hoverin);
               if(options.hoverout)
                  pin.unbind('mouseleave.userdefined').bind('mouseleave.userdefined', options.hoverin);
               if(options.click)
                  pin.unbind('click.userdefined').bind('click.userdefined', options.click);
               if(options.classname)
                  pin.attr('class', options.classname);
               if(options.title)
                  pin.html(options.title)
            }
         });
         
         /**
          * Updates the positions of each scroll pin.  If the object of the scroll
          * pin is no longer within the visible dom, the corresponding pin is removed.
          * 
          * If the window size is greater than that of the body, hide all pins.
          * 
          * @param jQuery object - Object of the scroll pin
          * @param jQuery pin - Pin object
          * @return void
          */
         function update(object, pin) {
            if(object.parents().length == 0)
               setTimeout(function() { pin.remove(); }, 1000);
            else if(object.css('display') == 'none')
               pin.fadeOut();
            else
               setTimeout(function() { pin.animate({top: calc(object, pin)}); }, 1000);
               
            if(!isPinable())
               pin.fadeOut('fast');
            else if(isPinable() && object.css('display') != 'none')
               pin.fadeIn();
         }
         
         /**
          * Calculates the vertical position of the main object to pin for scrolling.
          * 
          * @param jQuery object - Object of the scroll pin
          * @param jQuery pin - Pin object
          * @return float Vertical position result
          */
         function calc(object, pin) {
            return object.offset().top / $('body').height() * $(window).height() + (pin.height() / 2);
         }
         
         /**
          * Returns true if the any of the pins should be showing
          * 
          * @return boolean
          */
         function isPinable() {
            return $('body').height() > $(window).height();
         }
      }
   });
})(jQuery);
