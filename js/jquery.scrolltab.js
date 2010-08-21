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
               tab_class: 'scrolltab-item'
            }
            var options = $.extend(defaults, options);
            
            return this.each(function(index) {
               var obj = $(this);

               var pin = $('<div/>')
                  .attr('id', 'scrolltab'+index)
                  .attr('class', options.tab_class)
                  .css('position', 'fixed')
                  .css('right', 0)
                  .css('visibility', 'hidden');
                  
               // Append to dom so we can calculate object height.
               $('body').append(pin);
               
               var pos = obj.offset().top / $('body').height() * $(window).height() + pin.height()/2;
               
               pin.css('top', pos).css('visibility', 'visible')
                  .hide()
                  .click(function() {
                     $('html,body').animate({scrollTop: obj.offset().top+"px"}, 1000);
                     return false;
                  })
                  .css('color', 'white')
                  .css('cursor', 'pointer')
                  
               $('body').append(pin);
               setTimeout(function() {$('.'+options.tab_class).fadeIn('slow')}, 1000);
            });
         }
   });
})(jQuery);
