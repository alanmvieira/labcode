import React, { Component } from 'react';
import Pubsub from 'pubsub-js';

class TodoInfo extends Component{
  render (){
      return (
        <div>
            <h5 className="card-header">{this.props.todo.title}</h5>
            <hr/>
        </div>
    );
  }
}

class TodoItems extends Component{

  constructor(props){
    super(props);

    this.state = {
        id:this.props.todo.id,
        items : this.props.todo.items
    };

  }

  remove(event){
    event.preventDefault();

    for (let i =0; i<this.props.todo.items.length;i++){
      if (event.target.id == this.props.todo.items[i].id){
        this.props.todo.items.splice(i,1);
      }

    }

    this.setState({items : this.props.todo.items});

  }

  marcaDescarda(event){
    event.preventDefault();
  
  }

  componentWillMount(props){

    Pubsub.subscribe('addItemTodo',(topico,todo)=>{
      
      if(this.state.id === todo.todo.id){
        this.setState({items : todo.todo.items});
      }
      
    });

  }

  render (){
      return (
        <div>
          {
            this.state.items.map(itemTodo => {
                return (
                    <div>
                      <form className="form-inline" >
                        
                        <div className="checkbox" style={{ marginRight:'2%'}} >
                            <input type="checkbox"/>
                        </div>

                        <label key="{itemTodo.id}" className={ itemTodo.finished ? 'textoRiscado' : '' } >
                          {itemTodo.description}
                        </label>
                        
                        <button type="button" className="close" aria-label="Close" onClick={this.remove.bind(this)}>
                          <span id={itemTodo.id}>&times;</span>
                        </button>

                      </form>

                    </div>
                )
            })
          }
        </div> 
    );
  }
  
}

class TodoAdd extends Component{

  addTask(event){
    event.preventDefault();
    
    let newItem = {
      "id": new Date().getTime(),
      "description": this.item.value,
      "finished": false,
    }

    let itemsTodo = this.props.todo.items.push(newItem);

    Pubsub.publish('addItemTodo',{todo: this.props.todo});

  }

  render (){
      return (
          <section>
            <form onSubmit={this.addTask.bind(this)} className="form-inline">
              <input type="text" placeholder="Adicione um Task..." ref={input => this.item = input } className="form-control" />
              <input type="submit" className="btn btn-primary" value="+" />
            </form>
          </section>
    );
  }
}

class TodoUpdate extends Component{

  updateTodo(event){
    event.preventDefault();
    
    let requestInfo = {
      method : "put",
      body:JSON.stringify(this.props.todo),
      headers : new Headers({
          'Content-type' : "application/json"
      })
    }

    fetch(`http://localhost:3001/todo/${this.props.todo.id}`, requestInfo)
    .then(function(response) {
        return response.json()})
    .then(function(json) {})
    .catch(function(ex) {
    });

  }

  removeTodo(event){
    event.preventDefault();

    // console.log(this.props.todo.id);

    let requestInfo = {
      method : "delete",
      headers : new Headers({
          'Content-type' : "application/json"
      })
    }

    fetch(`http://localhost:3001/todo/${this.props.todo.id}`, requestInfo)
    .then(function(response) {
        return response.json()})
    .then(function(json) {
      Pubsub.publish('updateList',{});
    })
    .catch(function(ex) {
    });

  }

  render (){
      return (
        <section>
          <hr/>

          <form onSubmit={this.updateTodo.bind(this)} style={{ margin:'0.5%',padding:'0.5%'}}>
            <input type="submit" className="btn btn-success" value="Save" />
            <button type="button" className="btn btn-default" aria-label="right Align" style={{ float: 'right'}} onClick={this.removeTodo.bind(this)}>
              <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
            </button>
          </form>
        </section>
    );
  }
}

export default class ToDo extends Component {
    
  componentDidMount(){
  
  }

  render (){
      return (
        
            
          <div className="todoGeral">
        
            <TodoInfo todo={this.props.todo}/>
            <TodoItems todo={this.props.todo}/>
            

            <TodoAdd todo={this.props.todo}/>
            <TodoUpdate todo={this.props.todo}/>
            
          </div>

      );
  }
}