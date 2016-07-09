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
    var listScript = document.getElementById("list-item"),
        templateText = listScript.text,
        result = sprintf(templateText, url, text),
        mylist = document.getElementById("mylist"),
        div = document.createElement("div");
    
    //去掉li之前的空格    
    div.innerHTML = result.replace(/^\s*/, "");
    mylist.appendChild(div.firstChild);
}


//进行事件绑定
window.onload = function(){ 
    var btn = document.getElementById("add");
    btn.addEventListener('click', function (params) {
        addItem("item/4", "Fourth item");
    }, false);
}
