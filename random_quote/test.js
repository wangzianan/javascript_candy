var colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];
var currentQuote='';
var currentAuthor = '';

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
        currentQuote = $(".quote-wrap .quote").text();
        currentAuthor = a[0].title;
        var color = colors[Math.floor(Math.random()*colors.length)];
        $("body").css("background", color);
        $(".quote-text").css("color", color);
        $(".author-wrap").css("color",color);
  });
}

function share_tweet(){
    var text = encodeURI(currentQuote);
    window.open(
    "https://twitter.com/intent/tweet?text="+text,
    '_blank' 
    );
}
