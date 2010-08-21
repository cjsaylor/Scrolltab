/**
 * jQuery Scrolltab
 * By: Chris Saylor
 * chris.saylor@criusinteractive.com
 * 
 * This is a simple plugin that enables a developer to attach floating
 * tabs to the scrollbar of the browser that will scroll the user to
 * the position indicated by the tab.  This tab is expandable with content 
 * within.
 * 
 * Copyright (c) 2010 <copyright holders>
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
               classname: 'scrolltab-item'
            }
            var options = $.extend(defaults, options);
            
            var data = {
               body: 0
            }
            
            return this.each(function(index) {
               var obj = $(this);

               data.body = $('body').height();

               // Create the pin and position
               var pin = $('<div/>')
                  .attr('class', options.classname)
                  .css('position', 'fixed')
                  .css('right', 0)
                  
               // Append to dom so we can calculate object height.
               $('body').append(pin);
               
               // Calculate scroll bar position for this element
               var pos = calc(obj, pin);
               
               
               // Attach click action (scroll)
               pin.css('top', pos)
                  .hide()
                  .click(function() {
                     $('html,body').animate({scrollTop: obj.offset().top+"px"}, 1000);
                     return false;
                  })
                  .css('cursor', 'pointer')
               
               // Fade in the tabs after 1 second   
               setTimeout(function() { pin.fadeIn('slow'); }, 1000);
               
               // Handle window size and dom changes
               $(window).resize(function() { update(obj, pin); });
               
               // Scan for changes to the height of the body (dom element removal).
               setInterval(function() {
                  if(isResizable())
                     update(obj, pin);
                     data.body = $('body').height();
               }, 1000);
            });
            
            /**
             * Updates the positions of each scroll pin.  If the object of the scroll
             * pin is no longer within the visible dom, the corresponding pin is removed.
             * 
             * @param jQuery object - Object of the scroll pin
             * @param jQuery pin - Pin object
             * @return void
             */
            function update(object, pin) {
               if(object.parents().length == 0)
                  setTimeout(function() { pin.remove(); }, 1000);
               else
                  setTimeout(function() { pin.animate({top: calc(object, pin)}); }, 1000);
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
             * Returns true if the pin positions need to be adjusted.
             * 
             * @return boolean
             */
            function isResizable() {
               return $('body').height() != data.body;
            }
         }
   });
})(jQuery);
