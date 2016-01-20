(function () {
    'use strict';

    angular
        .module('app')
        .controller('Products.AddEditController', Controller);

    function Controller($scope, $state, $stateParams, ProductService) {
        var vm = this;

        vm.title = 'Add Product';
        vm.product = {};
        vm.saveProduct = saveProduct;

        initController();

        function initController() {
            if ($stateParams.id) {
                vm.title = 'Edit Product';
                vm.product = ProductService.GetById($stateParams.id);
            }
        }

        function saveProduct() {
            console.log('vm.product', vm.product);
            // save product
            ProductService.Save(vm.product);

            // redirect to users view
            $state.go('products');

            // emit event so list controller can refresh
            $scope.$emit('products-updated');
        }
    }

})();