(function ($) {

    //MODEL
    var Item = Backbone.Model.extend({
        defaults: {
            string: 0,
            num: 0
        }
    });

    //COLLECTION
    var List = Backbone.Collection.extend({
        model: Item
    });

    //TEMPLATE
    var ItemTemplate = _.template("<div><%= count %></div>")

    //ITEM VIEW
    var ItemView = Backbone.View.extend({
        tagName: 'li',
        events: {
            'click a.delete':'remove'
        },
        initialize: function () {
            _.bindAll(this, 'render', 'unrender', 'remove');
            this.model.bind('change', this.render);
            this.model.bind('remove', this.unrender);
        },
        render: function () {
            $(this.el).html('<span style="color:black;">'
                + this.model.get('string') +
                "</span> &nbsp; &nbsp; <a href='#' class='delete'>[delete]</a>" + ItemTemplate({count:this.model.get('num')}));
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
    var ListView = Backbone.View.extend({
        el: $('body'), 
        events: {
            'click a.add': 'addItem'
        },
        initialize: function () {
            _.bindAll(this, 'render', 'addItem', 'appendItem');

            this.collection = new List();
            this.collection.bind('add', this.appendItem); 

            this.counter = 0;
            this.render();
        },
        render: function () {
            var self = this;
            $(this.el).append("<a href='#' class='add'>Add Item</a><br />");
            $(this.el).append("<input type='text' class='user_input'/>");
            $(this.el).append("<ul></ul>");
            _(this.collection.models).each(function (item) { //display any old data
                self.appendItem(item);
            }, this);

        },
       
        addItem: function () {
            this.counter++;
            var item = new Item();
            item.set({
                string: $('.user_input').val(),
                num: "Item #" + this.counter
            });
            this.collection.add(item);
        },
        appendItem: function (item) {
            var itemView = new ItemView({
                model: item
            });
            $('ul', this.el).append(itemView.render().el);
        }
    });

    var listView = new ListView();
})(jQuery);