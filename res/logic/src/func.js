(function ($) {

    //TEMPLATES
    var HeaderTemplate = _.template($('#header_template').html()), //is this really needed?
        ItemTemplate = _.template($('#item_template').html()),
        tweet_template = _.template($('#tweet_template').html());

    //should be intergrated with backbone, set on a timeout sequence, linked to rehfresh
    function retrieveTweets(query){
        console.log(query);
        $.ajax({
          type: "POST",
          url: "res/logic/src/getTweets.php",
          data: "query="+ query,
          success: function (data){
            console.log("Ajax request was a success. :D");
            console.log(data);
            formatTweets(data);
          }
        }).done(function() {
          console.log("Ajax request done. :)");
        }).fail(function() {
          console.log("Ajax request died. :( ");
        })
      }

    retrieveTweets("ukraine"); //this needs to go

    //should intergrate with a collection (?)
    function formatTweets(data){
        $('.list_container').html(" "); //this is bad
        var tweets_json = JSON.parse(data);

        $.each(tweets_json, function (i) { //loops through tweet statuses and metadata
            
            $.each(this, function (k, v) { //loops through tweet object
                console.log(tweets_json[i][k]);
                if (tweets_json[i][k].user === undefined) { //checks to see if object is tweet, needs to die
                    console.log("data failed test");
                } else {
                    var tweet_url = "http://twitter.com/" + tweets_json[i][k].user.screen_name + "/status/" + tweets_json[i][k].id_str;
                    $('.list_container').append(tweet_template({ 
                        url: tweet_url,
                        user_name: tweets_json[i][k].user.screen_name, 
                        text: tweets_json[i][k].text, 
                        timestamp: tweets_json[i][k].created_at 
                    }));
                }
                
            });
        });
    }


//Backbone stuff is a little wierd, will fix
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




    //ITEM VIEW should be rewritten to reflect it's real purpose
    var ItemView = Backbone.View.extend({
        tagName: 'li',
        events: {
            'click a.delete': 'remove'
        },
        initialize: function () {
            _.bindAll(this, 'render', 'unrender', 'remove');
            this.model.bind('change', this.render);
            this.model.bind('remove', this.unrender);
            retrieveTweets(this.model.get('string'));
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
            $(".user_input").focus();
            
        }
       
    });

    var HeaderView = new HeaderView();
})(jQuery);