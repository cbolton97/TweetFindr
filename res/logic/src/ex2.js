
SearchView = Backbone.View.extend({
    initialize: function(){
        this.render();
    },
    render: function(){
        //Pass variables in using Underscore.js Template
        var variables = {
            search_label: "My Search"
        };
        // Compile the template using underscore
        var search_template = _.template("<label><%= search_label %></label><input type='text' id='search_input' /><input type='button' id='search_button' value='Search' /> ", variables);
        // Load the compiled HTML into the Backbone "el"
        this.$el.html( search_template );
    },
    events: {
        "click input[type=button]": "doSearch"  
    },
    doSearch: function( event ){
        // Button clicked, you can access the element that was clicked with event.currentTarget
        alert( "Search for " + $("#search_input").val() );
    }
});
        
var search_view = new SearchView({ el: $("#search_container") });