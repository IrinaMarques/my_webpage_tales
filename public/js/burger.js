var burger = document.getElementById('burger');
var burgerMenu = document.getElementById('burger-menu');

burger.addEventListener("click", function(){
	var className = burgerMenu.className;

	if(className.indexOf('menu-mobile-open') > -1) {
		burgerMenu.className = className.replace(' menu-mobile-open', '');
		return;
	};

	burgerMenu.className+= ' menu-mobile-open';
});
