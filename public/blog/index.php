<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>KAPRICORN MEDIA</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- OpenGraph tags -->
    <meta property="og:title"       content="KAPRICORN MEDIA">
    <meta property="og:type"        content="website">
    <meta property="og:image"       content="http://www.kapricornmedia.com/Images/Logs/finalforblog.png">
    <meta property="og:url"         content="http://www.kapricornmedia.com/blog/">
    <meta property="og:description" content="Kapricorn Media development blog.">
    
    <!-- - - - - - - - - FAVICON PACKAGE CONFIG - - - - - - - - -->
    <link rel="apple-touch-icon" sizes="57x57" href="../apple-touch-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="../apple-touch-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="../apple-touch-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="../apple-touch-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="../apple-touch-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="../apple-touch-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="../apple-touch-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="../apple-touch-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="../apple-touch-icon-180x180.png">
    <link rel="icon" type="image/png" href="../favicon-32x32.png" sizes="32x32">
    <link rel="icon" type="image/png" href="../android-chrome-192x192.png" sizes="192x192">
    <link rel="icon" type="image/png" href="../favicon-96x96.png" sizes="96x96">
    <link rel="icon" type="image/png" href="../favicon-16x16.png" sizes="16x16">
    <link rel="manifest" href="../manifest.json">
    <link rel="mask-icon" href="../safari-pinned-tab.svg" color="#5bbad5">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="../mstile-144x144.png">
    <meta name="theme-color" content="#ffffff">
    <!-- - - - - - - - - - - - - - - - - - - - - - - - - -->

    <link rel="stylesheet" href="../GGWebfontKit/GGWebfontKit.css">
    <link rel="stylesheet" href="../CSS/main.css">
    <link rel="stylesheet" media="(max-width:700px)" href="../CSS/navigation-small.css">
    <link rel="stylesheet" media="(min-width:701px)" href="../CSS/navigation-large.css">
    <link rel="stylesheet" href="../CSS/posts.css">
    <link rel="stylesheet" href="../CSS/blog.css">
    
    <!-- Lightbox -->
    <link rel="stylesheet" type="text/css" media="screen" href="http://cdnjs.cloudflare.com/ajax/libs/fancybox/1.3.4/jquery.fancybox-1.3.4.css" />
	<style type="text/css">
        a.fancybox img {
            border: none;
        } 
    </style>
    <!-- --------- -->
</head>

<body>
    <div id="titleBar">
    	<div id="logoCont">
            <a class="mainLink" href="../" alt="Home">
                <img class="logo" src="../Images/Logo/logoBlack.png" alt="Logo">
            </a>
        </div>
    </div>
    
    <div id="sidebar">
    	<a href="../" alt="Home">
    		<img class="logo" src="../Images/Logo/logoBlack.png" alt="Logo">
        </a>
        <div class="linkSpacer"></div>
        <div class="barLink">
        	<a class="mainLink" href="../about/" alt="About">
            	ABOUT
            </a>
        </div>
        <div id="currentLink" class="barLink">
        	BLOG
        </div>
        <div class="barLink">
        	<a class="mainLink" href="../contact/" alt="Contact">
            	CONTACT
            </a>
        </div>
        <div class="barLink">
        	<a class="mainLink" href="../games/" alt="Games">
            	GAMES
            </a>
        </div>
    </div>
    
    <div id="content">
        <div id="posts">
            <?php

            // Count total number of blog posts, up to 20
            $NUM_POSTS = 0;
            for ($i = 1; $i <= 20; ++$i) {
            	if (file_exists("Posts/" . $i . ".html")) {
            		$NUM_POSTS++;
            	}
            }

            // Include all posts in reverse order
            // (from $NUM_POSTS to 1)
            for ($i = $NUM_POSTS; $i > 0; --$i) {
                include("Posts/" . $i . ".html");
				if ($i > 1) {
					include("Posts/spacer.html");
				}
            }

            ?>
        </div>
        
    	<div id="endSpacer"></div>
    </div>
    
    <!-- Lightbox -->
    <script type="text/javascript" src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
	<script type="text/javascript" src="http://code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
    <script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/fancybox/1.3.4/jquery.fancybox-1.3.4.pack.min.js"></script>
    <script type="text/javascript">
        $(function($){
            var addToAll = false;
            var gallery = false;
            var titlePosition = 'outside';
            $(addToAll ? 'img' : 'img.fancybox').each(function(){
                var $this = $(this);
                var title = $this.attr('title');
                var src = $this.attr('data-big') || $this.attr('src');
                var a = $('<a href="#" class="fancybox"></a>').attr('href', src).attr('title', title);
                $this.wrap(a);
            });
            if (gallery)
                $('a.fancybox').attr('rel', 'fancyboxgallery');
            $('a.fancybox').fancybox({
                titlePosition: titlePosition
            });
        });
        $.noConflict();
    </script>
	<!---------->
</body>
</html>
