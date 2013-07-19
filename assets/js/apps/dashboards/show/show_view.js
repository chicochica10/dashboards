DashboardManager.module ("DashboardsApp.Show", function (Show, DashboardManager,
	Backbone, Marionette, $, _){
		
		Show.MissingDashboard = Marionette.ItemView.extend({
			template: "#missing-dashboard-view"
		});
		
		Show.Dashboard = Marionette.ItemView.extend({
			template: "#dashboard-view",
			
			events: {
				"click a.js-edit": "editClicked"
			},
			
			editClicked: function(e){
				e.preventDefault();
				// must to go to controller
				//DashboardManager.trigger("dashboard:edit",this.model.get("id"));
				this.trigger("dashboard:edit", this.model);
			}
		});
		
	});
