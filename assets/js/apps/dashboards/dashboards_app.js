DashboardManager.module("DashboardsApp", function(DashboardsApp, DashboardManager, Backbone, Marionette, $, _) {
	DashboardsApp.Router = Marionette.AppRouter.extend({
		appRoutes: {
			"dashboards":"listDashboards",
			"dashboards/:id": "showDashboard",
			"dashboards/:id/edit": "editDashboard",
            "dashboards(?filter=:criterion)":"listDashboards"
		}
	});
	var API = {
		listDashboards: function(criterion){
			DashboardsApp.List.Controller.listDashboards(criterion);
            DashboardManager.HeaderApp.List.Controller.setActiveHeader("dashboards");
		},
		
		showDashboard: function (id){
			DashboardsApp.Show.Controller.showDashboard(id);
            DashboardManager.HeaderApp.List.Controller.setActiveHeader("dashboards");
		},
		
		editDashboard: function (id){
			DashboardsApp.Edit.Controller.editDashboard(id);
            DashboardManager.HeaderApp.List.Controller.setActiveHeader("dashboards");
		}
		
	};
	
	DashboardManager.on("dashboards:list", function(){
		DashboardManager.navigate("dashboards");
		API.listDashboards();	
	});
	
	DashboardManager.on("dashboard:show", function(id){
		DashboardManager.navigate("dashboards/"+id);
		API.showDashboard(id);
	});
	
	DashboardManager.on("dashboard:edit", function(id){
		DashboardManager.navigate("dashboards/"+id+"/edit");
		API.editDashboard(id);
	});

    DashboardManager.on("dashboard:filter", function(criterion){
        if(criterion){
            DashboardManager.navigate("dashboards?filter=" + criterion);
        }
        else{
            DashboardManager.navigate("dashboards");
        }
    });
	
	
	DashboardManager.addInitializer(function(){
		new DashboardsApp.Router({
			controller: API
		});
	});
});