// var data = [
//   {id: 1, author: "Pete Hunt", text: "This is one comment"},
//   {id: 2, author: "Jordan Walke", text: "This is *another* comment"}
// ];

var CommentBox = React.createClass({
    loadCommentsFromServer: function(){
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(data){
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err){
                console.log(this.props.url, status, err.toString());
            }
        });
    },
    getInitialState: function(){
        return {data:[]};
    },
    componentDidMount: function() {
        this.loadCommentsFromServer();
        // setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    },
    handleCommentSubmit: function(comment){
             
        var comments = this.state.data;
        // console.log(comments);
        comment.id = Date.now();
        //    console.log(comment);
        var newComments = comments.concat([comment]);
        // console.log(newComments);
        this.setState({data: newComments});
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache:false,
            type:'post',
            data:comment,
            success: function(data){
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err){
                console.log("fail");
                this.setState({data: comments});
                console.log(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render: function(){
    return (
        <div className="commentBox">
            <h1>CommentBox</h1>
            <CommentList data={this.state.data}/>
            <CommentForm onCommentSubmit={this.handleCommentSubmit}/>
        </div>
    );
    }
});

var CommentList = React.createClass({
    render: function(){
        // console.log(this.props.data);
        var commentNodes = this.props.data.map(function(comment){
            // console.log(comment);
            return (
                <Comment author={comment.author} key={comment.id}>
                    {comment.text}
                </Comment>);

        });
        return (
            <div className="commentList">
                {commentNodes}
            </div>
        );
    }
});

var CommentForm =React.createClass({
    getInitialState: function(){
        return {
            author:'',
            comment:''
        }
    },
    handleAuthorChange: function(e){
        this.setState({author: e.target.value});
    },
    handleCommentChange: function(e){
        this.setState({comment: e.target.value});
    },
    handleSubmit: function(e){
        e.preventDefault();
        var author = this.state.author.trim();
        var comment = this.state.comment.trim();
        this.props.onCommentSubmit({
            author: author,
            text:comment
        });
        if(!author || !comment){
            return ;
        }
        this.setState({author: "", comment: ""});

        //todo
    },
    render: function(){
        return (
            <form className="commentForm" onSubmit={this.handleSubmit}>
                <input 
                    type="text" 
                    placeholder="text your name" 
                    value={this.state.author} 
                    onChange={this.handleAuthorChange}
                />
                <input 
                    type="text" 
                    placeholder="text your comment"
                    value={this.state.comment}
                    onChange={this.handleCommentChange}
                />
                <input type="submit" value="submit"/>
            </form>
        );
    }
});

var Comment = React.createClass({
    rawMarkup: function () {
        var md = new Remarkable();
        // console.log(this.props.children);
        var rawMarkup = md.render(this.props.children.toString());
        return {
            __html: rawMarkup
        };
    },
    render: function () {
        
        return (
            <div className="comment">
                <h2 className="commentAuthor">
                    {this.props.author}
                </h2>
                <span dangerouslySetInnerHTML = {this.rawMarkup()}/>
            </div>
        );
    }
});

ReactDOM.render(
    <CommentBox url="/api/comments" pollInterval={2000}/>, 
    document.getElementById("content")
);