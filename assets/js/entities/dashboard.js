DashboardManager.module("Entities", function(Entities, DashboardManager, Backbone, Marionette, $, _) {

	//var dashboards;

	var initializeDashboards = function() {
		var dashboards = new Entities.DashboardCollection([{
			id : 1,
			name : "db1"
		}, {
			id : 2,
			name : "db2"
		}]);
		dashboards.forEach(function(dashboard) {
			dashboard.save();
		});
		return dashboards.models;
	};

	var API = {

		getDashboardEntities : function() {
			var dashboards = new Entities.DashboardCollection();
			var defer = $.Deferred();
			dashboards.fetch({
				success : function(data) {
					defer.resolve(data);
				}
			});
			var promise = defer.promise();
			$.when(promise).done(function(dashboards) {
				if (dashboards.length === 0) {
					// if we don't have any Dashboards yet, create some for convenience
					var models = initializeDashboards();
					dashboards.reset(models);
				}
			});
			return promise;
		},

		// getDashboardEntities : function() {
		//
		// var dashboards = new Entities.DashboardCollection();
		// var defer = $.Deferred();
		// dashboards.fetch({
		// sucess : function(data) {
		// defer.resolve(data);
		// }
		// });
		// var promise = defer.promise();
		// $.when(promise).done(function(dashboards) {
		// if (dashboards.length === 0) {
		// var models = initDashboards();
		// dashboards.reset (models);
		// } else {
		// console.log ("taminio: " + dashboards.length);
		// }
		// });
		//
		// return promise;
		// },

		getDashboardEntity : function(dashboardId) {
			var dashboard = new Entities.Dashboard({
				id : dashboardId
			});
			//dashboard.fetch();

			var defer = $.Deferred();
			setTimeout(function() {
				dashboard.fetch({
					success : function(data) {
						defer.resolve(data);
					},
					error : function(data) {
						defer.resolve(undefined);
					}
				});
			}, 2000);
			return defer.promise();
		}
	};

	Entities.Dashboard = Backbone.Model.extend({
		defaults : {
			name : "generic-dashboard",
			creationDate : "1970-01-01",
			modificationDate : "1970-01-01"
		},
		
		urlRoot : "dashboards",
		
		validate: function (attrs,options){
			var errors = {};
			
			if (!attrs.name){
				errors.name = "dashboard name can't be blanck'";
			} else {
				if (attrs.name.length < 2){
					errors.name = "dashboard name is too short (two or more chars)";
				}
			}
			if (!_.isEmpty(errors)){
				return errors;
			}
		}
	});

	Entities.configureStorage(Entities.Dashboard);
	// the  line  is distint in a web storage and a remote server

	Entities.DashboardCollection = Backbone.Collection.extend({
		url : "dashboards",
		model : Entities.Dashboard,
		comparator : "name"
	});

	Entities.configureStorage(Entities.DashboardCollection);
	// the  line  is distint in a web storage and a remote server

	DashboardManager.reqres.setHandler("dashboard:entities", function() {
		return API.getDashboardEntities();
	});

	DashboardManager.reqres.setHandler("dashboard:entity", function(id) {
		return API.getDashboardEntity(id);
	});

	// var alertPrivate = function (message){
	// alert ("Private alert: " + message);
	//
	// }

	// Entities.alertPublic = function (message){
	// alert("llamando a alerta privada");
	// alertPrivate (message);
	// }

});
