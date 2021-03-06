import React from 'react'

export class ToDo extends React.Component {
  state = {
    newTaskText: '',
    tasks: [
      {
        id: '123',
        text: 'Wynieś śmieci',
        isCompleted: false
      },
      {
        id: '321',
        text: 'Zmyj naczynia',
        isCompleted: false
      }
    ]
  }

  onNewTaskTextChange = (e) => {
    this.setState(() => ({
      newTaskText: e.target.value
    }))
  }

  addNewTask = (e) => {
    e.preventDefault()

    if (!this.state.newTaskText) return

    const newTask = {
      id: Date.now(),
      text: this.state.newTaskText,
      isCompleted: false
    }
    this.setState((prevState) => ({
      newTaskText: '',
      tasks: prevState.tasks.concat(newTask)
    }))
  }

  toggleTask = (taskId) => {
    console.log('toggleTask')
    this.setState((prevState) => ({
      tasks: prevState.tasks.map((task) => {
        if (task.id !== taskId) return task
        return {
          ...task,
          isCompleted: !task.isCompleted
        }
      })
    }))
  }

  makeToggleTaskHandler = (taskId) => (e) => {
    this.toggleTask(taskId)
  }

  deleteTask = (taskId) => {
    console.log('deleteTask')
    this.setState((prevState) => ({
      tasks: prevState.tasks.filter((task) => task.id !== taskId)
    }))
  }

  render () {
    const { tasks, newTaskText } = this.state

    return (
      <div>
        <form onSubmit={this.addNewTask}>
          <input
            type={'text'}
            value={newTaskText}
            onChange={this.onNewTaskTextChange}
          />
          <br/>
          <button>
            SUBMIT
          </button>
        </form>
        <ul>
          {
            tasks.map(({ id, text, isCompleted }) => {
              return (
                <li
                  key={id}
                  onClick={this.makeToggleTaskHandler(id)}
                >
                  {isCompleted ? '[COMPLETED]' : ''}
                  {text}
                  <button
                    onClick={(e) => this.deleteTask(id)}
                  >
                    DELETE
                  </button>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

export default ToDo
