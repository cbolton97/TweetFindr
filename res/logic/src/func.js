(function ($) {
    var tweet_template = _.template("<p>@<%= user_name %><br /><%= text %><br /><%= timestamp %></p>");
    $.each(tweets_json, function (i) {
        $.each(this, function (k, v) {
            console.log(tweets_json[i][k]);
            if (tweets_json[i][k].user === undefined) {
                console.log("fail");
            } else {
                $('.list_container').append(tweet_template({ user_name: tweets_json[i][k].user.screen_name, text: tweets_json[i][k].text, timestamp: tweets_json[i][k].created_at }));
            }
            
        });
    });

    //COLLECTION
    var List = Backbone.Collection.extend({
        model: Item
    });


    //MODEL
    var Item = Backbone.Model.extend({
        defaults: {
            string: 0,
            ID: 0
        }
        
    });


    //TEMPLATES
    var HeaderTemplate = _.template($('#header_template').html());
    var ItemTemplate = _.template($('#item_template').html());


    //ITEM VIEW
    var ItemView = Backbone.View.extend({
        tagName: 'li',
        events: {
            'click a.delete': 'remove'
        },
        initialize: function () {
            _.bindAll(this, 'render', 'unrender', 'remove');
            this.model.bind('change', this.render);
            this.model.bind('remove', this.unrender);
        },
        render: function () {
            $(this.el).html(ItemTemplate({ id: this.model.get('ID'), string: this.model.get('string') }));
            return this;
        },
        unrender: function () {
            $(this.el).remove();
        },
        remove: function () {
            this.model.destroy();
        }
    });

    //LIST VIEW
    var HeaderView = Backbone.View.extend({
        el: $('header'),
        events: {
            'click a.edit': 'edit',
            'click a.search': 'search',
            
        },
        initialize: function () {
            _.bindAll(this, 'render', 'appendItem', 'edit', 'search', 'unrender');
            

            this.collection = new List();
            this.collection.bind('change', this.render);
            this.collection.bind('add', this.appendItem);

            this.counter = 0;
            this.render();
        },
        render: function () {
            
            var self = this;
            $(this.el).html(HeaderTemplate());
            $(".header_default").slideDown();
          

            //_(this.collection.models).each(function (item) { //display any old data
            //    self.appendItem(item);
            //}, this);

        },
        search: function(){
            this.counter++;
            var item = new Item();
            if ($('.user_input').val() === "") {
                item.set({
                    string: "empty",
                });
            } else {
                item.set({
                    string: $('.user_input').val(),
                });
            }

            item.set({
                ID: this.counter
            });
            this.collection.add(item);
            $(".header_editor").slideUp();
            $(".header_default").slideDown();
        },
        
        appendItem: function (item) {
            var itemView = new ItemView({
                model: item
            });

            //$('ul', this.el).append(itemView.render().el);
            $('ul', '.list_container').append(itemView.render().el);

        },
        unrender: function (template) {
           
        },

        edit: function () {
            $(".header_default").slideUp();
            $(".header_editor").slideDown();
            
        }
       
    });

    var HeaderView = new HeaderView();
})(jQuery);