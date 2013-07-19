DashboardManager.module('DashboardsApp.List', function(List, DashboardManager,
	Backbone, Marionette, $, _) {

	List.Layout = Marionette.Layout.extend({
        template: "#dashboard-list-layout",

        regions:{
            panelRegion: "#panel-region",
            dashboardsRegion: "#dashboards-region"

        }
    });

    List.Panel = Marionette.ItemView.extend ({
        template: "#dashboard-list-panel",

        triggers: {'click button.js-new': "dashboard:new"},
        events: {'click button.js-filter':'filterClicked'},

        filterClicked: function(){
            var criterion = this.$el.find(".js-filter-criterion").val();  // tambien con syphon
            this.trigger("dashboards:filter", criterion);
        },

        ui: {
            criterion: "input.js-filter-criterion"
        },

        onSetFilterCriterion: function (criterion){
            $(this.ui.criterion).val(criterion);
        }


    });

    List.Dashboard = Marionette.ItemView.extend({
		tagName : "tr",
		template : "#dashboard-list-item-template",

		events : {//?
			"click" : "highlightName",
			"click td a.js-show": "showClicked",
			"click td a.js-edit": "editClicked",
			"click button.js-delete" : "deleteClicked"
		},

		highlightName : function(e) {
			e.preventDefault();
			//previene que al hacer clis se refresque en lo que tenemos no hace falta
			this.$el.toggleClass('warning');
		},

		showClicked: function(e){
			e.preventDefault();
			e.stopPropagation();
			this.trigger("dashboard:show", this.model);
		},

		editClicked: function (e){
			e.preventDefault();
			e.stopPropagation();
			this.trigger("dashboard:edit", this.model);
		},

		deleteClicked : function(e) {
			e.stopPropagation();
			// para evitar que se seleccion el elemento
			//alert("delete button was clicked");
			//this.model.destroy(); no sive pq no tengo la url definida
			this.trigger("dashboard:delete", this.model);
			//this.model.collection.remove(this.model);
		}

		// remove : function() {
			// this.$el.fadeOut();
			// $(this).remove();
		// }
	});

	// List.Dashboards = Marionette.CollectionView.extend({
	// tagName : "table",
	// className: "table table-hover",
	// itemView : List.Dashboard
	// });

    var NoDashboardView = Backbone.Marionette.ItemView.extend({
        template: "#dashboard-list-none",
        tagName: "tr",
        className: "alert"
    });

	List.Dashboards = Marionette.CompositeView.extend({
		tagName : "table",
		className : "table table-hover",
		itemView : List.Dashboard,
        emptyView: NoDashboardView,
		itemViewContainer : "tbody",
		template : "#dashboard-list-template" ,

        initialize: function(){
            this.listenTo(this.collection, "reset", function(){
                this.appendHtml = function(collectionView, itemView, index){
                    collectionView.$el.append(itemView.el);
                }
            });
        },

        onCompositeCollectionRendered: function(){
            this.appendHtml = function(collectionView, itemView, index){
                collectionView.$el.prepend(itemView.el);
            }
        }

		// onItemviewDashboardDelete : function() {
			// this.$el.fadeOut(1000, function() {
				// $(this).fadeIn(1000);
			// });
		// }
	});
});

