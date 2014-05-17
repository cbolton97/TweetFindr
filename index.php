<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="utf-8" />
    <meta name="format-detection" content="telephone=no" />
    <meta name="viewport" id="viewport" content="width=device-width, height=device-height, initial-scale=1.0, user-scalable=no" />
    <title>TweetFindr</title>
    <link rel="stylesheet" href="res/assets/css/main.css"/>
</head>
	
<body>

    <div id="app">
       
    </div>

    <section class="template-container">
        <script type="text/template" id="app_template">
            <section class="header_container">
                <header>
                    <section class="header_default panel">
                        <a href="#" class="action edit">
                            Search
                        </a>
                        <div class="title-container">
                            <span class="title">
                                TweetFindr
                            </span>
                        </div>
                        <a href="#" class="action refresh">
                            Refresh
                        </a>
                        <div class="clear"></div>
                    </section>
                    <section class="header_editor panel">
                        <input class='user_input' type='text' />
                        <a href="#" class="action search">
                            Search
                        </a>
                        <div class="clear"></div>
                    </section>
                </header>
            </section>
            <section class="tweet_container">
                <ul></ul>
            </section>
            <footer></footer>

        </script>
        <script type="text/template" id="tweet_template">
            <section class="tweet_default">
                <span class="user_name">
                    @<%= user.screen_name %>
                </span>
                <a target="_blank" href="http://twitter.com/<%= user.screen_name%>/status/<%= id_str%>" class="action timestamp">
                    <%= created_at %>
                </a>
                <span class="message">
                    <%= text %>
                </span>

                <div class="clear"></div>
            </section>
        </script>
    </section>
	
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <script src="res/logic/lib/underscore-min.js"></script>
    <script src="res/logic/lib/backbone-min.js"></script>
	
    <script src="res/logic/src/func.js"></script>
</body>
</html>
