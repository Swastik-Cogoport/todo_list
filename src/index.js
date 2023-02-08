import React, { useState,useEffect } from 'react'; //useeffect for local storage
import ReactDOM from 'react-dom';
import '../src/index.css' // linking css file
import {v4 as uuid} from 'uuid'; // for making unique ids for todo list items

const App = () => { 
    const [todo, setTodo] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");  
    const [todos, setTodos] = useState([]);
    const [searchtodo, setSearchtodo] = useState("");
    const [firstdate, setfirstdate] = useState("");
    const [seconddate, setseconddate] = useState("");
    const [searchcat, setSearchcat] = useState("");
    const [result,setResult] = useState([]);
    const [allCategories, setallcategories] = useState(new Set());
  
  
  useEffect(() => {
    let arr = localStorage.getItem("todos");
    // alert(arr);
    if(arr){
        setTodos(JSON.parse(arr));
    }else{
        setTodos([]);
    }
  },[])

  useEffect(()=>{
      getallCategory();
  },[todos])

  // Adding content to the list
  const addTodo = () => {
    const id = uuid();
    setTodos([...todos,{id:id,text:todo,status:false,time:date,type:category}]);
  //setTodo("");
    localStorage.setItem("todos",JSON.stringify([...todos], {id:id,text:todo,status:false,time:date,type:category}))
  }

  // For  deleting a particular content
  const deleteTodo = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
    localStorage.setItem("todos", JSON.stringify(todos.filter((t) => t.id !== id)))
  };

  // For adding checkbox which will have a strike through effect
  const markasdone = (id) => {
    setTodos(
      todos.map((t) => {
        if(t.id===id) t.status = !t.status;
        return t;
      })
    )
  }

  const getallCategory = () => {
    let temparr=[];
    { todos.map(todo => (
      temparr.push(todo.type)
    ))}
    setallcategories(temparr)
  }

  const changeStatus = () => {
    setResult(todos.filter(todo => {
      let flag=true;
      if(searchtodo.length>0) {
        if(!todo.text.includes(searchtodo)) {
          flag=false;
        }
      }

      if(searchcat.length>0) {
        if(todo.type!==searchcat){
          flag=false;
        }
      }

      if(firstdate.length>0){
        if(((new Date(todo.time)) < (new Date(firstdate)))){
          flag=false;
        }
      }

      if(seconddate.length>0){
        if(((new Date(todo.time)) > (new Date(seconddate)))){
          flag=false;
        }
      }
      return flag;
    }))
  }

  return(
    <>
    <div>
      <h1> Todo list</h1>
    </div>
    <div>
      <input value={todo}
      onChange = {(e) => setTodo(e.target.value)} type = "text" placeholder="Add your text here">
      </input>
      <input value={date}
      onChange = {(e) => setDate(e.target.value)} type = "date">
      </input>
      <input value = {category} onChange = {(e) => setCategory(e.target.value)} type="text" placeholder="add category here"/>
      <button onClick={addTodo}>submit</button>
    </div>
    <div>
      <ol>
        {todos.map((todo) => {
          return (
            <li key={todo.id}>
              <div>
                <button type="checkbox" onClick={() => {markasdone(todo.id)}}/>
                {todo.status===true ? <s>{todo.text}</s> : todo.text}
                <button onClick={() => deleteTodo(todo.id)}>delete</button>
                <p>{todo.time}</p>
                <p>{todo.type}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>

    <div>
                <>
                    <div>
                        <span>Start Date</span>
                        <span>End Date</span>                    
                    </div>
                    <div>
                        <input value={searchtodo} onChange={(e)=>setSearchtodo(e.target.value)} type ="text" placeholder="Search"></input>
                        <input onChange={(e)=>setfirstdate(e.target.value)} value = {firstdate} type="date"/>
                        <input onChange={(e)=>setseconddate(e.target.value)} value ={seconddate} type="date"/>
                        <select onChange={(e)=>setSearchcat(e.target.value)}>
                            <option>all</option>
                            {(Array.from(allCategories)).map((onecategory) => (
                                <option>{onecategory}</option>
                            ))}</select>
                        <input value = {searchcat} type="text" placeholder="search by categroy"  onChange={(e)=>setSearchcat(e.target.value)}></input> 
                        <button onClick={changeStatus} style={{marginLeft:"10px"}} >submit!</button>
                    </div>
                 
                </>
                <ul>
                    {
                        (result.map(todo => {
                            return <li key={todo.id}>{todo.text}</li>
                        }))
                    }
                </ul>
           </div>
           <div>
                    <div>
                        <button onClick={getallCategory}>Get All categories</button>
                    </div>
                    {(Array.from(allCategories)).map((onecategory) => (
                        <li>{onecategory}</li>
                    ))}
           </div>
        </>
    );
};
ReactDOM.render(<App />, document.getElementById("root"));
