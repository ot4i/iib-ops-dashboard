
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


/*
 * Service used to keep a reference of all the registered widgets in the application
 * Add new widgets to the charts variable
 */

angular.module('iibHeatMapApp')
	.factory('Charts', function() {
		var charts = {
			circle: new CircleChart(),
			sunburst: new SunburstChart(),
			bilevel: new BilevelChart(),
			tilford: new TilfordChart()
		};

		return charts;
	});