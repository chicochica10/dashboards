DashboardManager.module ('DashboardsApp.Show', function(Show, DashboardManager, Backbone, Marionette, $, _) {
	Show.Controller = {
		
		showDashboard: function(id){
			
			var loadingView = new DashboardManager.Common.Views.Loading({
				title: "Loading Dashboard data",
				message: "Please wait, dashboard data is loading..."
			});
			DashboardManager.mainRegion.show (loadingView);	
				
			var fetchingDashboard = DashboardManager.request("dashboard:entity", id);
			$.when (fetchingDashboard).done (function(dashboard){
				var dashboardView;
				if (dashboard !== undefined){
					console.log ("showDashboard called for dashboard ", dashboard);
					dashboardView = new Show.Dashboard({model:dashboard});
					// triggered by view
					dashboardView.on ("dashboard:edit", function (dashboard){
						DashboardManager.trigger("dashboard:edit",dashboard.get("id"));
					});
				} else {
					dashboardView = new Show.MissingDashboard();
				}
				
				DashboardManager.mainRegion.show (dashboardView);
			});
		}
	}
});
