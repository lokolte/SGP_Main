/**
 * Created by Jesus Aguilar on 28/03/2015.
 */
(function () {
  'use strict';

  angular
    .module('managers', [
      'managers.routes',
      'managers.authentication'
    ]);

  angular
    .module('managers.routes', ['ngRoute']);
})();

angular
  .module('managers')
  .run(run);

run.$inject = ['$http'];

/**
* @name run
* @desc Update xsrf $http headers to align with Django's defaults
*/
function run($http) {
  $http.defaults.xsrfHeaderName = 'X-CSRFToken';
  $http.defaults.xsrfCookieName = 'csrftoken';
}