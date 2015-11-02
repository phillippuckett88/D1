var appMiniRouting = angular.module('miniRouting', ['ui.router']);

// add a config property onto your app variable that takes in a
// anonymous function as it's only argument.

// inject $stateProvider and $urlRouterProvider into 
// that anonymous function you just built.

appMiniRouting.config(function ($stateProvider, $urlRouterProvider) {

/*Use the state method of $stateProvider to create a state called 
home that uses homeTmpl.html as the templateUrl, homeCtrl as the 
controller and ('/') as the url.*/
	
/* use the state method of $stateProvider to create a state called 
home that uses homeTmpl.html as the templateUrl, homeCtrl as the 
controller and ('/') as the url.
chain another invocation of state to create a state called settings 
that uses settingsTmpl.html as the templateUrl, settingsCtrl as the 
controller and ('/settings') as the url.
chain another invocation of state to create another state called 
products that uses productTmpl.html as the templateUrl, productsCtrl 
as the controller and ('/products/:id') as the url. Notice that 
'products' has a /:id at the end of it. This is because we're going 
to tell our app which product the user is looking at based on which 
link they clicked. For example, if the user clicks on 
<li><a ui-sref="products({id: 'shoes'})">Shoes</a> 
then in our controller $stateParams.id (id correlating with the /:id 
from earlier) is going to be 'shoes'. This is a little bit tricky, 
ask for help if you need it.
use the otherwise method of $urlRouterProvider and pass it the 
default url ('/'), to redirect all other routes to the default.*/

	$stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'js/home/homeTmpl.html',
            controller: 'homeCtrl'
        })
        .state('settings', {
            url: '/settings',
            templateUrl: 'js/settings/settingsTmpl.html',
            controller: 'settingsCtrl'
        })
        .state('products', {
            url: '/products/:id',
            templateUrl: 'js/products/productTmpl.html',
            controller: 'productsCtrl'
        });

    $urlRouterProvider
        .otherwise('/');
});



