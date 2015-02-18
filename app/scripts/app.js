'use strict';

angular
  .module('starterApp', ['ngMaterial'])
  .config(function ($mdThemingProvider) {

    // Use the 'brown' theme - override default 'blue' theme

    $mdThemingProvider.theme('default')
      .primaryPalette('green')
      .accentPalette('blue');

  })
  .controller('MainCtrl', ['$scope', '$timeout', '$mdToast', function ($scope, $timeout, $mdToast) {
    $scope.sum1 = "12"
    $scope.sum2 = "2"
    $scope.operand = "x";
    $scope.answer = "?";
    $scope.countdownTimer = null;
    $scope.countdownSeconds = 0;
    $scope.score = 0;

    $scope.onTimeout = function () {
      $scope.countdownSeconds--;
      if ($scope.countdownSeconds > 0) {
        $scope.countdownTimer = $timeout($scope.onTimeout, 1000);
      }
      else {
        alert("Time is up!");
      }
    }

    $scope.onClickStart = function (nbr) {
      $scope.countdownSeconds = 120;
      if ($scope.countdownTimer)
        $timeout.cancel($scope.countdownTimer);
      $scope.countdownTimer = $timeout($scope.onTimeout, 1000);
      $scope.createSum();
      $scope.score = 0;
    }

    $scope.createSum = function () {

      $scope.sum1 = $scope.randomIntBetween(0, 12);
      $scope.sum2 = $scope.randomIntBetween(0, 12);
      var rand1 = $scope.randomIntBetween(0, 2);
      if (rand1 == 0)
        $scope.operand = "+";
      else if (rand1 == 1)
        $scope.operand = "-";
      else if (rand1 == 2)
        $scope.operand = "x";
      $scope.answer = "?";

    }


    $scope.randomIntBetween = function (min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    $scope.onClickNumber = function (nbr) {
      console.log(nbr);
      if ($scope.answer == "?")
        $scope.answer = nbr;
      else
        $scope.answer += nbr;
    }
    $scope.onClickAnswer = function () {
      $scope.checkAnswer();
      $scope.createSum();
    }

    $scope.checkAnswer = function () {
      var actual = parseInt($scope.answer);
      var expected = $scope.sum1;
      if ($scope.operand == "+")
        expected += $scope.sum2;
      else if  ($scope.operand == "-")
        expected -= $scope.sum2;
      else if  ($scope.operand == "x")
        expected *= $scope.sum2;

      console.log("actual = "+actual+", expected = "+expected);
      if (actual === expected) {
        $mdToast.show(
          $mdToast.simple()
            .content('Correct!')
            .hideDelay(1500)
        );
        $scope.score +=1;

      } else {
        $mdToast.show(
        $mdToast.simple()
          .content('Wrong!')
          .hideDelay(1500)
        );
        $scope.score -=2;
      }
    }
    $scope.onClickDelete = function (nbr) {
      if ($scope.answer.length > 1)
        $scope.answer = $scope.answer.substr(0, $scope.answer.length - 1);
      else
        $scope.answer = "?";
    }


  }]);


