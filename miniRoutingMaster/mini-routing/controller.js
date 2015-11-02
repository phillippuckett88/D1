angular.module('miniRouting')

/* So we know that in our controller, $stateParams.id (because of :/id in our router) 
will be either 'socks' or 'shoes' depending on which page the user is in. With this knowledge, 
we can add a simple 'if' statement to check which product page the user is on.
In your products controller, inject $stateParams and productService into your controller.
Now write an if statement, if $stateParams.id is equal to 'shoes', then $scope.productData should 
be set to productService.shoeData. If $stateParams.id is equal to 'socks', then $scope.productData 
should be set to productService.sockData.
Now we know that we have data on the scope equal to certain product data, depending on which product 
the user is looking at.
Your productCtrl.js should now look like this: (Note: Please don't just copy and paste. 
Try to really understand what's going on.) */

appMiniRouting.controller('productsCtrl', function ($scope, $stateParams, productService) {
    if ($stateParams.id === 'shoes') {
        $scope.productData = productService.shoeData;
    }
    else if ($stateParams.id === 'socks') {
        $scope.productData = productService.sockData;
    }
});
