$("document").ready(function(){
    change_text();
    $(".next-btn").on("click", function(){
        change_text();
    });
    $(".fa-twitter").on("click",function(){
        share_tweet();
    });
  
});

function change_text(){ 
     $.getJSON("https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1", function(a) {
        $(".quote-wrap .quote").html(a[0].content);
        $(".quote-wrap .author").html(a[0].title); 
  });
}

function share_tweet(){
    var text = encodeURI($(".quote-wrap .quote").text());
    window.open(
    "https://twitter.com/intent/tweet?text="+text,
    '_blank' 
    );
}
