'use strict';

var app = angular.module('confusionApp');

app.controller('menuController', ['$scope', 'menuFactory', function ($scope, menuFactory) {

    $scope.dishes = menuFactory.getDishes();

    $scope.filtText = '';

    $scope.showDetails = false;

    $scope.tab = 1; // tab index

    $scope.selectTab = function (tabIndex) {
        $scope.tab = tabIndex;

        if (tabIndex === 2) {
            $scope.filtText = "appetizer";
        } else if (tabIndex === 3) {
            $scope.filtText = "mains";
        } else if (tabIndex === 4) {
            $scope.filtText = "dessert";
        } else {
            $scope.filtText = "";
        }
    };

    $scope.isSelected = function (tabIndex) {
        return $scope.tab === tabIndex;
    };

    $scope.toggleDetails = function () {
        $scope.showDetails = !$scope.showDetails;
    };


}]);

app.controller('ContactController', ['$scope', function ($scope) {

    $scope.feedback = {
        mychannel: "",
        firstName: "",
        lastName: "",
        agree: false,
        email: ""
    };

    var channels = [{
        value: "tel",
        label: "Tel."
    }, {
        value: "Email",
        label: "Email"
    }];

    $scope.channels = channels;
    $scope.invalidChannelSelection = false;

}]);

app.controller('FeedbackController', ['$scope', function ($scope) {

    $scope.sendFeedback = function () {

        console.log($scope.feedback);

        if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
            $scope.invalidChannelSelection = true;
            console.log('incorrect');
        } else {
            $scope.invalidChannelSelection = false;
            $scope.feedback = {
                mychannel: "",
                firstName: "",
                lastName: "",
                agree: false,
                email: ""
            };
            $scope.feedback.mychannel = "";

            $scope.feedbackForm.$setPristine();
            console.log($scope.feedback);
        }
    };

}]);

app.controller('DishDetailController', ['$scope', 'menuFactory', function ($scope, menuFactory) {

    $scope.dish = menuFactory.getDish(3);

}]);

app.controller('DishCommentController', ['$scope', function ($scope) {

    //Step 1: Create a JavaScript object to hold the comment from the form
    $scope.comment = {
        rating: 5,
        author: "",
        comment: "",
        date: ""
    };

    $scope.submitComment = function () {

        $scope.comment.date = new Date()
            .toISOString();

        console.log($scope.comment);

        $scope.dish.comments.push($scope.comment);

        $scope.commentForm.$setPristine();

        $scope.comment = {
            rating: 5,
            author: "",
            comment: "",
            date: ""
        };
    }
}]);
