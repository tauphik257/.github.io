var app = angular.module('myApp', ["ngRoute"]);

app.config(function ($routeProvider) {
    $routeProvider
            .when("/", {
                templateUrl: "templates/home.html",
                controller: "MainCtrl"
            })
            .when("/contact", {
                templateUrl: "templates/contact.html",
                controller: "ContactCtrl"
            })
            .when("/about", {
                templateUrl: "templates/about.html",
                controller: "AboutCtrl"
            })
            .when("/portfolio", {
                templateUrl: "templates/portfolio.html",
                controller: "PortCtrl"
            });
            
});

/*************************** Header CONTROLLER START HERE **********************/

app.controller('HeaderCrtl', ['$scope', '$timeout', function ($scope, $timeout) {
    $timeout(function () { 
         /** stickey header **/
        angular.element(window).scroll(function () {
            var scrollTop = angular.element(window).scrollTop();
            if (scrollTop > 0) {
                angular.element("header").addClass("stickey");
            } else {
                angular.element("header").removeClass("stickey");
            }
        });
        angular.element(".navDropDown li a").on('click',function(){
            angular.element('.fixed-action-btn').closeFAB();
        });
    }, 500);
}]);


/*************************** HOME PAGE CONTROLLER START HERE **********************/

app.controller('MainCtrl', ['$scope', '$interval', '$http', '$timeout','$rootScope', function ($scope, $interval, $http, $timeout, $rootScope) {
        $rootScope.bodylayout = 'HomePage';
        $rootScope.CurrentPage = "Home Page";
        
        /** banner Zoom Text **/
        function zoomText() {
            var zoomindex = angular.element(".bannerContent h2 label.zoomText").index();
            var lastIndex = angular.element(".bannerContent h2 label").length;
            var zoomtxt = angular.element(".bannerContent h2 label.zoomText");
            if (lastIndex == zoomindex + 1) {
                angular.element(".bannerContent h2 label").removeClass("zoomText");
                angular.element(".bannerContent h2 label:first").addClass("zoomText");
            } else {
                zoomtxt.next('label').addClass('zoomText');
                zoomtxt.removeClass('zoomText');
            }
        }
        $interval(zoomText, 1000);
         /** custom slider **/
        $http.get("js/json/home.json")
            .then(function (response) {
                $scope.sliderData = response.data.Slider;
            }, function (response) {
                //Second function handles error
                $scope.content = "Something went wrong";
        });
        $timeout(function () {
                       
            $('.owl-carousel').owlCarousel({
                loop:true,
                margin:10,
                responsiveClass:true,
                nav:false,
                responsive:{
                    320:{
                        items:1
                    },
                    360:{
                        items:1
                    },
                    480:{
                        items:2
                        
                    },
                    640:{
                        items:2
                        
                    },
                    1100:{
                        items:3
                    }
                }
            });
            
        }, 500);
    }]);

/*************************** HOME PAGE CONTROLLER END HERE **********************/

/*************************** ABOUT PAGE CONTROLLER START HERE **********************/

app.controller('AboutCtrl', ['$scope', '$http','$rootScope', function ($scope, $http, $rootScope) {
    $rootScope.bodylayout = 'AboutPage';
    $rootScope.CurrentPage = "About Page";
    $('.collapsible').collapsible();
    /** About page json **/
    
    $http.get("js/json/about.json")
        .then(function (response) {
            $scope.aboutPage = response.data.AboutPage;
            
        }, function (response) {
            //Second function handles error
            $scope.content = "Something went wrong";
    });
}]);

/*************************** ABOUT PAGE CONTROLLER END HERE **********************/

/*************************** CONTACT PAGE CONTROLLER START HERE **********************/

app.controller('ContactCtrl', ['$scope','$rootScope', function ($scope, $rootScope) {
    $rootScope.bodylayout = 'ContactPage';
    $rootScope.CurrentPage = "Contact Page";
    
    /** form validation **/
    angular.element(".ContactForm form input").on('blur', function(){
        if(angular.element(this).val() == ''){
            angular.element(this).addClass("invalid");
        }
        angular.element("#textAria").on('focus',function(){
            if(angular.element(".ContactForm form input.invalid").length == 0){
                angular.element(".ContactForm button.btnLink").attr('type', 'submit');
            }
        });
    });
    
        
}]);

/*************************** CONTACT PAGE CONTROLLER END HERE **********************/

/*************************** PORTFOLIO PAGE CONTROLLER START HERE **********************/

app.controller('PortCtrl', ['$scope','$rootScope','$http', function ($scope, $rootScope, $http) {
    $rootScope.bodylayout = 'PortfolioPage';
    $rootScope.CurrentPage = "Portfolio Page";
    
    $http.get("js/json/portfolio.json")
        .then(function (response) {
            $scope.PortfolioData = response.data.PortfolioPage;
            
        }, function (response) {
            //Second function handles error
            $scope.content = "Something went wrong";
    });
}]);


/*************************** PORTFOLIO PAGE CONTROLLER END HERE **********************/
