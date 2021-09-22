import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

const Todos = () => {
  const [todos, setTodos] = useState([])
  const [todoText, setTodoText] = useState('')

  useEffect(() => {
    const existing = localStorage.getItem('todos')
    setTodos(existing ? JSON.parse(existing) : [])
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (todoText === '') return
    const newTodos = [...todos, todoText]
    setTodos(newTodos)
    setTodoText('')
    localStorage.setItem('todos', JSON.stringify(newTodos))
  }

  const completeTodo = (todoIndex) => {
    const newTodos = todos.filter((_, index) => index !== todoIndex)
    setTodos(newTodos)
    localStorage.setItem('todos', JSON.stringify(newTodos))
  }

  return (
    <main className="divide-y-4 bg-white w-full flex flex-col my-20">
      <section className="text-gray-600 relative grid place-content-center place-items-center">
        <section className="flex flex-col gap-12 w-full px-10 py-8 rounded-xl shadow bg-gray-200">
          <h2 className="text-5xl text-center font-semibold">Todos</h2>
          <div className="w-full py-2 border-b-2 border-gray-400 flex justify-between gap-3">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={todoText}
                onChange={(e) => setTodoText(e.target.value)}
                className="outline-none text-2xl flsex-1 px-4 py-3 bg-transparent"
                placeholder="Enter todo"
              />
              <input
                type="submit"
                className="text-2xl font-semibold text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300"
                value="+"
              />
            </form>
          </div>

          {todos &&
            todos.map((todo, index) => (
              <div key={index} className="flex justify-between">
                <div>{todo}</div>
                <button onClick={() => completeTodo(index)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </button>
              </div>
            ))}
        </section>
      </section>
    </main>
  )
}

ReactDOM.render(<Todos />, document.getElementById('todos'))
