/**
 * Created by Jesus Aguilar on 28/03/2015.
 */
(function () {
  'use strict';

  angular
    .module('managers.config')
    .config(config);

  config.$inject = ['$locationProvider'];

  /**
  * @name config
  * @desc Enable HTML5 routing
  */
  function config($locationProvider) {
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
  }
})();