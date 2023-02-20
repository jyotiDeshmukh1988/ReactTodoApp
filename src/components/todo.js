import React, { useState } from 'react'
import './todo.css'
import todo from "../components/images/todo.svg";

const Todo = () => {
    const [inputData,setInputData] = useState('');
    const [items,setItems] = useState([]);
    const addItem = () => {
        setItems([...items,inputData])
        setInputData('')
    }
    const removeItem = (id) =>{
        const data = items.filter((item,ind)=>{
            return ind !== id
        })
        setItems(data)
    }
    const removeAll = () => {
        setItems([])
    }

    return <div className='main-div'>
        <div className='child-div'>
            <figure>
                <img src={todo} alt="todo"/>
                <figcaption>Add Your List Here ✌</figcaption>
            </figure>
            <div className='addItems'>
                <input type="text" placeholder='Add Items....' value={inputData} onChange={(e)=>setInputData(e.target.value)}/>
                <i className='fa fa-plus add-btn' title='Add Item' onClick={addItem}></i>
            </div>
            <div className='showItems'>
                {
                    items.map((item,index)=>{
                        return <>
                         <div className="eachItem" key={index}>
                            <h3>{item}</h3>
                            <i className='far fa-trash-alt add-btn' title='Delete Item' onClick={()=>removeItem(index)}></i>
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