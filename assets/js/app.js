var DashboardManager = new Marionette.Application();

DashboardManager.addRegions({
    headerRegion: "#header-region",
	mainRegion : "#main-region",
	dialogRegion : Marionette.Region.Dialog.extend ({ el:" #dialog-region"})
});

DashboardManager.getCurrentRoute = function(){
	return Backbone.history.fragment	
};

DashboardManager.navigate = function (route,options){
	options || (options ={});
	Backbone.history.navigate(route,options);
};

DashboardManager.on("initialize:after", function() {

	if (Backbone.history) {
		Backbone.history.start();

		if (this.getCurrentRoute() === "") {
			DashboardManager.trigger("dashboards:list");
			//this.navigate("dashboards");
			//DashboardManager.DashboardsApp.List.Controller.listDashboards();
		}
	}
});
