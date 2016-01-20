(function () {
    'use strict';

    angular
        .module('app')
        .factory('ProductService', Service);

    function Service($filter) {

        var service = {};

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.Save = Save;
        service.Delete = Delete;

        return service;

        function GetAll() {
            return getProducts();
        }

        function GetById(id) {
            var filtered = $filter('filter')(getProducts(), { id: id });
            var product = filtered.length ? filtered[0] : null;

            return product;
        }

        function Save(product) {
            var products = getProducts();

            if (product.id) {
                // update existing product

                for (var i = 0; i < products.length; i++) {
                    if (products[i].id === product.id) {
                        products[i] = product;
                        break;
                    }
                }
                setProducts(products);
            } else {
                // create new product

                // assign id
                var lastProduct = products[products.length - 1] || { id: 0 };
                product.id = lastProduct.id + 1;

                // save to local storage
                products.push(product);
                setProducts(products);
            }

            return;
        }

        function Delete(id) {
            var products = getProducts();
            for (var i = 0; i < products.length; i++) {
                var product = products[i];
                if (product.id === id) {
                    products.splice(i, 1);
                    break;
                }
            }
            setProducts(products);

            return;
        }

        // private functions

        function getProducts() {
            if (!localStorage.products) {
                localStorage.products = JSON.stringify([]);
            }

            return JSON.parse(localStorage.products);
        }

        function setProducts(products) {
            localStorage.products = JSON.stringify(products);
        }
    }
})();