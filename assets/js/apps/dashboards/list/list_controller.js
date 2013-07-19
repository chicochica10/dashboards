DashboardManager.module('DashboardsApp.List', function(List, DashboardManager, 
	Backbone, Marionette, $, _) {

	List.Controller = {
		listDashboards : function(criterion) {

			var loadingView = new DashboardManager.Common.Views.Loading();
			DashboardManager.mainRegion.show(loadingView);

			var fetchingDashboards = DashboardManager.request("dashboard:entities");

            var dashboardsListLayout = new List.Layout();
            var dashboardsListPanel = new List.Panel();

			$.when(fetchingDashboards).done(function(dashboards){

                var filteredDashboards = DashboardManager.Entities.FilteredCollection ({
                    collection: dashboards,
                    filterFunction: function(filterCriterion){
                        var criterion = filterCriterion.toLowerCase();
                        return function (dashboard){
                            if (dashboard.get('name').toLowerCase().indexOf(criterion)!==-1){
                                return dashboard;
                            }
                        };
                    }
                });

                if (criterion){
                    filteredDashboards.filter(criterion);
                    //DashboardManager.trigger ("dashboard:filter",filterCriterion);
                    //poner el filtro en el campo (una unica vez)
                    dashboardsListPanel.once("show", function(){
                        dashboardsListPanel.triggerMethod("set:filter:criterion",
                            criterion);
                    });
                }

                var dashboardsListView = new List.Dashboards({
                    collection : filteredDashboards
                });

                dashboardsListLayout.on ("show",function(){
                dashboardsListLayout.panelRegion.show(dashboardsListPanel);
                dashboardsListLayout.dashboardsRegion.show(dashboardsListView) ;
            });

            dashboardsListPanel.on("dashboards:filter", function (filterCriterion){
                console.log ("filter list with criterion:", filterCriterion);
                filteredDashboards.filter(filterCriterion);
                DashboardManager.trigger ("dashboard:filter",filterCriterion);
            });

            dashboardsListPanel.on("dashboard:new", function(){

                var newDashboard = new DashboardManager.Entities.Dashboard();
                var view = new DashboardManager.DashboardsApp.New.Dashboard({
                    model: newDashboard

                });

                view.on("form:submit", function(data){
                    var highestId = dashboards.max(function(c){ return c.id; });  ///delete when backend is done
                    highestId = highestId.get('id');
                    data.id = highestId + 1;
                    if(newDashboard.save(data)){
                        dashboards.add(newDashboard);
                        view.trigger("dialog:close");
                        DashboardManager.dialogRegion.close();
                    }
                    else{
                        view.triggerMethod("form:data:invalid",
                            newDashboard.validationError);
                    }
                });

                DashboardManager.dialogRegion.show(view);
            });


			dashboardsListView.on ("itemview:dashboard:delete", function(childView,model){
				//dashboards.remove(model);
				model.destroy();
			});

			dashboardsListView.on ("itemview:dashboard:edit", function(childView,model){
				console.log ("edit click clicked");
				 view = new DashboardManager.DashboardsApp.Edit.Dashboard({
				 	model: model});

				 // view.on ("show", function(){
				 	// this.$el.dialog({
				 		// modal: true,
				 		// title: view.title,
				 		// width: "auto"
				 	// });
				// });

				view.on("form:submit", function(data) {
						if (model.save(data)) {
							childView.render();//childview is listView
                            view.trigger("dialog:close");
							DashboardManager.dialogRegion.close();
						} else {
							//alert ("unable to save dashboard!");
							view.triggerMethod("form:data:invalid", model.validationError);
						}
					});

				DashboardManager.dialogRegion.show(view);
			});

			dashboardsListView.on("itemview:dashboard:show", function (childView,model){
				console.log("Received itemview:dashboard:show event on model ", model);
				//DashboardManager.navigate("dashboards/" + model.get('id'));
				//DashboardManager.DashboardsApp.Show.Controller.showDashboard(model);
				DashboardManager.trigger ("dashboard:show", model.get("id"));
			});

			DashboardManager.mainRegion.show(dashboardsListLayout);

			console.log("DashboardManager has started!");
			});
		}
	}
});
