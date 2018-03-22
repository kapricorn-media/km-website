function BuildPostHTML(metadata, content)
{
    var templateBase = '\
        <div class="post"> \
            {AUTHOR} \
            <div class="entryOutline"> \
                <div class="entry"> \
                    <div class="graySpacer"></div> \
                    {MEDIA} \
                    <div class="postTitle"> \
                        <h2>{TITLE}</h2> \
                    </div> \
                    {CONTENT} \
                </div> \
                <div class="graySpacerEnd"></div> \
            </div> \
        </div> \
    ';
    var templateAuthor = '\
        <div class="author"> \
            <div class="authorInfo"> \
                <div class="graySpacer"></div> \
                <img class="authorImg" src="{AUTHOR_IMG_SRC}"> \
                <br> \
                <h3>{DATE}</h3> \
            </div> \
        </div> \
    ';
    var templateImage = '\
        <img class="entryImg fancybox" src="{IMG_SRC}"> \
    ';
    var templateVideo = '\
        <div class="vidContainer"> \
            <iframe class="video" src="{VIDEO_SRC}" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe> \
        </div> \
    ';

    var userImgJ = "../images/user2.png";
    var userImgL = "../images/user1.png";

    var authorStr = "";
    var mediaStr = "";
    if (metadata.hasOwnProperty("author")) {
        if (metadata.author === "j") {
            authorStr = templateAuthor;
            authorStr = authorStr.replace("{AUTHOR_IMG_SRC}", userImgJ);
            authorStr = authorStr.replace("{DATE}", metadata.date);
        }
        else if (metadata.author === "l") {
            authorStr = templateAuthor;
            authorStr = authorStr.replace("{AUTHOR_IMG_SRC}", userImgL);
            authorStr = authorStr.replace("{DATE}", metadata.date);
        }
    }
    if (metadata.hasOwnProperty("images")) {
        var imgs = metadata.images;
        if (imgs.length != 0) {
            mediaStr = templateImage;
            // TODO loop through all images
            mediaStr = mediaStr.replace("{IMG_SRC}", metadata.images[0]);
        }
    }
    if (metadata.hasOwnProperty("video")) {
        if (metadata.video !== "") {
            mediaStr = templateVideo;
            // TODO loop through all images
            mediaStr = mediaStr.replace("{VIDEO_SRC}", metadata.video);
        }
    }

    var result = templateBase;
    result = result.replace("{AUTHOR}", authorStr);
    result = result.replace("{MEDIA}", mediaStr);
    result = result.replace("{TITLE}", metadata.title);
    result = result.replace("{CONTENT}", content);
    return result;
}

function CreateElementFromHTML(htmlString)
{
    var div = document.createElement("div");
    div.innerHTML = htmlString.trim();
    return div.firstChild;
}

function LoadJSON(path, success, error)
{
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success) {
                    success(JSON.parse(xhr.responseText));
                }
            }
            else {
                if (error) {
                    error(xhr);
                }
            }
        }
    };

    xhr.open("GET", path, true);
    xhr.send();
}

window.onload = function() {
    var postLoaderInfo = document.getElementById("postLoader");
    var type = postLoaderInfo.className;
    var toLoad = postLoaderInfo.innerHTML.trim().split(",");
    for (var i = 0; i < toLoad.length; i++) {
        toLoad[i] = "\"" + toLoad[i].trim() + "\"";
    }
    toLoad = toLoad.join(",");

    var posts = document.createElement("div");
    posts.id = "posts";
    postLoaderInfo.parentElement.appendChild(posts);

    var loadPath = "/posts?type=" + type + "&names=[" + toLoad + "]";
    LoadJSON(loadPath, function(data) {
        var mdConverter = new showdown.Converter();

        for (var i = 0; i < data.length; i++) {
            var contentHTML = mdConverter.makeHtml(data[i].content);
            var postHTML = BuildPostHTML(data[i], contentHTML);
            var postElement = CreateElementFromHTML(postHTML);
            posts.appendChild(postElement);

            if (i !== data.length - 1) {
                var postSpacer = document.createElement("div");
                postSpacer.className = "postSpacer";
                posts.appendChild(postSpacer);
            }
        }
    }, function(xhr) {
        console.log("Post loader error");
        console.log(xhr);
    });

    var endSpacer = document.createElement("div");
    endSpacer.id = "endSpacer";
    postLoaderInfo.parentElement.appendChild(endSpacer);
};