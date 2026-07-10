/**
 * NewStone off-canvas navigation.
 *
 * Toggles a left-to-right slide-out drawer (#the_menu) via the hamburger
 * button (#menu-toggle) on small screens. Dependency-free; degrades to the
 * static menu when JavaScript is unavailable.
 */
( function () {
	'use strict';

	var BREAKPOINT = 992; // keep in sync with $bp-lg in scss/_variables.scss
	var OPEN_CLASS = 'menu-open';

	function ready( fn ) {
		if ( document.readyState !== 'loading' ) {
			fn();
		} else {
			document.addEventListener( 'DOMContentLoaded', fn );
		}
	}

	ready( function () {
		var toggle = document.getElementById( 'menu-toggle' );
		var menu = document.getElementById( 'the_menu' );

		if ( ! toggle || ! menu ) {
			return;
		}

		// Backdrop behind the drawer; created here so no-JS pages stay clean.
		var overlay = document.createElement( 'div' );
		overlay.id = 'menu-overlay';
		document.body.appendChild( overlay );

		function isOpen() {
			return document.body.classList.contains( OPEN_CLASS );
		}

		function open() {
			document.body.classList.add( OPEN_CLASS );
			toggle.setAttribute( 'aria-expanded', 'true' );
		}

		function close() {
			document.body.classList.remove( OPEN_CLASS );
			toggle.setAttribute( 'aria-expanded', 'false' );
		}

		toggle.addEventListener( 'click', function () {
			if ( isOpen() ) {
				close();
			} else {
				open();
			}
		} );

		overlay.addEventListener( 'click', close );

		// Close after tapping a real link (lets the navigation happen).
		menu.addEventListener( 'click', function ( event ) {
			var link = event.target.closest ? event.target.closest( 'a' ) : null;
			if ( link ) {
				close();
			}
		} );

		// Escape closes the drawer for keyboard users.
		document.addEventListener( 'keydown', function ( event ) {
			if ( ( event.key === 'Escape' || event.keyCode === 27 ) && isOpen() ) {
				close();
				toggle.focus();
			}
		} );

		// Reset state when resizing back up to the desktop layout.
		var resizeTimer;
		window.addEventListener( 'resize', function () {
			clearTimeout( resizeTimer );
			resizeTimer = setTimeout( function () {
				if ( window.innerWidth > BREAKPOINT && isOpen() ) {
					close();
				}
			}, 150 );
		} );
	} );
}() );
