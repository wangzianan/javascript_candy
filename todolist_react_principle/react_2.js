//state用来连接事件与dom操作
var state = {
    items:[], 
    id:0
};

var store = createStore(state);


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
    // render(state, $("#output"));
    //触发store变化
    store.setState(state);
});

//item的点击事件
$("#output").on("click", ".item", function(e){
    //更新state
    state.items.forEach(function(a){
        if(a.id==e.target.id){
            a.completed = !a.completed;
        }
    });
    // render(state, $("#output"));
    //触发store变化
    store.setState(state);
});

//渲染方法
//render无需知道知道外部状态
function render(props, node) {
    //获取state，生成html字符串,更新html
    node.html(itemList(props));
}

//生成li
function itemRow(props){
    var completed = props.completed ? 'completed': '';
    return '<li class="item '+completed+'" id='+props.id+'>'+props.item+'</li>'; 
}

//生成ul
function itemList(props){
    return   '<ul id="output">'+props.items.map(function(a){
        return itemRow(a);
    }).join("")+'</ul>';
}

//创建store用来管理state
function createStore(initialState){
    var _state = initialState || {}, 
        _listeners = [];
    
    function updateListeners(state) {
        _listeners.forEach(function (listener) {
            listener.cb(state);
        });
    }

    return {
        setState: function (state) {
            _state = state;
            updateListeners(state);
        },
        getState: function () {
            return _state;
        },
        onUpdate: function (name, cb) {
            _listeners.push({
                name: name,
                cb:cb
            });
        }
    }
}

//store改变事件
store.onUpdate("rootRender", function(){
    render(state, $("#output"));
});