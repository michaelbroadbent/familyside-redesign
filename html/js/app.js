// Example from here: http://websystique.com/angularjs/angularjs-routing-tutorial-using-ui-router/

const App = angular.module('fastfamilyside',['ui.router', 'credit-cards', 'ui.bootstrap']);

App.config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {
	// For any unmatched url, send to /main
	$urlRouterProvider.otherwise("/main")

	$stateProvider
	.state('instructions', {
		url: "/instructions",
		templateUrl: "/instructions/landing.html"
	})

	.state('main', {
		url: "/main",
		templateUrl: "/partials/main.html"
	})

	.state('help', {
		url: "/help",
		templateUrl: "/partials/help.html"
	})

	.state('accountSettings', {
		url: "/accountSettings",
		templateUrl: "/partials/applicationSettings.html"
	})

	.state('applicantInfo', {
		url: "/applicantInfo",
		templateUrl: "/partials/applicationInfo.html"
	})

	.state('householdInfo', {
		url: "/householdInfo",
		templateUrl: "/partials/householdInfo.html"
	})

	.state('dependentInfo', {
		url: "/dependentInfo",
		templateUrl: "/partials/dependentInfo.html"
	})

	.state('realEstateVehicles', {
		url: "/realEstateVehicles",
		templateUrl: "/partials/realEstateVehicles.html"
	})

	.state('assetsLiabilities', {
		url: "/assetsLiabilities",
		templateUrl: "/partials/assetsLiabilities.html"
	})

	.state('income', {
		url: "/income",
		templateUrl: "/partials/income.html"
	})

	.state('expenses', {
		url: "/expenses",
		templateUrl: "/partials/expenses.html"
	})

	.state('schoolQuestions', {
		url: "/schoolQuestions",
		templateUrl: "/partials/schoolQuestions.html"
	})

	.state('letterAgreement', {
		url: "/letterAgreement",
		templateUrl: "/partials/letterAgreement.html"
	})
	.state('applicationStatus', {
		url: "/applicationStatus",
		templateUrl: "/partials/applicationStatus.html"
	})
	.state('payment', {
		url: "/payment",
		templateUrl: "/partials/payment.html"
	})
	.state('postApplication', {
		url: "/postApplication",
		templateUrl: "/partials/postApplication.html"
	})
	.state('quickProcessing', {
		url: "/quickProcessing",
		templateUrl: "/quickProcessing/landing.html"
	})
		.state('quickProcessingNotFiled', {
			url: "/quickProcessing/notFiled",
			templateUrl: "/quickProcessing/notFiled.html"
		})
		.state('quickProcessingTaxesStep1', {
			url: "/quickProcessing/taxesStep1",
			templateUrl: "/quickProcessing/taxesStep1.html"
		})
		.state('quickProcessingTaxesStep2', {
			url: "/quickProcessing/taxesStep2",
			templateUrl: "/quickProcessing/taxesStep2.html"
		})
		.state('quickProcessingTaxesStep3', {
			url: "/quickProcessing/taxesStep3",
			templateUrl: "/quickProcessing/taxesStep3.html"
		})
		.state('quickProcessingTaxesStep3a', {
			url: "/quickProcessing/taxesStep3a",
			templateUrl: "/quickProcessing/taxesStep3a.html"
		})
		.state('quickProcessingTaxesStep4', {
			url: "/quickProcessing/taxesStep4",
			templateUrl: "/quickProcessing/taxesStep4.html"
		})
		.state('quickProcessingTaxesStep5', {
			url: "/quickProcessing/taxesStep5",
			templateUrl: "/quickProcessing/taxesStep5.html"
		})

		.state('formSetup', {
			url: "/instructions/formSetup1",
			templateUrl: "/instructions/formSetup1.html"
		})
		.state('formSetup2', {
			url: "/instructions/formSetup2",
			templateUrl: "/instructions/formSetup2.html"
		})
		.state('formSetup2a', {
			url: "/instructions/formSetup2a",
			templateUrl: "/instructions/formSetup2a.html"
		})
		.state('formSetup3', {
			url: "/instructions/formSetup3",
			templateUrl: "/instructions/formSetup3.html"
		})
		.state('formSetup3a', {
			url: "/instructions/formSetup3a",
			templateUrl: "/instructions/formSetup3a.html"
		})
		.state('formSetup3b', {
			url: "/instructions/formSetup3b",
			templateUrl: "/instructions/formSetup3b.html"
		})
		.state('formSetup4', {
			url: "/instructions/formSetup4",
			templateUrl: "/instructions/formSetup4.html"
		})
		.state('formSetup4a', {
			url: "/instructions/formSetup4a",
			templateUrl: "/instructions/formSetup4a.html"
		})
}]);

App.controller('formSetup', ($scope) => {
	$scope.applicationSetup = "applicationSetupYes";
});
