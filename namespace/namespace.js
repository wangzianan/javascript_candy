//全局对象非破坏性处理命名空间
var YourGlobal = {
    namespace : function(ns) {
        var parts = ns.split("."),
            object = this,
            i,len;
 
        for(i=0, len=parts.length; i<len; i++){
            if(!object[parts[i]]){
                object[parts[i]] = {};
            }
            object = object[parts[i]];
        }
        return object;
    }
}

YourGlobal.namespace("Books.MaintainableJavaScript");
YourGlobal.Books.MaintainableJavaScript.author = "Nicholas";
// console.log(YourGlobal);
// console.log(YourGlobal.Books.MaintainableJavaScript.author);

