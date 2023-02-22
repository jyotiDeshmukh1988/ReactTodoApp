import React, { useEffect, useState } from 'react'
import './todo.css'
import todo from "../components/images/todo.svg";

const getLocalItems = () => {
    let list = localStorage.getItem('lists');
    //console.log(list,typeof list)
    if(list){
        const locitems = JSON.parse(list);
        return locitems
    }
    else{
        return []
    }
}

const Todo = () => {
    const [inputData,setInputData] = useState('');
    const [items,setItems] = useState(getLocalItems());
    const [toggleSubmit,setToggleSubmit] = useState(true)
    const [isEditItem,setIsEditItem] = useState(null)

    const addItem = () => {
        if(!inputData){
            alert('Please add an todo item')
            setInputData('')
        }
        else if(inputData && !toggleSubmit){
            const editnewitems = items.map((ele)=>{
                if(ele.id === isEditItem){
                    //console.log({...ele,name:inputData})
                    return {...ele,name:inputData}
                }  
                return ele;
            })
           setItems(editnewitems) 
           setToggleSubmit(true)
            setInputData('')
            setIsEditItem('')
        }
        else{  
            let allInputData = ''
        for (const [key, value] of Object.entries(items)) {
            //console.log(`${key}: ${value.name}`);
            if(value.name === inputData)
            {
                alert(inputData + 'is already added to the todo list')
                setItems([...items]) ;
                setInputData('') ;
            }
            else{
                allInputData = { id:new Date().getTime().toString(),name:inputData}
                setItems([...items,allInputData]) ;
                setInputData('') ;
            }
            //if(value == 'somestring'){console.log('exists')}
        }
       
            //const allInputData = { id:new Date().getTime().toString(),name:inputData}
            //setItems([...items,allInputData]) ;
            //setInputData('') ;
            
        }
    }
    const editItem = (id) =>{
        //console.log('editItem',id)
        let newEditItem = items.find(item => item.id === id)
       // console.log('newEditItem',newEditItem)
       setToggleSubmit(false)
       setInputData(newEditItem.name)
       setIsEditItem(id)
    }

    const removeItem = (id) =>{
        const data = items.filter((item)=>{
            return id !== item.id
        })
        setItems(data)
    }
    const removeAll = () => {
        setItems([])
    }
    useEffect(()=>{
       localStorage.setItem('lists', JSON.stringify(items))   
    },[items])

    return <div className='main-div'>
        <div className='child-div'>
            <figure>
                <img src={todo} alt="todo"/>
                <figcaption>Add Your List Here ✌</figcaption>
            </figure>
            <div className='addItems'>
                <input type="text" placeholder='Add Items....' value={inputData} onChange={(e)=>setInputData(e.target.value)}/>
                {toggleSubmit ? <i className='fa fa-plus add-btn' title='Add Item' onClick={addItem}></i> : <i className='fa fa-edit add-btn' title='Edit Item' onClick={addItem}></i>}
                
            </div>
            <div className='showItems'>
                {
                    items.length>0 && items.map((item)=>{
                        return <>
                         <div className="eachItem" key={item.id}>
                            <h3>{item.name}</h3>
                            <div className="todo-btn">
                            <i className='far fa-edit add-btn' title='Edit Item' onClick={()=>editItem(item.id)}></i>
                            <i className='far fa-trash-alt add-btn' title='Delete Item' onClick={()=>removeItem(item.id)}></i>
                            </div>
                        </div>
                        </>
                    })
                }
            </div>
            <div className='showItems'>
                <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}><span>Check List</span></button>
            </div>
        </div>
    </div>
}

export default Todo