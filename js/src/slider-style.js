/*
 * Tiny Slider Styles PACKAGED  1.0
*/
var styles = {
	
	containerStyle: { "position": "relative", "margin": "auto", "overflow": "hidden" },
	
	listStyle: { "display": "inline-block", "list-style-type": "none", "margin": "0", "padding": "0", "transition": "transform 1s cubic-bezier(0, 0, 0, 1.17) 0s" },
	
	itemStyle: { "float": "left" },
	
	arrowContainerStyle: { "position": "absolute", "width": "100%", "height": "100%", "top": "0", "left": "0", "list-style-type": "none", "margin": 0, "padding": 0, "pointer-events": "none" },
	
	arrowStyle: { "position": "absolute", "width": "10%", "min-width": "40px", "height": "100%", "top": "0" },
	
	arrowAnchorStyle: { "display": "inline-block", "width": "100%", "height": "100%", "pointer-events": "all", "text-decoration": "none", "color": "inherit" },
	
	prevArrowAnchorStyle: { "background": "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"100%\" viewBox=\"0 0 50 80\" xml:space=\"preserve\"><polyline fill=\"none\" stroke=\"#666\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\" points=\"45.63,75.8 0.375,38.087 45.63,0.375\"/></svg>') no-repeat center center / 60%" },
	
	nextArrowAnchorStyle: { "background": "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"100%\" viewBox=\"0 0 50 80\" xml:space=\"preserve\"><polyline fill=\"none\" stroke=\"#666\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\" points=\"0.375,0.375 45.63,38.087 0.375,75.8\"/></svg>') no-repeat center center / 60%" },
	
	indexContainerStyle: { "position": "absolute", "width": "100%", "height": "10%", "min-height": "40px", "bottom": "0", "left": "0", "list-style-type": "none", "margin": 0, "padding": 0, "pointer-events": "none", "text-align": "center" },
	
	indexStyle: { "position": "relative", "transform": "translateY(-50%)", "display": "inline-block", "width": "40px", "height": "40px", "top": "50%" },
	
	indexAnchorStyle: { "display": "inline-block", "width": "100%", "height": "100%", "pointer-events": "all", "text-decoration": "none", "color": "inherit", "background": "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"100%\"><circle fill=\"none\" stroke=\"#999\" cx=\"50%\" cy=\"50%\" r=\"16%\" /></svg>') no-repeat center center / 100%" },

	indexCurrentAnchorStyle: { "background": "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"100%\"><circle fill=\"#999\" stroke=\"#999\" cx=\"50%\" cy=\"50%\" r=\"16%\" /></svg>')" }
};