(function () {
    'use strict';

    angular
        .module('app', ['ui.router', 'ngAnimate'])
        .config(config)
        .run(run);

    function config($stateProvider, $urlRouterProvider) {
        // default route
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('overview', {
                url: '/',
                templateUrl: 'overview/main.html',
                controller: 'Overview.MainController',
                controllerAs: 'vm'
            })
            .state('products', {
                url: '/products',
                templateUrl: 'products/main.html',
                controller: 'Products.MainController',
                controllerAs: 'vm'
            })
                .state('products.add', {
                    url: '/add',
                    templateUrl: 'products/add-edit.html',
                    controller: 'Products.AddEditController',
                    controllerAs: 'vm'
                })
                .state('products.edit', {
                    url: '/edit/:id',
                    templateUrl: 'products/add-edit.html',
                    controller: 'Products.AddEditController',
                    controllerAs: 'vm'
                });
    }

    function run($rootScope, ProductService) {
        // add some initial products
        if (ProductService.GetAll().length === 0) {
            ProductService.Save({ name: 'Boardies', price: '25.00' });
            ProductService.Save({ name: 'Singlet', price: '9.50' });
            ProductService.Save({ name: 'Thongs (Flip Flops)', price: '12.95' });
        }

        // track current state for active tab
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            $rootScope.currentState = toState.name;
        });
    }

})();