var app = angular.module('nbaRoutes', ['ui.router']);

app.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

    $httpProvider.interceptors.push('httpRequestInterceptor');

    $urlRouterProvider.otherwise('/');
    
    
    // routing configuration code

// STEP 3: Start to Configure the Router //

/*As I mentioned in step 1, setting up the router is perhaps the most 
important part of this entire application. Our router is going to decide 
which template and controller get used based on what URL we're currently on. */

// 1 //
/*Open up your app.js file. Create a state called 'home' in your router, 
so that whenever the user is at the index page '/', the templateUrl will 
be js/home/homeTmpl.html and the controller 'homeCtrl'. We will complete 
the rest of this route a little later. */

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'js/home/homeTmpl.html',
            controller: 'homeCtrl'
        })

// a //
/*Now we're going to set up the individual team's routes. 
It's important to understand that all three teams (Jazz, Lakers, Heat) 
are going to be using the same Controller and the same Template. */    

        .state('teams', {
            url: '/teams/:team',
       
// b //
/*Take note of the /:team that's in the URL. Remember, that makes it so your 
application is able to keep track of certain states based on which team is located in the URL. 
For example, when the user visits yoursite.com/teams/utahjazz, in our controller 
$stateParams.team is going to be equal to 'utahjazz'. This allows us to then pass 
in the specific team into our getTeamData method that's on our service and get only that teams data. 
Also note that the menu in our index.html page has links that point to the different teams 
(which will be caught by :team in our router). */ 

            templateUrl: 'js/teams/teamTmpl.html',
            controller: 'teamCtrl',

// c //
/*Now that our templateUrl and our controller are set up for the /teams/:team url, 
we want to have some data ready for us before that route loads. In this case, 
that data we want available in our controller is the specific teams data. Below where we specify the controller, 
create a resolve block with the key being resolve: and the value being an object. */

            resolve: {
               
// i //
/*The resolve object is going to have a method called teamData: which returns the promise 
that gets returned from teamService.getTeamData(). To be able to use the method getTeamData, 
we need to inject teamService into the teamData: method by adding it as a parameter. 
That was really wordy I know. Look up the syntax for how resolve works. What's going to happen 
is we're going to call the getTeamData method on our teamService service. That will return a 
promise which will then be resolved and the data we get back from that promise will then be 
available to us in our controller as teamData, so head over to your teamCtrl.js file and add 
teamData as a parameter which is passed into your controller. */  

// ii //
/*You might have noticed that we're calling the getTeamData method on our teamService service 
but that method requires a parameter which should be the specific team whose data we want, 
ie utahjazz, miamiheat, or losangeleslakers. Remember, we know which team's data we want to get 
based on the :team parameter in our route. We get access to that variable in our resolve block 
by using $routeParams.team. So now go ahead and inject $routeParams into the teamData: method, 
and pass $routeParams.team as the argument in the teamService.getTeamData() call. */
             
                teamData: function (teamService, $stateParams) {
                    return teamService.getTeamData($stateParams.team)
                }
            }
        })
        
// 2 //
/*Let's make one last change to the router for now. Add a $urlRouterProvider.otherwise('/'); 
block so that the router will redirect to the index page if the route the user types in is not recognized. */

    $urlRouterProvider.otherwise('/'); 

// routing configuration code
});
