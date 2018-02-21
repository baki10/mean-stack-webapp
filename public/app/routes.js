angular.module("appRoutes", ['ui.router'])
  .config(function($stateProvider, $urlRouterProvider) {
    // Redirect to home page if no other URL matches
    $urlRouterProvider.otherwise('/');

    // *** Set up UI states ***
    $stateProvider
      // Home page
      .state('home', {
        url: '/',
        templateUrl: 'app/views/pages/home.html'
      })
      // about
      .state('about', {
        url: '/about',
        templateUrl: 'app/views/pages/about.html'
      });

  });
