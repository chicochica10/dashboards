DashboardManager.module("DashboardsApp.Edit", function(Edit, DashboardManager, Backbone, Marionette, $, _) {

	Edit.Controller = {
		editDashboard : function(id) {
			var loadingView = new DashboardManager.Common.Views.Loading({
				title : "Loading Dashboard data for editing",
				message : "Please wait, dashboard data is loading..."
			});
			DashboardManager.mainRegion.show(loadingView);

			var fecthingDashboard = DashboardManager.request("dashboard:entity", id);
			$.when(fecthingDashboard).done(function(dashboard) {
				var view;
				if (dashboard !== undefined) {
					view = new Edit.Dashboard({
						model : dashboard,
                        generateTitle: true
					});

					view.on("form:submit", function(data) {
						if (dashboard.save(data)) {
							DashboardManager.trigger("dashboard:show", dashboard.get("id"));
						} else {
							//alert ("unable to save dashboard!");
							view.triggerMethod("form:data:invalid", dashboard.validationError);
						}
					});

				} else {
					view = new Show.MissingDashboard();
				}
				DashboardManager.mainRegion.show(view);
			});

		}
	}

});
