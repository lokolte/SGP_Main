/**
 * Created by Jesus Aguilar on 27/03/2015.
 */
/**
* CrearUsuario controller
* @namespace managers.autentication.controllers
*/
(function () {
  'use strict';

  angular
    .module('managers.autentication.controllers')
    .controller('crearusuarioController', crearusuarioController);

  crearusuarioController.$inject = ['$location', '$scope', 'Authentication'];

  /**
  * @namespace crearusuarioController
  */
  function crearusuarioController($location, $scope, Authentication) {
    var vm = this;

    vm.register = register;

    /**
    * @name crearusuarioController
    * @desc Register a new user
    * @memberOf managers.autentication.controllers.crearusuarioController
    */

    function register() {
      Authentication.register(vm.username, vm.password,vm.email, vm.nombre, vm.apellido);
    }
  }
})();