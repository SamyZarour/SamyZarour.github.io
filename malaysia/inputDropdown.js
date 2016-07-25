angular.module('ui.bootstrap.demo', []).directive('ui.bootstrap.demo', [function() {
  var templateString =
  '<div class="input-dropdown">' +
    '<input type="text"' +
           'name="{{inputName}}"' +
           'placeholder="{{inputPlaceholder}}"' +
           'ng-model="inputValue"' +
           'ng-required="inputRequired"' +
           'ng-change="inputChange()"' +
           'ng-focus="inputFocus()"' +
           'ng-blur="inputBlur($event)"' +
           'input-dropdown-validator>' +
     '<ul ng-show="dropdownVisible">' +
      '<li ng-repeat="item in dropdownItems"' +
          'ng-click="selectItem(item)"' +
          'ng-mouseenter="setActive($index)"' +
          'ng-mousedown="dropdownPressed()"' +
          'ng-class="{\'active\': activeItemIndex === $index}"' +
          '>' +
        '<span ng-if="item.readableName">{{item.readableName}}</span>' +
        '<span ng-if="!item.readableName">{{item}}</span>' +
      '</li>' +
    '</ul>' +
  '</div>';

  return {
    restrict: 'E',
    scope: {
      defaultDropdownItems: '=',
      selectedItem: '=',
      inputRequired: '=',
      inputName: '@',
      inputPlaceholder: '@',
      filterListMethod: '&',
      itemSelectedMethod: '&'
    },
    template: templateString,
    controller: function($scope) {
      this.getSelectedItem = function() {
        return $scope.selectedItem;
      };
      this.isRequired = function() {
        return $scope.inputRequired;
      };
    },
    link: function(scope, element) {
      var pressedDropdown = false;
      var inputScope = element.find('input').isolateScope();

      scope.activeItemIndex = 0;
      scope.inputValue = '';
      scope.dropdownVisible = false;
      scope.dropdownItems = scope.defaultDropdownItems || [];

      scope.$watch('dropdownItems', function(newValue, oldValue) {
        if (!angular.equals(newValue, oldValue)) {
          // If new dropdownItems were retrieved, reset active item
          scope.setActive(0);
        }
      });

      scope.$watch('selectedItem', function(newValue, oldValue) {
        inputScope.updateInputValidity();

        if (!angular.equals(newValue, oldValue)) {
          if (newValue) {
            // Update value in input field to match readableName of selected item
            if (typeof newValue === 'string') {
              scope.inputValue = newValue;
            }
            else {
              scope.inputValue = newValue.readableName;
            }
          }
          else {
            // Uncomment to clear input field when editing it after making a selection
            // scope.inputValue = '';
          }
        }
      });

      scope.setActive = function(itemIndex) {
        scope.activeItemIndex = itemIndex;
      };

      scope.inputChange = function() {
        scope.selectedItem = null;
        showDropdown();

        if (!scope.inputValue) {
          scope.dropdownItems = scope.defaultDropdownItems || [];
          return;
        }

        if (scope.filterListMethod) {
          var promise = scope.filterListMethod({userInput: scope.inputValue});
          if (promise) {
            promise.then(function(dropdownItems) {
              scope.dropdownItems = dropdownItems;
            });
          }
        }
      };

      scope.inputFocus = function() {
        scope.setActive(0);
        showDropdown();
      };

      scope.inputBlur = function(event) {
        if (pressedDropdown) {
          // Blur event is triggered before click event, which means a click on a dropdown item wont be triggered if we hide the dropdown list here.
          pressedDropdown = false;
          return;
        }
        hideDropdown();
      };

      scope.dropdownPressed = function() {
        pressedDropdown = true;
      }

      scope.selectItem = function(item) {
        scope.selectedItem = item;
        hideDropdown();
        scope.dropdownItems = [item];

        if (scope.itemSelectedMethod) {
          scope.itemSelectedMethod({item: item});
        }
      };

      var showDropdown = function () {
        scope.dropdownVisible = true;
      };
      var hideDropdown = function() {
        scope.dropdownVisible = false;
      }

      var selectPreviousItem = function() {
        var prevIndex = scope.activeItemIndex - 1;
        if (prevIndex >= 0) {
          scope.setActive(prevIndex);
        }
      };

      var selectNextItem = function() {
        var nextIndex = scope.activeItemIndex + 1;
        if (nextIndex < scope.dropdownItems.length) {
          scope.setActive(nextIndex);
        }
      };

      var selectActiveItem = function()  {
        if (scope.activeItemIndex >= 0 && scope.activeItemIndex < scope.dropdownItems.length) {
          scope.selectItem(scope.dropdownItems[scope.activeItemIndex]);
        }
      };

      element.bind("keydown keypress", function (event) {
        switch (event.which) {
          case 38: //up
            scope.$apply(selectPreviousItem);
            break;
          case 40: //down
            scope.$apply(selectNextItem);
            break;
          case 13: // return
            if (scope.dropdownVisible && scope.dropdownItems && scope.dropdownItems.length > 0) {
              // only preventDefault when there is a list so that we can submit form with return key after a selection is made
              event.preventDefault();
              scope.$apply(selectActiveItem);
            }
            break;
        }
      });
    }
  }
}]);

angular.module('ui.bootstrap.demo').directive('inputDropdownValidator', function() {
  return {
    require: ['^ui.bootstrap.demo', 'ngModel'],
    restrict: 'A',
    scope: {},
    link: function(scope, element, attrs, ctrls) {
      var inputDropdownCtrl = ctrls[0];
      var ngModelCtrl = ctrls[1];
      var validatorName = 'itemSelectedValid';

      scope.updateInputValidity = function() {
        var selection = inputDropdownCtrl.getSelectedItem();
        if (selection || !inputDropdownCtrl.isRequired()) {
          ngModelCtrl.$setValidity(validatorName, true);
        }
        else {
          ngModelCtrl.$setValidity(validatorName, false);
        }
      };
    }
  };
});

// Add 'inputDropdown' as a dependency when creating angular app
var demoApp = angular.module('inputDropdownDemo', ['ui.bootstrap.demo']);

demoApp.controller('InputDropdownController', [
  '$scope',
  '$q',
  function($scope, $q) {
    var self = this;

    self.stringMessage = '';
    self.objectMessage = '';

    self.countryString = null; // Holds the selected in demoFormStrings, set with attribute 'selected-item'
    self.countryObject = null; // Holds the selected in demoFormObjects, set with attribute 'selected-item'

    // Pass strings to the dropdown for simple usage
    self.defaultDropdownStrings = [
      'China',
      'Sweden',
      'United Kingdom',
      'United States'
    ];

    // Use objects in the dropdown list if more data than just a string is needed.
    // Every object needs to have a property 'readableName', this is what will be displayed in the dropdown.
    self.defaultDropdownObjects = [{
      readableName: 'China',
      countryCode: 'CH',
      id: 0,
      toString: function() {
        return '{readableName: ' + this.readableName + ', countryCode: ' + this.countryCode + ', id: ' + this.id + '}';
      }
    }, {
      readableName: 'Sweden',
      countryCode: 'SE',
      id: 1,
      toString: function() {
        return '{readableName: ' + this.readableName + ', countryCode: ' + this.countryCode + ', id: ' + this.id + '}';
      }
    }, {
      readableName: 'United Kingdom',
      countryCode: 'UK',
      id: 2,
      toString: function() {
        return '{readableName: ' + this.readableName + ', countryCode: ' + this.countryCode + ', id: ' + this.id + '}';
      }
    }, {
      readableName: 'United States',
      countryCode: 'US',
      id: 3,
      toString: function() {
        return '{readableName: ' + this.readableName + ', countryCode: ' + this.countryCode + ', id: ' + this.id + '}';
      }
    }];


    // Filter method is passed with attribute 'filter-list-method="method(userInput)"'.
    // Called on the onchange event from the input field. Should return a promise resolving with an array of items to show in the dropdown.
    // If no filter method is passed to the the directive, the default dropdown will show constantly.
    self.filterStringList = function(userInput) {
      var filter = $q.defer();
      var normalisedInput = userInput.toLowerCase();

      var filteredArray = self.defaultDropdownStrings.filter(function(country) {
        return country.toLowerCase().indexOf(normalisedInput) === 0;
      });

      filter.resolve(filteredArray);
      return filter.promise;
    };

    self.filterObjectList = function(userInput) {
      var filter = $q.defer();
      var normalisedInput = userInput.toLowerCase();

      var filteredArray = self.defaultDropdownObjects.filter(function(country) {
        var matchCountryName = country.readableName.toLowerCase().indexOf(normalisedInput) === 0;
        var matchCountryCode = country.countryCode.toLowerCase().indexOf(normalisedInput) === 0;
        return matchCountryName || matchCountryCode;
      });

      filter.resolve(filteredArray);
      return filter.promise;
    };


    // Called when user selected an item from dropdown. Passed with attribute 'item-selected-method="method(item)"'.
    self.itemStringSelected = function(item) {
      console.log('Handle item string selected in controller:', item);
      self.stringMessage = 'String item selected: ' + item;
    };

    self.itemObjectSelected = function(item) {
      console.log('Handle item object selected in controller:', item);
      self.objectMessage = 'Object item selected: ' + item;
    };


    self.submitFormStrings = function() {
      if ($scope.demoFormStrings.$valid) {
        console.log('Submit form STRINGS with country:', self.countryString);
        self.stringMessage = 'Submit form STRINGS with country: ' + self.countryString;
      }
    };

    self.submitFormObjects = function() {
      if ($scope.demoFormObjects.$valid) {
        console.log('Submit form OBJECTS with country:', self.countryObject);
        self.objectMessage = 'Submit form OBJECT with country: ' + self.countryObject;
      }
    };

  }
]);