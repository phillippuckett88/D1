var app = angular.module('nbaRoutes');


//app.service('teamService', function ($http, $q) {
 
 // newcode below 
 
// StEP 2: Configure our teamService.js file //

/*This app is going to be very dependent on using resolve in the router. 
As we talked about during the lecture, resolve will call a method in our service, 
wait for that method's promise to be resolved, then make the data being 
returned from that service's method available immediately in our controller. */

// 1 //  
/*In your teamService.js file make a method called addNewGame:. 
This method is going to take in a gameObject as the parameter. 
That gameObj will eventually have data about each individual game 
that we'll send to parse.*/
   
//    this.addNewGame = function (gameObj) {

// a //   
/*In the addNewGame method create a variable called url and set it equal to 
'https://api.parse.com/1/classes/' + gameObj.homeTeam;. Notice each team's 
games are going to be stored at a RESTful endpoint which points to the 
teams specific name (gameObj.homeTeam).*/

    //    var url = 'https://api.parse.com/1/classes/' + gameObj.homeTeam;
       
// b //       
/*After creating the url variable, make an if statement that is going to check 
to see if the home team score (gameObj.homeTeamScore) is greater than the 
opponents core (gameObj.opponentScore). If it is, set a property called 
'won' on the gameObj to true. If it is not, (or if the home team lost), 
set that win property on the gameObj to false. One gotcha here is that 
gameObj.homeTeamScore and gameObj.opponentScore are both strings, you'll 
need to make them integers before you compare them. To do that, use the parseInt method. 
parseInt("7") will return 7 the integer.*/

    //    if (parseInt(gameObj.homeTeamScore) > parseInt(gameObj.opponentScore)) {
    //        gameObj.won = true;
    //    } else { 
    //        gameObj.won = false;
// c //           
/*Under your if statement, we're going make a POST request to parse adding 
the gameObj to our URL we made earlier. So, return the result of making an 
$http request with the 'method' of 'POST', the 'url' being the URL variable 
we made earlier, and 'data' being our gameObj.*/
           
//             return $http.post(url, gameObj);
//       }
//   };

// 2 //   
/*Now that our service has an addNewGame method, let's make a getTeamData: 
method which is going to accept a team parameter and fetch the data of that 
specific team. Create it and have it accept a parameter named team. */
   
//    this.getTeamData = function (team) {
    
// a //       
/*Create a deferred object using $q.defer(); then at the bottom of that 
function return that promise object (deferred.promise) */

    //    var deferred = $q.defer();
    
// b //       
/*Create a variable called url which will be set to 
'https://api.parse.com/1/classes/' + team;*/
       
    //    var url = 'https://api.parse.com/1/classes/' + team;
    
// c //      
/*Now, make a 'GET' request using $http to the url of the variable we just made.*/
       
    //    $http.get(url).then(function (data) {
           
// 3 //       
/*We're not going to return that object but instead we're going to modify the 
data we got back from that request before we resolve our own promise we made earlier. 
So add a .then to the end of the $http request and give .then a function that accepts 
'data' as the parameter. Remember, data will be the actual data we get back from parse 
when we make a GET request to the specified URL we made earlier. */    
   
// a //
/*Inside the .then function, make a variable called results and set it equal to data.data.results, 
which is the actual games the team has played. */    
        
        //    var results = data.data.results;
           
// b //
/*Create two variables, one called wins and one called losses and set them both equal to 0. */ 
          
        //    var wins = 0, losses = 0;
           
// c //
/*Loop over results (which is an array of game objects) and check the .won property 
on each object in the results array, if the .won property is true, increment wins by 1. 
If .won is not true, increment losses by 1. Now what we've done is gone through all of 
the games and we now know how many wins and losses that team has. */   
        
        //    for (var i in results) {
        //        if (results[i].won) wins++;
        //        else losses++;
        //    }

// d //
/*Now that we have complete wins and losses variables, we need to somehow access 
those variables outside of our service. We know that we have a results array which 
holds an array of all the games the particular team has played. What if we do something 
a little unconventional here. We know we're going to eventually resolve our promise 
we made earlier with the results variable (so we can access all the games in our controller). 
We also know that an array is really just an object at heart. Let's add a 'wins' property 
to the results array and set it equal to our wins variable and let's also set a 'losses' 
property on our results array and set it equal to our losses variable. I know this is a 
little weird because we're not adding items to our array like we usually do but instead 
we're adding properties to this array. It's a good reminder that arrays are just objects. 
Once you add the wins and losses property, go ahead and resolve our deferred object 
we made earlier with our results array. */           
           
    //        results.wins = wins;
    //        results.losses = losses;
    //        deferred.resolve(results);
    //    });
       
// e //
/*Make sure that our getTeamData method has a return! Because we are modifying the data 
we receive from api.parse.com before resolving it, we will need to return the promise on 
the deferred object rather than returning the $http call like we did in our addNewGame method. */     
  
//        return deferred.promise;
//    };
   // newcode above

/*Now that we've set up those two methods on our teamService object, 
we can close teamService. We won't need to modify this file again but we 
will need to call the methods we set up in teamService.js later. */

// });

app.service('teamService', function ($http, $q) { 
   this.addNewGame = function (gameObj) {
       var url = 'https://api.parse.com/1/classes/' + gameObj.homeTeam;
       if (parseInt(gameObj.homeTeamScore) > parseInt(gameObj.opponentScore)) {
           gameObj.won = true;
       } else { 
           gameObj.won = false;
       }
            return $http.post(url, gameObj);
   };
   this.getTeamData = function (team) {
       var deferred = $q.defer();  
       var url = 'https://api.parse.com/1/classes/' + team;
   
       $http.get(url).then(function (data) {
           var results = data.data.results;
           var wins = 0, losses = 0;
           for (var i in results) {
               if (results[i].won) wins++;
               else losses++;
           }
           results.wins = wins;
           results.losses = losses;
           deferred.resolve(results);
       });
       return deferred.promise;
   };
});

