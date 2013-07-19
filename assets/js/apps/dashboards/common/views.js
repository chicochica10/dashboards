/**
 * Created with JetBrains WebStorm.
 * User: angelrey
 * Date: 15/07/13
 * Time: 12:18
 * To change this template use File | Settings | File Templates.
 */
DashboardManager.module("DashboardsApp.Common.Views", function(Views, DashboardManager, Backbone, Marionette, $, _) {

    Views.Form = Marionette.ItemView.extend({
        template: "#dashboard-form",

        events: {
            'click button.js-submit': 'submitClicked'
        },

        submitClicked : function(e) {
            e.preventDefault();
            console.log("edit dashboard");
            var data = Backbone.Syphon.serialize(this);
            this.trigger("form:submit", data);
        },

//  en su region dedicada ya será modal
//       onRender: function(){
//            if( ! this.options.asModal){
//                var $title = $('<h1>', { text: this.title });
//                this.$el.prepend($title);
//            }
//        },

        /*onShow: function(){
            if (this.options.asModal){
                this.$el.dialog({
                    modal: true,
                    title: this.title,
                    width: "auto"
                });
            }
        },*/

        onFormDataInvalid: function(errors){
            var $view = this.$el;

            var clearFormErrors = function(){
                var $form = $view.find("form");
                $form.find(".help-inline.error").each(function(){
                    $(this).remove();
                });
                $form.find(".control-group.error").each(function(){
                    $(this).removeClass("error");
                });
            }

            var markErrors = function(value, key){
                var $controlGroup = $view.find("#dashboard-" + key).parent();
                var $errorEl = $('<span>', { class: "help-inline error", text: value });
                $controlGroup.append($errorEl).addClass("error");
            }

            clearFormErrors();
            _.each(errors, markErrors);
        }

    })
});