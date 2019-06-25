/* Source and licensing information for the line(s) below can be found at http://www.ratp.fr/themes/ratp/libraries/squeezebox/squeezebox.js. */
/* Squeezebox - vanilla JavaScript accordion
 * MIT License - by Nobita
 */

;(function ( window, document, undefined ) {

	"use strict";

	// *** UTILS ****
	function getStyle(el, prop){
		 return window.getComputedStyle(el).getPropertyValue(prop);
	}
	function setAttrs(el, attrs){
	  for(var key in attrs) {
	    el.setAttribute(key, attrs[key]);
	  }
	}
	// as in this case we only need to find siblings of the same class the cls argument
	// is needed every time for this function to work as there's no length checking before return;
	function siblings(el, cls){
		return Array.prototype.filter.call(el.parentNode.children, function(child){
		  return child !== el && child.classList.contains(cls);
		});
	}

	var _Squeezebox = function(opts){
		// *** Defaults ***
		this.wrapperEl = '.squeezebox';
		this.headersClass = 'squeezhead';
		this.foldersClass = 'squeezecnt';
		this.closeOthers = true;
		this.speed = '.7s';

		// Override defaults
		if( opts ){
			for ( var opt in opts ){
				this[opt] = opts[opt];
			}
		}
	};

	_Squeezebox.prototype = {
		init : function(){		
			var self = this;
			this.wrapper = document.querySelectorAll(this.wrapperEl);
			Array.prototype.forEach.call(this.wrapper,function(wr, idx, node){
				self.getHeights(wr); 
				self.setListeners(wr); 
			});
		},
		// The following method can be called whenever the content of the folder changes
		// in order to update its height. Example
		// var sqbox = new Squeezebox();
		// .....inject content...
		// sqbox.getHeights(wrapper)

		// TODO: the following method works only if the tabs are closed, refactor it
		// so that the user needs will be able to update the div height of currently open tabs
		getHeights : function(wr){
			// Call this method 
			var self = this,
				 folders = wr.getElementsByClassName(self.foldersClass),
				 fl = folders.length,
				 el,
				 elst;

			// Getting height of hidden elements can be tricky.
			// We need to:
			// - make sure they DO NOT have display:none so they have actual height
			// - they remain invisibile (visibility:hidden)
			// - they git position:absolute so they take no space at all
			// - they have no transitions attached so that the changes in style take place immediately
			// Then we can show the element (if hidden), record its styles, and backtrack again.
			while(fl--){
				el = folders[fl],
				elst = el.style;
				elst.position = 'absolute';
				elst.visibility = 'hidden';
				elst.display = '';
				elst.transition = '';
			// TODO: add will-change for better performance? http://dev.opera.com/articles/css-will-change-property/
				self.showEl(el);
				setAttrs(el, {
					//'data-sq_h'  : getStyle(el, 'height'),
                                        'data-sq_h'  : "none",
					'data-sq_pt' : getStyle(el, 'padding-top'),
					'data-sq_pb' : getStyle(el, 'padding-bottom')
				});
				elst.position = 'relative';
				elst.visibility = 'visible';
				self.hideEl(el);		
				self.addTran(el);
			}
		},
		addTran : function(el){
			var self = this;
			setTimeout(function(){
				el.style.transition = 'all ' + self.speed;				
			}, 100);
		},
		hideEl : function (el){
			var elst = el.style;
			elst.maxHeight = 0;
			elst.paddingTop = 0;
			elst.paddingBottom = 0;
			// set its aria-role
			el.setAttribute('aria-hidden', 'true');
		},
		showEl : function(el){
			var elst = el.style;
			elst.maxHeight = el.getAttribute('data-sq_h');
			elst.paddingTop = el.getAttribute('data-sq_pt');
			elst.paddingBottom = el.getAttribute('data-sq_pb');
			el.setAttribute('aria-hidden', 'false');			
		},
		hideSibl : function(el){
			var self = this;
			Array.prototype.forEach.call( siblings(el, self.foldersClass), function( sib, idx, ndl){
				self.hideEl(sib);
			});
		},
		setListeners : function(wr){
			var self = this;
			// We attach only one listener per accordion and delegate the event listening
			wr.addEventListener('click', function(e){
			   var el = e.target;
			   // check that the event bubbles up to the proper header.
			   while (el && !el.classList.contains(self.headersClass) ){
			     el = el.parentNode;
			     // stop bubbling after wrapper is met.
			     if( el === wr ){
			     		return;
			     }
			   }
			   // store a reference to the clicked el to be passed as a callback 
			   // as 'onOpen' or 'onClose' later on
			   self.clickedEl = el;
			   // now el is = to the actual element we need the event to be bound to			   
			   self.toggle( el.nextElementSibling );
				
			});
		},
		toggle : function(el){
			if ( el.getAttribute('aria-hidden') === 'false'){
				// IF visibile hide it
				this.hideEl(el);
				this.fireCallback(el, 'onClose');
			} else {
				// IF hidden show it
				if ( this.closeOthers ) { this.hideSibl(el); }
				this.showEl(el);
				this.fireCallback(el, 'onOpen');
			}
		},
		fireCallback : function(el, dir){
			(this[dir]) ? this[dir](this.wrapper, this.clickedEl, el) : null;
		}
	};

	window.Squeezebox = _Squeezebox;

})( window, document );







/* Source and licensing information for the above line(s) can be found at http://www.ratp.fr/themes/ratp/libraries/squeezebox/squeezebox.js. */;
/* Source and licensing information for the line(s) below can be found at http://www.ratp.fr/themes/ratp/libraries/jqueryzoom/jquerymagnify/js/jquery.magnify.js. */
/*!
 * jQuery Magnify Plugin v2.1.0 by T. H. Doan (http://thdoan.github.io/magnify/)
 * Based on http://thecodeplayer.com/walkthrough/magnifying-glass-for-images-using-jquery-and-css3
 *
 * jQuery Magnify by T. H. Doan is licensed under the MIT License.
 * Read a copy of the license in the LICENSE file or at http://choosealicense.com/licenses/mit
 */

(function($) {
  $.fn.magnify = function(oOptions) {
    // Default options
    oOptions = $.extend({
      'src': '',
      'speed': 100,
      'timeout': -1,
      'finalWidth': null,
      'finalHeight': null,
      'magnifiedWidth': null,
      'magnifiedHeight': null,
      'limitBounds': false,
      'afterLoad': function(){}
    }, oOptions);

    var $that = this, // Preserve scope
      $html = $('html'),

      // Initiate
      init = function(el) {
        var $image = $(el),
          $anchor = $image.closest('a'),
          oDataAttr = {};

        // Get data attributes
        for (var i in oOptions) {
          oDataAttr[i] = $image.attr('data-magnify-' + i.toLowerCase());
        }

        // Disable zooming if no valid large image source
        var sZoomSrc = oDataAttr['src'] || oOptions['src'] || $anchor.attr('href') || '';
        if (!sZoomSrc) return;

        var $container,
          $lens,
          nImageWidth,
          nImageHeight,
          nMagnifiedWidth,
          nMagnifiedHeight,
          nLensWidth,
          nLensHeight,
          nBoundX = 0,
          nBoundY = 0,
          oContainerOffset, // Relative to document
          oImageOffset,     // Relative to container
          // Get true offsets
          getOffset = function() {
            var o = $container.offset();
            // Store offsets from container border to image inside
            // NOTE: .offset() does NOT take into consideration image border and padding.
            oImageOffset = {
              'top': ($image.offset().top-o.top) + parseInt($image.css('border-top-width')) + parseInt($image.css('padding-top')),
              'left': ($image.offset().left-o.left) + parseInt($image.css('border-left-width')) + parseInt($image.css('padding-left'))
            };
            o.top += oImageOffset['top'];
            o.left += oImageOffset['left'];
            return o;
          },
          // Hide the lens
          hideLens = function() {
            if ($lens.is(':visible')) $lens.fadeOut(oOptions['speed'], function() {
              $html.removeClass('magnifying').trigger('magnifyend'); // Reset overflow-x
            });
          };

        // Data attributes have precedence over options object
        if (!isNaN(+oDataAttr['speed'])) oOptions['speed'] = +oDataAttr['speed'];
        if (!isNaN(+oDataAttr['timeout'])) oOptions['timeout'] = +oDataAttr['timeout'];
        if (!isNaN(+oDataAttr['finalWidth'])) oOptions['finalWidth'] = +oDataAttr['finalWidth'];
        if (!isNaN(+oDataAttr['finalHeight'])) oOptions['finalHeight'] = +oDataAttr['finalHeight'];
        if (!isNaN(+oDataAttr['magnifiedWidth'])) oOptions['magnifiedWidth'] = +oDataAttr['magnifiedWidth'];
        if (!isNaN(+oDataAttr['magnifiedHeight'])) oOptions['magnifiedHeight'] = +oDataAttr['magnifiedHeight'];
        if (oDataAttr['limitBounds']==='true') oOptions['limitBounds'] = true;
        if (typeof window[oDataAttr['afterLoad']]==='function') oOptions.afterLoad = window[oDataAttr['afterLoad']];

        // Save any inline styles for resetting
        $image.data('originalStyle', $image.attr('style'));

        // Activate magnification:
        // 1. Try to get large image dimensions
        // 2. Proceed only if able to get large image dimensions OK

        // [1] Calculate the native (magnified) image dimensions. The zoomed version is only shown
        // after the native dimensions are available. To get the actual dimensions we have to create
        // this image object.
        var elZoomImage = new Image();
        $(elZoomImage).on({
          'load': function() {
            // [2] Got image dimensions OK.

            var nX, nY;

            // Fix overlap bug at the edges during magnification
            $image.css('display', 'block');
            // Create container div if necessary
            if (!$image.parent('.magnify').length) {
              $image.wrap('<div class="magnify"></div>');
            }
            $container = $image.parent('.magnify');
            // Create the magnifying lens div if necessary
            if ($image.prev('.magnify-lens').length) {
              $container.children('.magnify-lens').css('background-image', 'url(\'' + sZoomSrc + '\')');
            } else {
              $image.before('<div class="magnify-lens loading" style="background:url(\'' + sZoomSrc + '\') 0 0 no-repeat"></div>');
            }
            $lens = $container.children('.magnify-lens');
            // Remove the "Loading..." text
            $lens.removeClass('loading');
            // Cache dimensions and offsets for improved performance
            // NOTE: This code is inside the load() function, which is important. The width and
            // height of the object would return 0 if accessed before the image is fully loaded.
            nImageWidth = oOptions['finalWidth'] || $image.width();
            nImageHeight = oOptions['finalHeight'] || $image.height();
            nMagnifiedWidth = oOptions['magnifiedWidth'] || elZoomImage.width;
            nMagnifiedHeight = oOptions['magnifiedHeight'] || elZoomImage.height;
            nLensWidth = $lens.width();
            nLensHeight = $lens.height();
            oContainerOffset = getOffset(); // Required by refresh()
            // Set zoom boundaries
            if (oOptions['limitBounds']) {
              nBoundX = (nLensWidth/2) / (nMagnifiedWidth/nImageWidth);
              nBoundY = (nLensHeight/2) / (nMagnifiedHeight/nImageHeight);
            }
            // Enforce non-native large image size?
            if (nMagnifiedWidth!==elZoomImage.width || nMagnifiedHeight!==elZoomImage.height) {
              $lens.css('background-size', nMagnifiedWidth + 'px ' + nMagnifiedHeight + 'px');
            }
            // Store zoom dimensions for mobile plugin
            $image.data('zoomSize', {
              'width': nMagnifiedWidth,
              'height': nMagnifiedHeight
            });
            // Clean up
            elZoomImage = null;
            // Execute callback
            oOptions.afterLoad();
            // Handle mouse movements
            $container.off().on({
              'mousemove touchmove': function(e) {
                e.preventDefault();
                // Reinitialize if image initially hidden
                if (!nImageHeight) {
                  refresh();
                  return;
                }
                // x/y coordinates of the mouse pointer or touch point. This is the position of
                // .magnify relative to the document.
                //
                // We deduct the positions of .magnify from the mouse or touch positions relative to
                // the document to get the mouse or touch positions relative to the container.
                nX = (e.pageX || e.originalEvent.touches[0].pageX) - oContainerOffset['left'],
                nY = (e.pageY || e.originalEvent.touches[0].pageY) - oContainerOffset['top'];
                // Toggle magnifying lens
                if (!$lens.is(':animated')) {
                  if (nX>nBoundX && nX<nImageWidth-nBoundX && nY>nBoundY && nY<nImageHeight-nBoundY) {
                    if ($lens.is(':hidden')) {
                      $html.addClass('magnifying').trigger('magnifystart'); // Hide overflow-x while zooming
                      $lens.fadeIn(oOptions['speed']);
                    }
                  } else {
                    hideLens();
                  }
                }
                if ($lens.is(':visible')) {
                  // Move the magnifying lens with the mouse
                  var sBgPos = '';
                  if (nMagnifiedWidth && nMagnifiedHeight) {
                    // Change the background position of .magnify-lens according to the position of
                    // the mouse over the .magnify-image image. This allows us to get the ratio of
                    // the pixel under the mouse pointer with respect to the image and use that to
                    // position the large image inside the magnifying lens.
                    var nRatioX = -Math.round(nX/nImageWidth*nMagnifiedWidth-nLensWidth/2),
                      nRatioY = -Math.round(nY/nImageHeight*nMagnifiedHeight-nLensHeight/2);
                    if (oOptions['limitBounds']) {
                      // Enforce bounds to ensure only image is visible in lens
                      var nBoundRight = -Math.round((nImageWidth-nBoundX)/nImageWidth*nMagnifiedWidth-nLensWidth/2),
                        nBoundBottom = -Math.round((nImageHeight-nBoundY)/nImageHeight*nMagnifiedHeight-nLensHeight/2);
                      // Left and right edges
                      if (nRatioX>0) nRatioX = 0;
                      else if (nRatioX<nBoundRight) nRatioX = nBoundRight;
                      // Top and bottom edges
                      if (nRatioY>0) nRatioY = 0;
                      else if (nRatioY<nBoundBottom) nRatioY = nBoundBottom;
                    }
                    sBgPos = nRatioX + 'px ' + nRatioY + 'px';
                  }
                  // Now the lens moves with the mouse. The logic is to deduct half of the lens's
                  // width and height from the mouse coordinates to place it with its center at the
                  // mouse coordinates. If you hover on the image now, you should see the magnifying
                  // lens in action.
                  $lens.css({
                    'top': Math.round(nY-nLensHeight/2) + oImageOffset['top'] + 'px',
                    'left': Math.round(nX-nLensWidth/2) + oImageOffset['left'] + 'px',
                    'background-position': sBgPos
                  });
                }
              },
              'mouseenter': function() {
                // Need to update offsets here to support accordions
                oContainerOffset = getOffset();
              },
              'mouseleave': hideLens
            });

            // Prevent magnifying lens from getting "stuck"
            if (oOptions['timeout']>=0) {
              $container.on('touchend', function() {
                setTimeout(hideLens, oOptions['timeout']);
              });
            }
            // Ensure lens is closed when tapping outside of it
            $('body').not($container).on('touchstart', hideLens);

            // Support image map click-throughs while zooming
            var sUsemap = $image.attr('usemap');
            if (sUsemap) {
              var $map = $('map[name=' + sUsemap.slice(1) + ']');
              // Image map needs to be on the same DOM level as image source
              $image.after($map);
              $container.click(function(e) {
                // Trigger click on image below lens at current cursor position
                if (e.clientX || e.clientY) {
                  $lens.hide();
                  var elPoint = document.elementFromPoint(
                      e.clientX || e.originalEvent.touches[0].clientX,
                      e.clientY || e.originalEvent.touches[0].clientY
                    );
                  if (elPoint.nodeName==='AREA') {
                    elPoint.click();
                  } else {
                    // Workaround for buggy implementation of elementFromPoint()
                    // See https://bugzilla.mozilla.org/show_bug.cgi?id=1227469
                    $('area', $map).each(function() {
                      var a = $(this).attr('coords').split(',');
                      if (nX>=a[0] && nX<=a[2] && nY>=a[1] && nY<=a[3]) {
                        this.click();
                        return false;
                      }
                    });
                  }
                }
              });
            }

            if ($anchor.length) {
              // Make parent anchor inline-block to have correct dimensions
              $anchor.css('display', 'inline-block');
              // Disable parent anchor if it's sourcing the large image
              if ($anchor.attr('href') && !(oDataAttr['src'] || oOptions['src'])) {
                $anchor.click(function(e) {
                  e.preventDefault();
                });
              }
            }

          },
          'error': function() {
            // Clean up
            elZoomImage = null;
          }
        });

        elZoomImage.src = sZoomSrc;
      }, // END init()

      // Simple debounce
      nTimer = 0,
      refresh = function() {
        clearTimeout(nTimer);
        nTimer = setTimeout(function() {
          $that.destroy();
          $that.magnify(oOptions);
        }, 100);
      };

    /**
     * Public Methods
     */

    // Turn off zoom and reset to original state
    this.destroy = function() {
      this.each(function() {
        var $this = $(this),
          $lens = $this.prev('div.magnify-lens'),
          sStyle = $this.data('originalStyle');
        if ($this.parent('div.magnify').length && $lens.length) {
          if (sStyle) $this.attr('style', sStyle);
          else $this.removeAttr('style');
          $this.unwrap();
          $lens.remove();
        }
      });
      // Unregister event handler
      $(window).off('resize', refresh);
      return $that;
    }

    // Handle window resizing
    $(window).resize(refresh);

    return this.each(function() {
      // Initiate magnification powers
      init(this);
    });

  };
}(jQuery));

/* Source and licensing information for the above line(s) can be found at http://www.ratp.fr/themes/ratp/libraries/jqueryzoom/jquerymagnify/js/jquery.magnify.js. */;
/* Source and licensing information for the line(s) below can be found at http://www.ratp.fr/core/assets/vendor/jquery.ui/ui/widgets/menu-min.js. */
/*! jQuery UI - v1.12.1 - 2017-03-31
* http://jqueryui.com
* Copyright jQuery Foundation and other contributors; Licensed  */
!function(a){"function"==typeof define&&define.amd?define(["jquery","../keycode","../position","../safe-active-element","../unique-id","../version","../widget"],a):a(jQuery)}(function(a){return a.widget("ui.menu",{version:"1.12.1",defaultElement:"<ul>",delay:300,options:{icons:{submenu:"ui-icon-caret-1-e"},items:"> *",menus:"ul",position:{my:"left top",at:"right top"},role:"menu",blur:null,focus:null,select:null},_create:function(){this.activeMenu=this.element,this.mouseHandled=!1,this.element.uniqueId().attr({role:this.options.role,tabIndex:0}),this._addClass("ui-menu","ui-widget ui-widget-content"),this._on({"mousedown .ui-menu-item":function(a){a.preventDefault()},"click .ui-menu-item":function(b){var c=a(b.target),d=a(a.ui.safeActiveElement(this.document[0]));!this.mouseHandled&&c.not(".ui-state-disabled").length&&(this.select(b),b.isPropagationStopped()||(this.mouseHandled=!0),c.has(".ui-menu").length?this.expand(b):!this.element.is(":focus")&&d.closest(".ui-menu").length&&(this.element.trigger("focus",[!0]),this.active&&1===this.active.parents(".ui-menu").length&&clearTimeout(this.timer)))},"mouseenter .ui-menu-item":function(b){if(!this.previousFilter){var c=a(b.target).closest(".ui-menu-item"),d=a(b.currentTarget);c[0]===d[0]&&(this._removeClass(d.siblings().children(".ui-state-active"),null,"ui-state-active"),this.focus(b,d))}},mouseleave:"collapseAll","mouseleave .ui-menu":"collapseAll",focus:function(a,b){var c=this.active||this.element.find(this.options.items).eq(0);b||this.focus(a,c)},blur:function(b){this._delay(function(){var c=!a.contains(this.element[0],a.ui.safeActiveElement(this.document[0]));c&&this.collapseAll(b)})},keydown:"_keydown"}),this.refresh(),this._on(this.document,{click:function(a){this._closeOnDocumentClick(a)&&this.collapseAll(a),this.mouseHandled=!1}})},_destroy:function(){var b=this.element.find(".ui-menu-item").removeAttr("role aria-disabled"),c=b.children(".ui-menu-item-wrapper").removeUniqueId().removeAttr("tabIndex role aria-haspopup");this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeAttr("role aria-labelledby aria-expanded aria-hidden aria-disabled tabIndex").removeUniqueId().show(),c.children().each(function(){var b=a(this);b.data("ui-menu-submenu-caret")&&b.remove()})},_keydown:function(b){var c,d,e,f,g=!0;switch(b.keyCode){case a.ui.keyCode.PAGE_UP:this.previousPage(b);break;case a.ui.keyCode.PAGE_DOWN:this.nextPage(b);break;case a.ui.keyCode.HOME:this._move("first","first",b);break;case a.ui.keyCode.END:this._move("last","last",b);break;case a.ui.keyCode.UP:this.previous(b);break;case a.ui.keyCode.DOWN:this.next(b);break;case a.ui.keyCode.LEFT:this.collapse(b);break;case a.ui.keyCode.RIGHT:this.active&&!this.active.is(".ui-state-disabled")&&this.expand(b);break;case a.ui.keyCode.ENTER:case a.ui.keyCode.SPACE:this._activate(b);break;case a.ui.keyCode.ESCAPE:this.collapse(b);break;default:g=!1,d=this.previousFilter||"",f=!1,e=b.keyCode>=96&&b.keyCode<=105?(b.keyCode-96).toString():String.fromCharCode(b.keyCode),clearTimeout(this.filterTimer),e===d?f=!0:e=d+e,c=this._filterMenuItems(e),c=f&&c.index(this.active.next())!==-1?this.active.nextAll(".ui-menu-item"):c,c.length||(e=String.fromCharCode(b.keyCode),c=this._filterMenuItems(e)),c.length?(this.focus(b,c),this.previousFilter=e,this.filterTimer=this._delay(function(){delete this.previousFilter},1e3)):delete this.previousFilter}g&&b.preventDefault()},_activate:function(a){this.active&&!this.active.is(".ui-state-disabled")&&(this.active.children("[aria-haspopup='true']").length?this.expand(a):this.select(a))},refresh:function(){var b,c,d,e,f,g=this,h=this.options.icons.submenu,i=this.element.find(this.options.menus);this._toggleClass("ui-menu-icons",null,!!this.element.find(".ui-icon").length),d=i.filter(":not(.ui-menu)").hide().attr({role:this.options.role,"aria-hidden":"true","aria-expanded":"false"}).each(function(){var b=a(this),c=b.prev(),d=a("<span>").data("ui-menu-submenu-caret",!0);g._addClass(d,"ui-menu-icon","ui-icon "+h),c.attr("aria-haspopup","true").prepend(d),b.attr("aria-labelledby",c.attr("id"))}),this._addClass(d,"ui-menu","ui-widget ui-widget-content ui-front"),b=i.add(this.element),c=b.find(this.options.items),c.not(".ui-menu-item").each(function(){var b=a(this);g._isDivider(b)&&g._addClass(b,"ui-menu-divider","ui-widget-content")}),e=c.not(".ui-menu-item, .ui-menu-divider"),f=e.children().not(".ui-menu").uniqueId().attr({tabIndex:-1,role:this._itemRole()}),this._addClass(e,"ui-menu-item")._addClass(f,"ui-menu-item-wrapper"),c.filter(".ui-state-disabled").attr("aria-disabled","true"),this.active&&!a.contains(this.element[0],this.active[0])&&this.blur()},_itemRole:function(){return{menu:"menuitem",listbox:"option"}[this.options.role]},_setOption:function(a,b){if("icons"===a){var c=this.element.find(".ui-menu-icon");this._removeClass(c,null,this.options.icons.submenu)._addClass(c,null,b.submenu)}this._super(a,b)},_setOptionDisabled:function(a){this._super(a),this.element.attr("aria-disabled",String(a)),this._toggleClass(null,"ui-state-disabled",!!a)},focus:function(a,b){var c,d,e;this.blur(a,a&&"focus"===a.type),this._scrollIntoView(b),this.active=b.first(),d=this.active.children(".ui-menu-item-wrapper"),this._addClass(d,null,"ui-state-active"),this.options.role&&this.element.attr("aria-activedescendant",d.attr("id")),e=this.active.parent().closest(".ui-menu-item").children(".ui-menu-item-wrapper"),this._addClass(e,null,"ui-state-active"),a&&"keydown"===a.type?this._close():this.timer=this._delay(function(){this._close()},this.delay),c=b.children(".ui-menu"),c.length&&a&&/^mouse/.test(a.type)&&this._startOpening(c),this.activeMenu=b.parent(),this._trigger("focus",a,{item:b})},_scrollIntoView:function(b){var c,d,e,f,g,h;this._hasScroll()&&(c=parseFloat(a.css(this.activeMenu[0],"borderTopWidth"))||0,d=parseFloat(a.css(this.activeMenu[0],"paddingTop"))||0,e=b.offset().top-this.activeMenu.offset().top-c-d,f=this.activeMenu.scrollTop(),g=this.activeMenu.height(),h=b.outerHeight(),e<0?this.activeMenu.scrollTop(f+e):e+h>g&&this.activeMenu.scrollTop(f+e-g+h))},blur:function(a,b){b||clearTimeout(this.timer),this.active&&(this._removeClass(this.active.children(".ui-menu-item-wrapper"),null,"ui-state-active"),this._trigger("blur",a,{item:this.active}),this.active=null)},_startOpening:function(a){clearTimeout(this.timer),"true"===a.attr("aria-hidden")&&(this.timer=this._delay(function(){this._close(),this._open(a)},this.delay))},_open:function(b){var c=a.extend({of:this.active},this.options.position);clearTimeout(this.timer),this.element.find(".ui-menu").not(b.parents(".ui-menu")).hide().attr("aria-hidden","true"),b.show().removeAttr("aria-hidden").attr("aria-expanded","true").position(c)},collapseAll:function(b,c){clearTimeout(this.timer),this.timer=this._delay(function(){var d=c?this.element:a(b&&b.target).closest(this.element.find(".ui-menu"));d.length||(d=this.element),this._close(d),this.blur(b),this._removeClass(d.find(".ui-state-active"),null,"ui-state-active"),this.activeMenu=d},this.delay)},_close:function(a){a||(a=this.active?this.active.parent():this.element),a.find(".ui-menu").hide().attr("aria-hidden","true").attr("aria-expanded","false")},_closeOnDocumentClick:function(b){return!a(b.target).closest(".ui-menu").length},_isDivider:function(a){return!/[^\-\u2014\u2013\s]/.test(a.text())},collapse:function(a){var b=this.active&&this.active.parent().closest(".ui-menu-item",this.element);b&&b.length&&(this._close(),this.focus(a,b))},expand:function(a){var b=this.active&&this.active.children(".ui-menu ").find(this.options.items).first();b&&b.length&&(this._open(b.parent()),this._delay(function(){this.focus(a,b)}))},next:function(a){this._move("next","first",a)},previous:function(a){this._move("prev","last",a)},isFirstItem:function(){return this.active&&!this.active.prevAll(".ui-menu-item").length},isLastItem:function(){return this.active&&!this.active.nextAll(".ui-menu-item").length},_move:function(a,b,c){var d;this.active&&(d="first"===a||"last"===a?this.active["first"===a?"prevAll":"nextAll"](".ui-menu-item").eq(-1):this.active[a+"All"](".ui-menu-item").eq(0)),d&&d.length&&this.active||(d=this.activeMenu.find(this.options.items)[b]()),this.focus(c,d)},nextPage:function(b){var c,d,e;return this.active?void(this.isLastItem()||(this._hasScroll()?(d=this.active.offset().top,e=this.element.height(),this.active.nextAll(".ui-menu-item").each(function(){return c=a(this),c.offset().top-d-e<0}),this.focus(b,c)):this.focus(b,this.activeMenu.find(this.options.items)[this.active?"last":"first"]()))):void this.next(b)},previousPage:function(b){var c,d,e;return this.active?void(this.isFirstItem()||(this._hasScroll()?(d=this.active.offset().top,e=this.element.height(),this.active.prevAll(".ui-menu-item").each(function(){return c=a(this),c.offset().top-d+e>0}),this.focus(b,c)):this.focus(b,this.activeMenu.find(this.options.items).first()))):void this.next(b)},_hasScroll:function(){return this.element.outerHeight()<this.element.prop("scrollHeight")},select:function(b){this.active=this.active||a(b.target).closest(".ui-menu-item");var c={item:this.active};this.active.has(".ui-menu").length||this.collapseAll(b,!0),this._trigger("select",b,c)},_filterMenuItems:function(b){var c=b.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&"),d=new RegExp("^"+c,"i");return this.activeMenu.find(this.options.items).filter(".ui-menu-item").filter(function(){return d.test(a.trim(a(this).children(".ui-menu-item-wrapper").text()))})}})});
/* Source and licensing information for the above line(s) can be found at http://www.ratp.fr/core/assets/vendor/jquery.ui/ui/widgets/menu-min.js. */;
/* Source and licensing information for the line(s) below can be found at http://www.ratp.fr/core/assets/vendor/jquery.ui/ui/widgets/autocomplete-min.js. */
/*! jQuery UI - v1.12.1 - 2017-03-31
* http://jqueryui.com
* Copyright jQuery Foundation and other contributors; Licensed  */
!function(a){"function"==typeof define&&define.amd?define(["jquery","./menu","../keycode","../position","../safe-active-element","../version","../widget"],a):a(jQuery)}(function(a){return a.widget("ui.autocomplete",{version:"1.12.1",defaultElement:"<input>",options:{appendTo:null,autoFocus:!1,delay:300,minLength:1,position:{my:"left top",at:"left bottom",collision:"none"},source:null,change:null,close:null,focus:null,open:null,response:null,search:null,select:null},requestIndex:0,pending:0,_create:function(){var b,c,d,e=this.element[0].nodeName.toLowerCase(),f="textarea"===e,g="input"===e;this.isMultiLine=f||!g&&this._isContentEditable(this.element),this.valueMethod=this.element[f||g?"val":"text"],this.isNewMenu=!0,this._addClass("ui-autocomplete-input"),this.element.attr("autocomplete","off"),this._on(this.element,{keydown:function(e){if(this.element.prop("readOnly"))return b=!0,d=!0,void(c=!0);b=!1,d=!1,c=!1;var f=a.ui.keyCode;switch(e.keyCode){case f.PAGE_UP:b=!0,this._move("previousPage",e);break;case f.PAGE_DOWN:b=!0,this._move("nextPage",e);break;case f.UP:b=!0,this._keyEvent("previous",e);break;case f.DOWN:b=!0,this._keyEvent("next",e);break;case f.ENTER:this.menu.active&&(b=!0,e.preventDefault(),this.menu.select(e));break;case f.TAB:this.menu.active&&this.menu.select(e);break;case f.ESCAPE:this.menu.element.is(":visible")&&(this.isMultiLine||this._value(this.term),this.close(e),e.preventDefault());break;default:c=!0,this._searchTimeout(e)}},keypress:function(d){if(b)return b=!1,void(this.isMultiLine&&!this.menu.element.is(":visible")||d.preventDefault());if(!c){var e=a.ui.keyCode;switch(d.keyCode){case e.PAGE_UP:this._move("previousPage",d);break;case e.PAGE_DOWN:this._move("nextPage",d);break;case e.UP:this._keyEvent("previous",d);break;case e.DOWN:this._keyEvent("next",d)}}},input:function(a){return d?(d=!1,void a.preventDefault()):void this._searchTimeout(a)},focus:function(){this.selectedItem=null,this.previous=this._value()},blur:function(a){return this.cancelBlur?void delete this.cancelBlur:(clearTimeout(this.searching),this.close(a),void this._change(a))}}),this._initSource(),this.menu=a("<ul>").appendTo(this._appendTo()).menu({role:null}).hide().menu("instance"),this._addClass(this.menu.element,"ui-autocomplete","ui-front"),this._on(this.menu.element,{mousedown:function(b){b.preventDefault(),this.cancelBlur=!0,this._delay(function(){delete this.cancelBlur,this.element[0]!==a.ui.safeActiveElement(this.document[0])&&this.element.trigger("focus")})},menufocus:function(b,c){var d,e;return this.isNewMenu&&(this.isNewMenu=!1,b.originalEvent&&/^mouse/.test(b.originalEvent.type))?(this.menu.blur(),void this.document.one("mousemove",function(){a(b.target).trigger(b.originalEvent)})):(e=c.item.data("ui-autocomplete-item"),!1!==this._trigger("focus",b,{item:e})&&b.originalEvent&&/^key/.test(b.originalEvent.type)&&this._value(e.value),d=c.item.attr("aria-label")||e.value,void(d&&a.trim(d).length&&(this.liveRegion.children().hide(),a("<div>").text(d).appendTo(this.liveRegion))))},menuselect:function(b,c){var d=c.item.data("ui-autocomplete-item"),e=this.previous;this.element[0]!==a.ui.safeActiveElement(this.document[0])&&(this.element.trigger("focus"),this.previous=e,this._delay(function(){this.previous=e,this.selectedItem=d})),!1!==this._trigger("select",b,{item:d})&&this._value(d.value),this.term=this._value(),this.close(b),this.selectedItem=d}}),this.liveRegion=a("<div>",{role:"status","aria-live":"assertive","aria-relevant":"additions"}).appendTo(this.document[0].body),this._addClass(this.liveRegion,null,"ui-helper-hidden-accessible"),this._on(this.window,{beforeunload:function(){this.element.removeAttr("autocomplete")}})},_destroy:function(){clearTimeout(this.searching),this.element.removeAttr("autocomplete"),this.menu.element.remove(),this.liveRegion.remove()},_setOption:function(a,b){this._super(a,b),"source"===a&&this._initSource(),"appendTo"===a&&this.menu.element.appendTo(this._appendTo()),"disabled"===a&&b&&this.xhr&&this.xhr.abort()},_isEventTargetInWidget:function(b){var c=this.menu.element[0];return b.target===this.element[0]||b.target===c||a.contains(c,b.target)},_closeOnClickOutside:function(a){this._isEventTargetInWidget(a)||this.close()},_appendTo:function(){var b=this.options.appendTo;return b&&(b=b.jquery||b.nodeType?a(b):this.document.find(b).eq(0)),b&&b[0]||(b=this.element.closest(".ui-front, dialog")),b.length||(b=this.document[0].body),b},_initSource:function(){var b,c,d=this;a.isArray(this.options.source)?(b=this.options.source,this.source=function(c,d){d(a.ui.autocomplete.filter(b,c.term))}):"string"==typeof this.options.source?(c=this.options.source,this.source=function(b,e){d.xhr&&d.xhr.abort(),d.xhr=a.ajax({url:c,data:b,dataType:"json",success:function(a){e(a)},error:function(){e([])}})}):this.source=this.options.source},_searchTimeout:function(a){clearTimeout(this.searching),this.searching=this._delay(function(){var b=this.term===this._value(),c=this.menu.element.is(":visible"),d=a.altKey||a.ctrlKey||a.metaKey||a.shiftKey;b&&(!b||c||d)||(this.selectedItem=null,this.search(null,a))},this.options.delay)},search:function(a,b){return a=null!=a?a:this._value(),this.term=this._value(),a.length<this.options.minLength?this.close(b):this._trigger("search",b)!==!1?this._search(a):void 0},_search:function(a){this.pending++,this._addClass("ui-autocomplete-loading"),this.cancelSearch=!1,this.source({term:a},this._response())},_response:function(){var b=++this.requestIndex;return a.proxy(function(a){b===this.requestIndex&&this.__response(a),this.pending--,this.pending||this._removeClass("ui-autocomplete-loading")},this)},__response:function(a){a&&(a=this._normalize(a)),this._trigger("response",null,{content:a}),!this.options.disabled&&a&&a.length&&!this.cancelSearch?(this._suggest(a),this._trigger("open")):this._close()},close:function(a){this.cancelSearch=!0,this._close(a)},_close:function(a){this._off(this.document,"mousedown"),this.menu.element.is(":visible")&&(this.menu.element.hide(),this.menu.blur(),this.isNewMenu=!0,this._trigger("close",a))},_change:function(a){this.previous!==this._value()&&this._trigger("change",a,{item:this.selectedItem})},_normalize:function(b){return b.length&&b[0].label&&b[0].value?b:a.map(b,function(b){return"string"==typeof b?{label:b,value:b}:a.extend({},b,{label:b.label||b.value,value:b.value||b.label})})},_suggest:function(b){var c=this.menu.element.empty();this._renderMenu(c,b),this.isNewMenu=!0,this.menu.refresh(),c.show(),this._resizeMenu(),c.position(a.extend({of:this.element},this.options.position)),this.options.autoFocus&&this.menu.next(),this._on(this.document,{mousedown:"_closeOnClickOutside"})},_resizeMenu:function(){var a=this.menu.element;a.outerWidth(Math.max(a.width("").outerWidth()+1,this.element.outerWidth()))},_renderMenu:function(b,c){var d=this;a.each(c,function(a,c){d._renderItemData(b,c)})},_renderItemData:function(a,b){return this._renderItem(a,b).data("ui-autocomplete-item",b)},_renderItem:function(b,c){return a("<li>").append(a("<div>").text(c.label)).appendTo(b)},_move:function(a,b){return this.menu.element.is(":visible")?this.menu.isFirstItem()&&/^previous/.test(a)||this.menu.isLastItem()&&/^next/.test(a)?(this.isMultiLine||this._value(this.term),void this.menu.blur()):void this.menu[a](b):void this.search(null,b)},widget:function(){return this.menu.element},_value:function(){return this.valueMethod.apply(this.element,arguments)},_keyEvent:function(a,b){this.isMultiLine&&!this.menu.element.is(":visible")||(this._move(a,b),b.preventDefault())},_isContentEditable:function(a){if(!a.length)return!1;var b=a.prop("contentEditable");return"inherit"===b?this._isContentEditable(a.parent()):"true"===b}}),a.extend(a.ui.autocomplete,{escapeRegex:function(a){return a.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")},filter:function(b,c){var d=new RegExp(a.ui.autocomplete.escapeRegex(c),"i");return a.grep(b,function(a){return d.test(a.label||a.value||a)})}}),a.widget("ui.autocomplete",a.ui.autocomplete,{options:{messages:{noResults:"No search results.",results:function(a){return a+(a>1?" results are":" result is")+" available, use up and down arrow keys to navigate."}}},__response:function(b){var c;this._superApply(arguments),this.options.disabled||this.cancelSearch||(c=b&&b.length?this.options.messages.results(b.length):this.options.messages.noResults,this.liveRegion.children().hide(),a("<div>").text(c).appendTo(this.liveRegion))}}),a.ui.autocomplete});
/* Source and licensing information for the above line(s) can be found at http://www.ratp.fr/core/assets/vendor/jquery.ui/ui/widgets/autocomplete-min.js. */;
/* Source and licensing information for the line(s) below can be found at http://www.ratp.fr/modules/custom/ratp_infos_voyageurs/js/message-par-defaut.js. */
/**  JS Admin message par defaut **/
(function($, Drupal) {
      Drupal.behaviors.messageParDefaut = {
        attach: function () {
            $( document ).ready(function() {
                if($("#edit-message-bulletin-generale-3").prop('checked')){
                    $("#edit-autre-message-bulletin-generale").show();
                }
                $(".form-item-message-bulletin-generale .form-radio").click(function(){
                    if($("#edit-message-bulletin-generale-3").prop('checked')){
                        $("#edit-autre-message-bulletin-generale").show();
                    }else{
                        $("#edit-autre-message-bulletin-generale").hide();
                    }
                });
                
                
                if($("#edit-message-manifesations-2").prop('checked')){
                    $("#edit-autre-message-manifesations").show();
                }
                $(".form-item-message-manifesations .form-radio").click(function(){
                    if($("#edit-message-manifesations-2").prop('checked')){
                        $("#edit-autre-message-manifesations").show();
                    }else{
                        $("#edit-autre-message-manifesations").hide();
                    }
                });
                
            });

       /*     $("#autocompleteBusNoctilien").autocomplete({
                source: '/autocomplete-search-bus-noctilien',
                select: function (event, ui) {
                    var value = ui.item.value;
                    var href = ui.item.href;
                    var codeline = href.split("/")[3];
                    href="/travaux-manifestations/busratp/"+codeline;
                    var pathname = window.location.pathname.split("/");
                    if(pathname[1]=='en'){
                        href="/en"+href;
                        console.log(href);
                    }
                    setElementAutocomplete(value, href);
                },
            }).data('ui-autocomplete')._renderItem = function (ul, item) {
                var liHtml = "<li>" + item.label + "</li>";
                return jQuery(liHtml).appendTo(ul);
            };
            //Afficher Image Autocomplete
            function setElementAutocomplete(value, href) {
                (function ($) {
                    $(".divAutocomplete a").attr("title", value);
                    $(".divAutocomplete a").attr("href", href);
                })(jQuery);
            }*/
        }
    }
})(jQuery, Drupal, drupalSettings);
/* Source and licensing information for the above line(s) can be found at http://www.ratp.fr/modules/custom/ratp_infos_voyageurs/js/message-par-defaut.js. */;
