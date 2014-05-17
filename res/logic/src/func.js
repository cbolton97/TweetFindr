//QUESTIONS: add something to top of collection - unshift?
//           can we detect new tweets vs already displayed tweets when refreshing? _.difference?

(function ($) {

    //TEMPLATES
var AppTemplate = _.template($('#app_template').html()),
    TweetTemplate = _.template($('#tweet_template').html()),

    Query = Backbone.Model.extend({
        defaults: {
            q: "ukraine" //tie to cache?
        }
    }),
    Tweets = Backbone.Collection.extend({
        model: Tweet
    }),
    Tweet = Backbone.Model.extend({
        idAttribute: "id_str"
    }),
    //TWEET VIEW 
    TweetView = Backbone.View.extend({
         initialize: function() {
          this.listenTo(AppView.storedTweets, 'reset', this.remove);
          //console.log(this.model.attributes.text);
          $.each(this.model.attributes.entities.urls, function (i, url) { 
            console.log(url);
          });
        },
        render: function(){
            
            this.$el.append(TweetTemplate(this.model.attributes));
            return this;
        }

    }),
    //APP VIEW
    AppView = Backbone.View.extend({ 
        el: $('#app'),
        events: {
            'click a.search': 'newSearch',
            'click a.edit': 'editor',
            'click a.refresh': 'refresh'
            
        },
        initialize: function () {
            _.bindAll(this, 'render', 'post', 'newSearch', 'editor', 'refresh');
            this.storedTweets = new Tweets();
            this.query = new Query();
            this.listenTo(this.query, 'change', this.post);
            this.render();
          
        },
        render: function () {
            var self = this;
            $(this.el).html(AppTemplate());
            this.post();
            setInterval(this.post, 50000);
            $(".header_default").slideDown();
           
        
        },
        post: function(){
            var query = this.query.get('q');
            console.log("yolo swag");
            if(query !== ""){
                $.ajax({
                  type: "POST",
                  url: "res/logic/src/getTweets.php",
                  data: "query="+query,
                  success: function (data){
                    console.log("Ajax request was a success. :D");
                    var tweets_json = JSON.parse(data);
                    $.each(tweets_json.statuses, function (i, tweet) { //loops through tweet statuses
                        //console.log(tweet);
                        var t = new Tweet(tweet);
                        AppView.storedTweets.unshift(t);
                        var tw = new TweetView({
                            model: t 
                        });
                        $('.tweet_container').append(tw.render().el);
                    });
                  }
                }).done(function() {
                  console.log("Ajax request done. :)");
                }).fail(function() {
                  console.log("Ajax request died. :( ");
                });
            }else{
                console.log("blank query");
            }
            $(".header_editor").slideUp();
            $(".header_default").slideDown();
        },
        newSearch: function(){
            this.query.set({
                q: $('.user_input').val()
            });
            this.storedTweets.reset();
        },
        editor: function () {
            $(".header_default").slideUp();
            $(".header_editor").slideDown();
            $(".user_input").focus();
            
        },
        refresh: function(){
            this.post();
        }
       
    }),

    AppView = new AppView();
})(jQuery);
