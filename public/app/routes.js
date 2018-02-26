angular.module("appRoutes", ['ui.router'])
  .config(function ($stateProvider, $urlRouterProvider) {
    // Redirect to home page if no other URL matches
    $urlRouterProvider.otherwise('/');

    // *** Set up UI states ***
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/views/pages/home.html'
      })
      .state('about', {
        url: '/about',
        templateUrl: 'app/views/pages/about.html'
      })
      .state('register', {
        url: '/register',
        templateUrl: 'app/views/pages/users/register.html',
        controller: 'regCtrl',
        controllerAs: 'register'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'app/views/pages/users/login.html'
      })
      .state('logout',{
        url: '/logout',
        templateUrl: 'app/views/pages/users/logout.html'
      })
      .state('profile',{
        url: '/profile',
        templateUrl: 'app/views/pages/users/profile.html'
      });

  });
