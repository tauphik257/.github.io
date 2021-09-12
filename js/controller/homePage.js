
app.controller('MainCtrl', ['$scope', '$interval', '$http', '$timeout', function ($scope, $interval, $http) {
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
            /** stickey header **/
            angular.element(window).scroll(function () {
                var scrollTop = angular.element(window).scrollTop();
                if (scrollTop > 0) {
                    angular.element("header").addClass("stickey");
                } else {
                    angular.element("header").removeClass("stickey");
                }
            });

            /** custom slider js **/
            if (angular.element(".customSlider ul").length > 0) {

                $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
                    var listWidth = angular.element(".customSlider_list li:first").width();
                    angular.forEach(angular.element(".customSlider_list li"), function () {
                        listWidth += angular.element(this).width();
                    });
                    angular.element(".customSlider_list li").css('width', listWidth);
                });
            }
        }, 900);
    }]);

