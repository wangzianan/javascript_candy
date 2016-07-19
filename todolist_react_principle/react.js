//state用来连接事件与dom操作
var state = {
    items:[], 
    id:0
};

//添加item按钮
$("#add").on("click", function(e){
    var value = $("#input").val().trim();
    $("#input").val("");
    //更新state
    state.items.push({
        item:value,
        id:state.id++,
        completed:false
    });
    render();
});

//item的点击事件
$("#output").on("click", ".item", function(e){
    console.log(e.target.id);
    //更新state
    state.items.forEach(function(a){
        if(a.id==e.target.id){
            a.completed = !a.completed;
        }
    });
    render();
});

//渲染方法
function render() {
    //获取state，生成html字符串,更新html
    var htmlStr = state.items.map(function(a){
        var completed = a.completed ? 'completed': '';
        return '<li class="item '+completed+'" id='+a.id+'>'+a.item+'</li>';
    }).join("");
    $("#output").html(htmlStr);
}