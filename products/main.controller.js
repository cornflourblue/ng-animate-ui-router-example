(function () {
    'use strict';

    angular
        .module('app')
        .controller('Products.MainController', Controller);

    function Controller($scope, ProductService) {
        var vm = this;

        vm.products = [];
        vm.deleteProduct = deleteProduct;

        initController();

        function initController() {
            loadProducts();

            // reload products when updated
            $scope.$on('products-updated', loadProducts);
        }

        function loadProducts() {
            vm.products = ProductService.GetAll();
        }

        function deleteProduct(id) {
            ProductService.Delete(id);
            loadProducts();
        }
    }

})();