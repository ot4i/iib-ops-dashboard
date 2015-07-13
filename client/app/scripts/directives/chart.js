
/*
Copyright 2015 IBM Corporation 
Author Razvan Ilin
 
  All rights reserved. This program and the accompanying materials
  are made available under the terms of the MIT License
  which accompanies this distribution, and is available at
  http://opensource.org/licenses/MIT
 
  Contributors:
      Razvan Ilin - initial implementation 
*/


angular.module('iibHeatMapApp')
    .directive('chart', function($parse, $window, $timeout, Charts) {
        return {
            restrict: 'A',
            scope: {
                datajson: '=',
                chartType: '=',
                getResources: '&getResources'
            },
            link: function(scope, elem, attrs, Ctrl) {

                /* Callback used to get the properties of the clicked elements
                 * This is called on the D3 click event
                 */
                var getResources = function(inodeId, iserver, application, messageflow, type, name) {
                    scope.getResources({
                        inodeId: inodeId,
                        iserver: iserver,
                        application: application,
                        messageflow: messageflow,
                        type: type,
                        name: name
                    });
                };

                // instantiate a new chart depending on the type specified in the template
                var circleChart = Charts[scope.chartType];


                circleChart.initialise(scope.datajson);
                var svg = circleChart.generateGraph(getResources);
                svg = angular.element(svg);

            }
        }
    });