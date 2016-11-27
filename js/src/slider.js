/*
 * Tiny Slider PACKAGED  1.0
 * Simple, Small & Tiny Slider
 * ISC License
 * by Fabio Ansaldi
*/
;( function( global, factory ) {
	/* Universal module Definition */
	if( typeof define == "function" && define.amd ) {
		/* Asynchronous Module Definition (RequireJS) */
		define( [ "tiny-slider/tinySlider" ], factory );
	} else if( typeof module == "object" && module.exports ) {
		
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				
				if ( !w.document ) {
					
					throw new Error( "Tiny Slider requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		/* Browser */
		factory( global );
	}
}( typeof window !== "undefined" ? window : this, function factory( global ) {
	
	var classies = {
		
		containerSelector: "tinySlider-container",
		
		listSelector: "tinySlider-list",
		
		itemSelector: "tinySlider-item",
		
		arrowSelector: "tinySlider-arrow",
		
		indexSelector: "tinySlider-index"
	};
	
	var settings = {
		
		containerSelector: "." + classies.containerSelector,
		
		containerStyle: styles.containerStyle,
		
		listSelector: "." + classies.listSelector,
		
		listStyle: styles.listStyle,
		
		itemSelector: "." + classies.itemSelector,
		
		itemStyle: styles.itemStyle,
		
		arrowSelector: "." + classies.arrowSelector,
		
		arrowContainerStyle: styles.arrowContainerStyle,
		
		arrowStyle: styles.arrowStyle,
		
		arrowAnchorStyle: styles.arrowAnchorStyle,
		
		prevArrowAnchorStyle: styles.prevArrowAnchorStyle,
		
		nextArrowAnchorStyle: styles.nextArrowAnchorStyle,
		
		indexSelector: "." + classies.indexSelector,
		
		indexContainerStyle: styles.indexContainerStyle,
		
		indexStyle: styles.indexStyle,
		
		indexAnchorStyle: styles.indexAnchorStyle,
		
		indexCurrentAnchorStyle: styles.indexCurrentAnchorStyle
	};
	
	var class2type = {};
	
	var rclass = /[\t\r\n\f]/g;
	var rnotwhite = /\S+/g;
	
	ts = {
		
		version: "1.0",
		
		container: null,
		
		init: function( options ) {
			
			ts.setClassType();
			settings = ts.extend( settings, options );
			ts.on( global.document, "DOMContentLoaded", ts.setSliderElements, true );
			return ts;
		},
		
		on: function( context, types, data, fn, removeListener ) {
			
			function on( context, types, fn, remove, data ) {
				
				return ts.each( context, function( i, elem ) {
					
					elem.addEventListener( types, function() {
						
						if( remove === true ) {
							// arguments.callee: used to refer to the currently executing function 
							// useful when the name of the function is unknown (also called "anonymous functions")
							elem.removeEventListener( types, arguments.callee );
						}
						if( data ) {
							
							global.event.data = data;
						}
						fn.call( elem, global.event );
					} );
				} );
			}
			if( ts.type( fn ) === "boolean" || ts.type( fn ) === "number"  ) {
				
				removeListener = !!fn;
			}
			if( ts.type( removeListener ) === "number" ) {
				
				removeListener = !!removeListener;
			}
			if( typeof data === "function" ) {
				
				fn = data;
				data = undefined;
			}
			if( typeof fn === "function" ) {
				
				return on( context, types, fn, removeListener, data );
			}
		},
		
		setSliderElements: function() {
			
			ts.container = ts.find( settings.containerSelector, global.document );
			ts.addClass( ts.container, classies.containerSelector );
			ts.setStyle( ts.container , settings.containerStyle );
			ts.each( ts.container, function( k, content ) {
				
				ts.each( ts.find( settings.listSelector, content ), function( i, elem ) {
					
					elem.items = ts.find( settings.itemSelector, elem );
					ts.setObjectStyle( elem, settings.listStyle, { width: elem.items.length + "00%" } );
					ts.addClass( elem, classies.listSelector );
					ts.setStyle( elem , settings.listStyle );
					ts.addClass( elem.items, classies.itemSelector );
					ts.setStyle( elem.items, settings.itemStyle );
					ts.createAnchorList( elem, elem.items.length, ts.setIndexes );
					ts.createAnchorList( elem, 2, ts.setArrows );
					ts.each( elem.items, function( i, item ) {
						
						ts.setStyle( ts.find( "img", item ), { "float": "left" } );
					} );
				} );
			} );
		},
		
		setClassType: function() {
			// Populate the class2type map
			var arrStr = "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " );
			for( var i in arrStr ) {
				
				class2type[ "[object " + arrStr[ i ] + "]" ] = arrStr[ i ].toLowerCase();
			}
		},
		
		extend: function() {
			
			var options;
			var target = arguments[ 0 ] || {};
			var deep = false;
			var i = 1;
			var length = arguments.length;
			// Handle a deep copy situation
			if( typeof target === "boolean" ) {
				
				deep = target;
				// Skip the boolean and the target
				target = arguments[ i ] || {};
				i++;
			}
			// Handle case when target is a string or something (possible in deep copy)
			if( typeof target !== "object" && typeof target !== "function" ) {
				
				target = {};
			}
			// Extend itself if only one argument is passed
			if( i === length ) {
				
				target = ts;
				i--;
			}
			// Extend arguments object
			for( ; i < length; i++ ) {
				// Only deal with non-null/undefined values
				if( ( options = arguments[ i ] ) !== null ) {
					// Extend the base object
					for( var name in options ) {
						
						var src = target[ name ];
						var copy = options[ name ];
						var copyIsArray;
						// Prevent never-ending loop
						if( target === copy ) {
							continue;
						}
						// Recurse if we're merging plain objects or arrays
						if( deep && copy && ( ts.isPlainObject( copy ) || ( copyIsArray = Array.isArray( copy ) ) ) ) {
							
							var clone;
							if( copyIsArray ) {
								
								copyIsArray = false;
								clone = src && Array.isArray( src ) ? src : [];
							} else {
								
								clone = src && ts.isPlainObject( src ) ? src : {};
							}
							// Never move original objects, clone them
							target[ name ] = ts.extend( deep, clone, copy );
						// Don't bring in undefined values
						} else if( copy !== undefined ) {
							
							target[ name ] = copy;
						}
					}
				}
			}
			// Return the modified object
			return target;
		},
		
		isPlainObject: function( obj ) {
			// Detect obvious negatives
			// Use toString to catch host objects
			if( !obj || toString.call( obj ) !== "[object Object]" ) {
				return false;
			}
			var proto = Object.getPrototypeOf( obj );
			// Objects with no prototype (e.g., `Object.create( null )`) are plain
			if( !proto ) {
				
				return true;
			}
			var hasOwn = class2type.hasOwnProperty;
			// Objects with prototype are plain if they were constructed by a global Object function
			var Ctor = class2type.hasOwnProperty.call( proto, "constructor" ) && proto.constructor;
			return typeof Ctor === "function" && hasOwn.toString.call( Ctor ) === hasOwn.toString.call( Object );
		},
		
		find: function( selector, context ) {
			
			var match;
			var arElements = [];
			if ( typeof selector === "string" ) {
				
				if( selector[ 0 ] === "<" && selector[ selector.length - 1 ] === ">" && selector.length >= 3 ) {
					// Assume that strings that start and end with <> are HTML and skip the regex check
					match = [ null, selector, null ];
				} else if( selector.indexOf( "#" ) < 0 && selector.indexOf( "." ) < 0 ) {
					
					match = [ null, selector, null ];
				} else {
					
					var arrSelector = [ '#', '.' ];
					for( var i in arrSelector ) {
						
						var expression = "^(?:\\s*(<[\\w\\W]+>)[^>]*|" + arrSelector[ i ] + "([\\w-]+))$";
						var regExp = new RegExp( expression );
						match = regExp.exec( selector );
					}
				}
				if( match && match[ 0 ] ) {
					
					if( match[ 0 ].indexOf( "#" ) >= 0 ) {
						
						match[ 1 ] = 'getElementById';
					} else {
						
						match[ 1 ] = 'getElementsByClassName';
					}
				} else if( match && match[ 1 ] ) {
					
					match[ 2 ] = match[ 1 ];
					match[ 1 ] = 'getElementsByTagName';
				}
				if( ts.isArrayLike( context ) ) {
					
					ts.each( context, function( i, elem ) {
						
						if( elem && elem.nodeType == 1 ) {
							
							arElements.push( elem[ match[ 1 ] ]( match[ 2 ] )[ 0 ] );
						}
					} );
				} else {
					
					arElements = context[ match[ 1 ] ]( match[ 2 ] );
				}
			}
			return arElements;
		},
		
		each: function( obj, callback ) {
			
			if( ts.isArrayLike( obj ) ) {
				
				var length = obj.length, i = 0;
				for( ; i < length; i++ ) {
					
					if( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
						
						break;
					}
				}
			} else if( ts.isPlainObject( obj ) ) {
				
				for( var j in obj ) {
					
					if( callback.call( obj[ j ], j, obj[ j ] ) === false ) {
						
						break;
					}
				}
			} else {
				
				callback.call( obj, 0, obj );
			}
			return obj;
		},
		
		isArrayLike: function( obj ) {
			// Support: real iOS 8.2 only (not reproducible in simulator)
			// `in` check used to prevent JIT error (gh-2145)
			// hasOwn isn't used here due to false negatives
			// regarding Nodelist length in IE
			var length = !!obj && "length" in obj && obj.length, type = ts.type( obj );
			if( type === "function" || ts.isWindow( obj ) ) {
				
				return false;
			}
			return type === "array" || length === 0 || typeof length === "number" && length > 0 && ( length - 1 ) in obj;
		},
		
		type: function( obj ) {
			
			if( obj === null ) {
				
				return obj + "";
			}
			// Support: Android <=2.3 only (functionish RegExp)
			return typeof obj === "object" || typeof obj === "function" ? class2type[ toString.call( obj ) ] || "object" : typeof obj;
		},
		
		isWindow: function( obj ) {
			
			if( obj && obj.window ) {
				
				return obj !== null && obj === obj.window;
			}
			return false;
		},
		
		setAttributeClass: function( elements, value, callback ) {
			
			function setClass( element ) {
				
				var clazz;
				var classes = value.match( ( rnotwhite ) ) || [];
				var curValue = ts.getClass( element );
				var cur = element.nodeType === 1 && ( " " + curValue + " " ).replace( rclass, " " );
				if( cur ) {
					
					var j = 0;
					while( ( clazz = classes[ j++ ] ) ) {
						
						if( typeof callback === "function" ) {
							
							cur = callback.call( ts, cur, clazz );
						}
					}
					// Only assign if different to avoid unneeded rendering.
					var finalValue = ts.trim( cur );
					if ( curValue !== finalValue ) {
						
						element.setAttribute( "class", finalValue );
					}
				}
			}
			if( typeof value === "string" && value ) {
				
				ts.each( elements, function( i, elem ) {
					
					setClass( elem );
				} );
			}
			return elements;
		},
		
		getClass: function( elem ) {
			
			return elem.getAttribute && elem.getAttribute( "class" ) || "";
		},
		
		addClass: function( elements, value ) {
			
			ts.setAttributeClass( elements, value, function( cur, clazz ) {
				// Add *all* instances
				if( cur.indexOf( " " + clazz + " " ) < 0 ) {
					
					cur += clazz + " ";
				}
				return cur;
			} );
		},
		
		removeClass: function( elements, value ) {
			
			ts.setAttributeClass( elements, value, function( cur, clazz ) {
				// Remove *all* instances
				while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
					
					cur = cur.replace( " " + clazz + " ", " " );
				}
				return cur;
			} );
		},
		
		trim: function( text ) {
			// Support: Android <=4.0 only
			return text === null ? "" : ( text + "" ).replace( /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "" );
		},
		
		createAnchorList: function( context, number, callback ) {
			
			var ul = global.document.createElement( "ul" );
			for( var i = number; i > 0; i-- ) {
				
				var li = global.document.createElement( "li" );
				var a = global.document.createElement( "a" );
				a.href = "javascript:void(0)";
				li.appendChild( a );
				ul.appendChild( li );
			}
			context.parentElement.appendChild( ul );
			if( typeof callback === "function" ) {
				
				callback.call( ts, ul );
			}
		},
		
		setArrows: function( context ) {
			
			ts.addClass( context, "tinySlider-arrows-container" );
			ts.setStyle( context, settings.arrowContainerStyle );
			var moveTo = 0;
			var nextElement = "";
			ts.each( ts.find( "li", context ), function( i, li ) {
				
				ts.setStyle( li, settings.arrowStyle );
				if( i%2 === 0 ) {
					
					ts.addClass( li, classies.arrowSelector + " " + classies.arrowSelector + "-prev" );
					ts.setStyle( li, { left: "0" } );
					ts.setStyle( li.childNodes, settings.prevArrowAnchorStyle );
				} else {
					
					ts.addClass( li, classies.arrowSelector + " " + classies.arrowSelector + "-next" );
					ts.setStyle( li, { right: "0" } );
					ts.setStyle( li.childNodes, settings.nextArrowAnchorStyle );
				}
				ts.on( li.childNodes, "click", function( e ) {
					
					var currentElement = ts.find( settings.indexSelector + "-current", [].concat( context.previousSibling ).concat( context.nextSibling ) );
					if( ts.getClass( e.target.parentNode ).indexOf( classies.arrowSelector + "-next" ) >= 0 ) {
						
						moveTo = 1;
						nextElement = "nextSibling";
					} else {
						
						moveTo = -1;
						nextElement = "previousSibling";
					}
					if( currentElement[ 0 ][ nextElement ] ) {
						
						ts.setStyle( currentElement[0].childNodes, settings.indexAnchorStyle );
						ts.removeClass( currentElement, classies.indexSelector + "-current" );
						ts.setStyle( currentElement[ 0 ][ nextElement ].childNodes, settings.indexCurrentAnchorStyle );
						ts.addClass( currentElement[ 0 ][ nextElement ], classies.indexSelector + "-current" );
						ts.slideTo( context, ts.index( currentElement ) + moveTo );
					}
				} );
				ts.setStyle( li.childNodes, settings.arrowAnchorStyle );
			} );
		},
		
		index: function( elem ) {
		
			function indexOf( list, elem ) {
			// Use a stripped-down indexOf as it's faster than native
			// https://jsperf.com/thor-indexof-vs-for/5
				var i = 0, len = list.length;
				for( ; i < len; i++ ) {
					
					if ( list[ i ] === elem ) {
						
						return i;
					}
				}
				return -1;
			}
			return indexOf.call( ts, ts.isArrayLike( elem ) ? elem[ 0 ].parentNode.childNodes : elem.parentNode.childNodes, ts.isArrayLike( elem ) ? elem[ 0 ] : elem );
		},
		
		setIndexes: function( context ) {
			
			ts.addClass( context, "tinySlider-index-container" );
			ts.setStyle( context, settings.indexContainerStyle );
			ts.each( ts.find( "li", context ), function( i, li ) {
				
				ts.addClass( li, classies.indexSelector );
				ts.setStyle( li, settings.indexStyle );
				ts.setStyle( li.childNodes, settings.indexAnchorStyle );
				if( i === 0 ) {
					
					ts.addClass( li, classies.indexSelector + "-current" );
					ts.setStyle( li.childNodes, settings.indexCurrentAnchorStyle );
				}
				ts.on( li.childNodes, "click", function() {
					
					var prev = ts.find( settings.indexSelector + "-current", li.parentNode );
					ts.setStyle( prev[0].childNodes, settings.indexAnchorStyle );
					ts.removeClass( prev, classies.indexSelector + "-current" );
					ts.setStyle( li.childNodes, settings.indexCurrentAnchorStyle );
					ts.addClass( li, classies.indexSelector + "-current" );
					ts.slideTo( context, i );
				} );
			} );
		},
		
		setObjectStyle: function( context, objStyle, objRule ) {
			
			if( ts.type( objStyle ) === "object" && ts.type( objRule ) === "object" ) {
				
				ts.each( objRule, function( i, rule ) {
					
					objStyle[ i ] = rule;
				} );
			}
		},
		
		setStyle: function( context, objStyle, value ) {
			
			if( ts.type( objStyle ) === "object" ) {
				// Sets many values
				for( var rule in objStyle ) {
					
					ts.setStyle( context, rule, objStyle[ rule ] );
				}
			} else if( value !== undefined ) {
				// Sets one value
				ts.each( context, function( i, elem ) {
					
					elem.style[ objStyle ] = value;
				} );
			}
		},
		
		getStyle: function( context, property ) {
			
			var y;
			if( context.currentStyle ) {
				
				y = x.currentStyle[ property ];
			} else if( global.getComputedStyle ) {
				
				y = global.document.defaultView.getComputedStyle( context, null ).getPropertyValue( property );
			}
			return y;
		},
		
		slideTo: function( context, to ) {
			
			var listContainer = ts.find( settings.listSelector, context.parentNode )[ 0 ];
			var x = context.parentNode.clientWidth * (-1) * to;
			ts.setStyle( listContainer, "transform", "translate(" + x + "px)" );
		}
	};
	// Define a local copy of tinySlider
	var tinySlider = function( selector, context ) {
		// The tinySlider object is actually just the init constructor 'enhanced'
		// Need init if tinySlider is called (just allow error to be thrown if not included)
		return new ts.init( selector, context );
	};
	global.tinySlider = tinySlider;
	
	return tinySlider;
} ) );