App.directive('format', ['$filter', '$parse', function ($filter, $parse) {
    return {
        require: 'ngModel',
        link: function (scope, elem, attrs, ngModel) {
            if (!ngModel) return;

            function format(value) {
                var plainNumber = value ? value.replace(/[^\d|\-+|\.+]/g, '') : '';
                return plainNumber;
            }

            function castInt(value) {
                return attrs.format === "number" ? parseInt(value) : value;
            }

            // format model value into view value
            ngModel.$formatters.unshift(function (modelValue) {
                $parse(attrs.ngModel).assign(scope, castInt(format(modelValue))); //set model value
                return $filter(attrs.format)(ngModel.$modelValue); // return view value
            });

            //format view value into model value
            ngModel.$parsers.unshift(function (viewValue) { //updates via user input
                elem.val($filter(attrs.format)(format(viewValue))); // format view value
                return castInt(format(viewValue)); // return model value
            });
        }
    };
}]);