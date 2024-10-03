// 실행 : npm run dev

import { useState } from "react";
import ToDoHeader from "./components/TodoHeader";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

//localStorage에서 모든 할 일 항목을 가져오는 함수
function fetchTodos(){
  const result = []
  for (let i = 0; i < localStorage.length; i++) {
    const value = localStorage.key(i)
    result.push(value)
  }
  return result
}
  
// App 컴포넌트 정의
function App() {
  //const [count, setCount] = useState(0)// 상태 (현재 사용되지 않음)
  
  
  // 입력 필드의 텍스트를 관리하는 상태
  // const [inputText, setInputText] = useState('')
  
  // 할 일 목록을 관리하는 상태, 초기값으로 localStorage의 데이터를 사용
  const [todos, setTodos] = useState(fetchTodos()); //usf 플러그인에서 제공
  
  // 입력 필드의 값이 변경될 때 호출되는 핸들러
  // const handleInput = (event) => {
  //   console.log(event) //clg 플러그인에서 제공
    
  //   const value = event.target.value;
  //   setInputText(value); // 입력된 텍스트로 상태 업데이트
  // }

  // '추가' 버튼 클릭 시 호출되는 핸들러 ctrl D
  const AddTodo = (todo) => {
    localStorage.setItem(todo, todo) // localStorage에 할 일 저장
    
    // todos.push(todo) // 직접 배열을 수정하는 것은 React에서 권장되지 않음
    setTodos((currentTodos) => { // React 방식의 배열 상태 업데이트
      return [...currentTodos, todo] // 스프레드 연산자를 사용해 새 배열 생성(...은 이 배열을 풀어서 집어넣어줘라는 뜻)
    })
    //settodo('') // 입력 필드 초기화
  }

  //할 일 삭제 핸들러
  const RemoveTodo = (todo) => {
    // console.log(todo,index)
    // todos.splice(index,1) // 직접 배열을 수정하는 것은 React에서 권장되지 않음
    // console.log(todos)

    // 선택된 할 일을 제외한 새 배열 생성
    const result = todos.filter(todoItem => todoItem !== todo)

    setTodos(result); // 새 배열로 상태 업데이트
    localStorage.removeItem(todo); // localStorage에서 해당 항목 삭제
  }

  return (
    <div>
      <ToDoHeader />
      <TodoInput onTodoAdd={AddTodo} />
      <TodoList todos={todos} onTodoRemove={RemoveTodo}/>

      {/* 할 일 목록 */}
      {/* <div>
        
        <ul>
          {todos.map((todo, index) => {
            return (
              <li key={index}>
               <span>{todo}</span>
               // 삭제 버튼. 클릭 시 해당 할 일 삭제 
               <button onClick={() => handleRemove(todo, index)}>remove</button>
              </li>
            )
          })}
        </ul>
      </div> */}
      
    </div>
  )
}

export default App