import {React,useState,useEffect} from 'react'

function Todo() {
    const getLocalData = ()=>{
        const localData = JSON.parse(localStorage.getItem("myTodos"));
        return localData;
      }
    
      const [inputData,setInputData] = useState("");
      const [items,setItems] = useState(getLocalData());
      const [isEditItem, setIsEditItem] = useState("");
      const [toogleButton,setToggleButton] = useState(false);
      
      useEffect(() => {
        localStorage.setItem("myTodos",JSON.stringify(items));
      
      },[items]);
    
    
      const addItem = ()=>{
        if(!inputData){
          alert("Plz Insert some item")
        }
        else if(inputData && toogleButton){
          setItems(
            items.map((ele)=>{
              if(ele.id === isEditItem){
                return {...ele,name:inputData}
              }
              return ele;
            })
          )
          setInputData("");
          setIsEditItem("");
          setToggleButton(false);
        }
        else{
          const newInputData = {
            id: new Date().getTime().toString(),
            name: inputData
          }
          setItems([ ...items, newInputData]);
          setInputData("")
        }
      }
    
      const deleteItem = (idd)=>{
        const updatedItem = items.filter((s)=>{
          return s.id !== idd;
        })
        setItems(updatedItem);
      }
    
      const editItem = (s)=>{
        setInputData(s.name);
        setIsEditItem(s.id);
        setToggleButton(true);
    
      }
    
      const removeAll = ()=>{
        setItems([]);
      }
    
    return (
        <section className="main-cont">
        <input type="text" className="inputBox" value={inputData} onChange={(event)=>{setInputData(event.target.value)}}></input>
        {toogleButton ? <button className = "edit-btn" onClick={()=>{addItem()}}>Edit Item</button>:<button className="add-btn" onClick={()=>{addItem()}}>Add Item</button>}
        <button className="remove-btn" onClick={removeAll}>Remove All</button>
        {
            items.map((s,index)=>{
            return <div className="main-cont-1"><h1 style={{fontSize:"22px",margin:0,textTransform:"capitalize",letterSpacing:"1px"}} key={index}>{s.name}</h1> <div className="main-cont-btn"> <button className="btn-delete" onClick={()=>{deleteItem(s.id)}}>Delete</button><button  className="btn-edit" onClick={()=>{editItem(s)}}>Edit item</button></div></div>;
            })
        }
      </section>
    )
}

export default Todo
