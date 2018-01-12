import React, { Component } from 'react';
import ToDo from './Todo';
import CreateTodo from './CreateTodo';
import Pubsub from 'pubsub-js';

export default class Board extends Component {
    
  constructor(){
      super();
      this.state = {
          todoList: []
      };
  }
  
  componentDidMount(){
  
    fetch('http://localhost:3001/todo')
    .then( response => response.json())
    .then( todo => {
        this.setState({todoList : todo});
    });


    Pubsub.subscribe('updateList',(topico,todo)=>{

        fetch('http://localhost:3001/todo')
        .then( response => response.json())
        .then( todo => {
            this.setState({todoList : todo});
        });
    });
  
  }

  render (){
      return (

        <div className="main">
        
          <div className="divAddTodo">
            
              <CreateTodo />
            
          </div>

          <div className="boardTodos">
            {
                this.state.todoList.map(todo => 
                  <ToDo key={todo.id} todo={todo}/>
                )
              }
            </div>

          </div>


      );
  }
}