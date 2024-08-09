"use client"

import { useState } from "react"
import { Todo } from "./Todo"

async function deliverTodos(todo: string) {
  await new Promise((res) => setTimeout(res, 1000))
  return todo
}

export default function Home() {
  const [todos, setTodos] = useState([
    { text: "Explore useOptimistic hook", sending: false },
  ])
  async function sendTodos(formData: any) {
    const sentTodo = await deliverTodos(formData.get("todo"))
    setTodos((todos: any) => [...todos, { text: sentTodo }])
  }
  return (
    <main className="h-screen w-screen flex items-center justify-center">
      <div className="flex flex-col">
        <Todo todos={todos} sendTodos={sendTodos} />
      </div>
    </main>
  )
}
