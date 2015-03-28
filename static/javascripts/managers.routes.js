/**
 * Created by Jesus Aguilar on 27/03/2015.
 */
(function () {
  'use strict';

  angular
    .module('managers.routes')
    .config(config);

  config.$inject = ['$routeProvider'];

  /**
  * @name config
  * @desc Define valid application routes
  */

  function config($routeProvider) {
    $routeProvider.when('/crearusuario', {
       controller: 'crearusuarioController',
       controllerAs: 'vm',
       templateUrl: '/templates/autentication/crearUsuario.html'
  }).when('/login', {
       controller: 'LoginController',
       controllerAs: 'vm',
       templateUrl: '/templates/autentication/login.html'
  }).otherwise('/');
  }
})();


