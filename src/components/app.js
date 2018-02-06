import React from 'react';
import { testHealth } from '../transports/transport';

import AppInfo from './app-info';
import ConfigurationForSegments from './configuration-for-segments';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


const App = () => (
  <div >
    <h2>Demo App</h2>
    <div>
        <MuiThemeProvider>   
            <AppInfo />
        </MuiThemeProvider>
    </div>
    <div>
        <MuiThemeProvider>
            <ConfigurationForSegments />
        </MuiThemeProvider>
    </div>
    <br/>
    <br/>
    <br/>
    <br/>
    <div>
         <button onClick={testHealth.bind(this, false)}>send a reqeust</button>
    </div>
  </div>
);
export default App;

/*
export default class App extends React.Component {
    constructor(props) {
        super(props);
        const appInfo = store.getState().appInfo;
        this.state = {
            todos, appInfo
        };
    }

    render() {
        return (
            <div>
                <h1>React Demo App</h1>

                <AppInfo appInfo={store.getState().appInfo} store={store}/>




                <button onClick={this.onClickButton.bind(this)}>send a reqeust</button>


                <CreateTodo todos={this.state.todos} createTask={this.createTask.bind(this)} />
                <TodosList
                    todos={this.state.todos}
                    toggleTask={this.toggleTask.bind(this)}
                    saveTask={this.saveTask.bind(this)}
                    deleteTask={this.deleteTask.bind(this)}
                />
            </div>
        );
    }

    onClickButton() {
        let url = 'http://localhost:3000/health';
        let reqH = new Headers();
        let reqInit = {
            method: 'GET',
            headers : reqH,
            mode : 'cors',
            cache: 'default'
        };
        let testReq = new Request(url, reqInit);
        fetch(testReq)
        .then((resp) => resp.json())
        .then(function(data) {
            console.log("DATA:", data);
        })
        .catch(function(error) {
            console.error("ERROR!", error);
        })
    }

    toggleTask(task) {
        const foundTodo = _.find(this.state.todos, todo => todo.task === task);
        foundTodo.isCompleted = !foundTodo.isCompleted;
        this.setState({ todos: this.state.todos });
    }

    createTask(task) {
        this.state.todos.push({
            task,
            isCompleted: false
        });
        this.setState({ todos: this.state.todos });
    }

    saveTask(oldTask, newTask) {
        const foundTodo = _.find(this.state.todos, todo => todo.task === oldTask);
        foundTodo.task = newTask;
        this.setState({ todos: this.state.todos });
    }

    deleteTask(taskToDelete) {
        _.remove(this.state.todos, todo => todo.task === taskToDelete);
        this.setState({ todos: this.state.todos });
    }
}
*/

/*
const todos = [
{
    task: 'make React tutorial',
    isCompleted: false
},
{
    task: 'eat dinner',
    isCompleted: true
}
];*/
