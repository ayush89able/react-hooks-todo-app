import React,{useReducer,useContext,useEffect,useState} from 'react'
import Button from '@tds/core-button'
import Input from '@tds/core-input'
import Checkbox from '@tds/core-checkbox'
import FlexGrid from '@tds/core-flex-grid'
import Box from '@tds/core-box'
import Heading from '@tds/core-heading'
import Text from '@tds/core-text'
import { Delete, Add } from '@tds/core-interactive-icon'
import { IconButton } from '@tds/core-interactive-icon'

import styled from 'styled-components'
import './style.css';

function appReducer(state,action){
  switch(action.type){
    case 'Reset':{
      return action.payload;
      
    }
    case 'Add':{
      return[
        ...state,
        {
          id:Date.now(),
          text:action.payload,
          completed:false
        },
      ];
    }
    case 'Delete':{
      return state.filter(item=>item.id!==action.payload)
    }
    case'Completed':{
      return state.map(item=>{
        if(item.id===action.payload){
          return{
            ...item,
            completed:!item.completed
          };
        }
        return item;
      });
    }
    default:{return state;}
  }
}

const Context=React.createContext();
export default function TodosApp(){
  const [state,dispatch]=useReducer(appReducer,[]);
  const [text,setText]=useState('')
  const Div=styled.div`
  button{
    display:block;
    margin:auto;
    margin-top:1.5em;
  }
  `
  const CenterText=styled.div`
  h1{
    text-align:center
  }
  `
  useEffect(()=>{
    const raw= localStorage.getItem('data');
    dispatch({type:'Reset',payload:JSON.parse(raw)})
  },[])

 useEffect(()=>{
    localStorage.setItem('data',JSON.stringify(state))
  },[state])

 const handleChange=(event)=>{
   setText(event.target.value);
 }

 const handeAddTodo=()=>{
   dispatch({type:'Add',payload:text});
   setText('');
 }  

 const keyPressed=(event)=> {
  if (event.key === "Enter") {
    handeAddTodo()
  }
}
  return(
    <Context.Provider value={dispatch}>
    <CenterText>
    <Heading level='h1'>Todos App</Heading>
    </CenterText>
    <Box horizontal={8}>
    <Input label='Todo' placeholder='Work to do' type='text' value={text} onChange={handleChange} onKeyPress={keyPressed}/>
    </Box>
    <Div >
     <IconButton icon={Add} onClick={handeAddTodo} a11yText="Add" />
    </Div>
    <TodosList items={state}/>
    
    </Context.Provider>
  )
}

function TodosList({items}){
return items.map(item=>(
      <TodoItem key={item.id} {...item}/>
    ))
}

function TodoItem({id,completed,text}){
  const dispatch=useContext(Context)
  return (
    <FlexGrid>
    <Box horizontal={{xs:2,sm:2,md:4,lg:6,xl:6}}>
    <FlexGrid.Row>
    <FlexGrid.Col xs={2} sm={1} md={1} lg={1} xl={1} >
    <div className='checkBoxDiv'>
    <input type='checkbox' checked={completed}  onChange={()=>{dispatch({type:'Completed',payload:id})}}/>
    </div>
     </FlexGrid.Col>
    <FlexGrid.Col xs={8} sm={10} md={10} lg={10} xl={10} >
        <Text size="large">{text}</Text>
     </FlexGrid.Col> 
    <FlexGrid.Col xs={2} sm={1} md={1} lg={1} xl={1} >
    <IconButton icon={Delete} onClick={()=>dispatch({type:'Delete',payload:id})} a11yText="Delete" />
    </FlexGrid.Col>
    </FlexGrid.Row>
    </Box>
    </FlexGrid>
    // </div>
  )
}