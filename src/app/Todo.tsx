"use client"
import { useOptimistic, useRef } from "react"

export function Todo({ todos, sendTodos }: any) {
  const formRef = useRef<HTMLFormElement>(null)

  async function formAction(formData: FormData) {
    addOptimisticTodo(formData.get("todo"))
    formRef.current?.reset()
    await sendTodos(formData)
  }

  const [optimisticTodo, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo) => [
      ...state,
      {
        text: newTodo,
        sending: true,
      },
    ]
  )

  return (
    <>
      <h1 className="text-black">Todo List Application</h1>
      <div className="flex flex-col space-y-2 my-2">
        {optimisticTodo.map((todo: any, index: number) => (
          // Passing index as key is not recommended, but for this example it's fine
          <div className="w-full" key={index}>
            <div
              className={`bg-gray-100 rounded flex p-4 h-full items-center text-black ${
                !!todo.sending ? "opacity-20" : ""
              }`}
            >
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="3"
                className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4"
                viewBox="0 0 24 24"
              >
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                <path d="M22 4L12 14.01l-3-3"></path>
              </svg>
              <span className="font-medium">{todo.text}</span>
            </div>
          </div>
        ))}
      </div>
      <form action={formAction} ref={formRef} className="flex flex-col">
        <input
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-200 dark:placeholder-gray-400 dark:text-black dark:focus:ring-red-500 dark:focus:border-blue-500 my-5"
          name="todo"
          placeholder="Add Todo Today"
          autoComplete="off"
        />
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add
        </button>
      </form>
    </>
  )
}
