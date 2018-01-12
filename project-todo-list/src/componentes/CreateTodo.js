import React, { Component } from 'react';
import TodoItems from './Todo';
import Pubsub from 'pubsub-js';

export default class CreateTodo extends Component {
    
  constructor(props){
    
    super(props);
    this.state = {
        itens: []
    };
    
  }
  
  createTodo(event){

    event.preventDefault();

    let titulo = this.titulo.value;
    let id = new Date().getTime();
    let user = "";

    let newTodo = {
      'title': this.titulo.value,
      'id':new Date().getTime(),
      'user': "user",
      items : this.state.itens
    }

    let requestInfo = {
      method : "post",
      body:JSON.stringify(newTodo),
      headers : new Headers({
          'Content-type' : "application/json"
      })
    }

    fetch(`http://localhost:3001/todo/`, requestInfo)
    .then(function(response) {
        return response.json()})
    .then(function(json) {})
    .catch(function(ex) {
    });


    Pubsub.publish('updateList',{todo: newTodo});

  }

  addTask(event){
    event.preventDefault();
    
    let newItem = {
      "id": new Date().getTime(),
      "description": this.itemDescription.value,
      "finished": false,
    }

    let itemsTodo = this.state.itens.push(newItem);

    this.setState({itens: this.state.itens});
  }

  remove(event){
    event.preventDefault();

    for (let i =0; i<this.state.itens.length;i++){
      if (event.target.id == this.state.itens[i].id){
        this.state.itens.splice(i,1);
      }

    }

    this.setState({itens : this.state.itens});
  }

  componentDidMount(){

  }

  render (){
      return (

        <div className="container-fluid">

          <div className="form-group">
            <label htmlFor="inputTitulo">Titulo</label>
            <input type="text" className="form-control" id="inputTitulo" placeholder="Titulo" ref={input => this.titulo = input }/>
          </div>

          <hr/>
          
          <div>
          {
            this.state.itens.map(itemTodo => {
              return (
                  <div>
                    <form className="form-inline" >
                      

                      <label key="{itemTodo.id}" >
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

          <section>
            <form className="form-inline" onSubmit={this.addTask.bind(this)}>
              <input type="text" placeholder="Adicione um Task..." ref={input => this.itemDescription = input } className="form-control" />
              <input type="submit" className="btn btn-primary" value="+" />
            </form>
          </section>

          <hr/>

          <section>
            <form style={{ margin:'0.5%',padding:'0.5%'}} onSubmit={this.createTodo.bind(this)}>
              <input type="submit" className="btn btn-success" value="Create" />
            </form>
          </section>
        </div>

      );
  }
}