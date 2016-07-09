//替换占位符
function sprintf(text) {
    var i=1, args = arguments;
    return text.replace(/%s/g, function(){
        return (i<args.length) ? args[i++] : '';
    });
}

//添加li
function addItem(url, text) {
    
    //获取注释中的值，然后替换
    var mylist = document.getElementById("mylist"),
        templateText = mylist.firstChild.nodeValue,
        result = sprintf(templateText, url, text);
        
    mylist.insertAdjacentHTML("beforeend", result);
}


//进行事件绑定
window.onload = function(){ 
    var btn = document.getElementById("add");
    btn.addEventListener('click', function (params) {
        addItem("item/4", "Fourth item");
    }, false);
}