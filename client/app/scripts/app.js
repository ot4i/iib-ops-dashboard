'use strict';

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


/**
 * @ngdoc overview
 * @name iibHeatMapApp
 * @description
 * # iibHeatMapApp
 *
 * Main module of the application.
 */
angular
    .module('iibHeatMapApp', [
        'ngResource',
        'ngRoute',
        'ngAnimate',
        'restangular',
        'ui.bootstrap',
        'toggle-switch',
        'ng-autofocus',
        'ui.bootstrap.dropdown',
        'ui.bootstrap.tpls',
        'iibWidgets'
    ])
    .constant("CONFIG", {
        "API_HOST": "http://localhost:8080",
        "TOPOLOGY": "http://localhost:8080/apiv0/inode/topology",
        "API_ROUTE": "apiv0"
    })
    .config(function($routeProvider, RestangularProvider, CONFIG,iibIntegrationBusProvider){
        RestangularProvider.setBaseUrl(CONFIG.API_HOST);
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/chart', {
                templateUrl: 'views/chart-view.html'
            })
            .when('/chart/:type', {
                templateUrl: 'views/chart.html',
                controller: 'ChartCtrl'
            })
            .when('/health', {
                templateUrl: 'views/health.html',
                controller: 'HealthCtrl'
            })
            .when('/inodes', {
                templateUrl: 'views/manage.html',
                controller: 'ManageCtrl'
            })
            .when('/inodes/add', {
                templateUrl: 'views/add-node.html',
                controller: 'AddNodeCtrl'
            })
            .when('/inodes/edit/:id', {
                templateUrl: 'views/edit-node.html',
                controller: 'EditNodeCtrl'
            })
            .when('/services', {
                templateUrl: 'views/services.html',
                controller: 'ServicesCtrl'
            })
            .when('/services/add', {
              templateUrl: 'views/add-service.html',
              controller: 'AddserviceCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
        iibIntegrationBusProvider.simulate(function(integrationBusSimulation){
            var node1           = integrationBusSimulation.addIntegrationNode("Node1");
            
            var server11        = node1.addIntegrationServer("Server11");
            var server12        = node1.addIntegrationServer("Server12");
            
            var application111  = server11.addApplication("Application111");
            var application112  = server11.addApplication("Application112");
            var application121  = server12.addApplication("Application121");
            var application122  = server12.addApplication("Application122");
            var application123  = server12.addApplication("Application123");
            
            var flow1111        = application111.addMessageFlow("Flow1111");
            var flow1112        = application111.addMessageFlow("Flow1112");
            var flow1121        = application112.addMessageFlow("Flow1121");
            var flow1122        = application112.addMessageFlow("Flow1122");
            
            var flow1211        = application121.addMessageFlow("Flow1211");
            var flow1212        = application121.addMessageFlow("Flow1212");
            var flow1221        = application122.addMessageFlow("Flow1221");
            var flow1222        = application122.addMessageFlow("Flow1222");
            
            var flow1231        = application123.addMessageFlow("Flow1231");
            var flow1232        = application123.addMessageFlow("Flow1232");
            var flow1233        = application123.addMessageFlow("Flow1233");
            
            
            
            var node2           = integrationBusSimulation.addIntegrationNode("Node2");
            var server21        = node2.addIntegrationServer("Server21");
            var application211  = server21.addApplication("Application221");
            var flow2111        = application211.addMessageFlow("Flow2111");
        });
    })
    .factory('INodeRestangular', function(Restangular) {
        return Restangular.withConfig(function(RestangularConfigurer) {
            RestangularConfigurer.setRestangularFields({
                id: '_id'
            });
        });
    })
    .factory('INode', function(INodeRestangular, CONFIG) {
        return INodeRestangular.service(CONFIG.API_ROUTE + '/inode');
    })
    .factory('ServiceRestangular', function(Restangular) {
        return Restangular.withConfig(function(RestangularConfigurer) {
            RestangularConfigurer.setRestangularFields({
                id: '_id'
            });
        });
    })
    .factory('Service', function(ServiceRestangular, CONFIG) {
        return ServiceRestangular.service(CONFIG.API_ROUTE + '/service');
    });
