DashboardManager.module("DashboardsApp.Edit", function(Edit, DashboardManager, Backbone, Marionette, $, _) {

	Edit.Dashboard = DashboardManager.DashboardsApp.Common.Views.Form.extend({

		initialize: function(){
			//<h1>Edit dashboard <%=name %> </h1>
			this.title = "Edit dashboard " + this.model.get("name");
		},

        onRender: function(){
            if (this.options.generateTitle){
                var $title = $('<h1>', { text: this.title });
                this.$el.prepend($title);
            }

            this.$el.find(".js-submit").text("Update dashboard");
        }
	});

});
