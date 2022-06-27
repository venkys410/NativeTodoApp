import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Todo from '../../types'

type TodoProps={
    todo : Todo
    todos : Todo[]
    setTodos : React.Dispatch<React.SetStateAction<Todo[]>>
}

export default function TodoItem({todo,todos,setTodos}:TodoProps) {

    const [edit,setEdit] = useState<boolean>(false);
    const [editTodo,setEditTodo] = useState<string>(todo.text);

    const inputRef = useRef<TextInput>(null)

    useEffect(()=>{
        inputRef.current?.focus()
    },[edit])



    const handleEdit = () =>{
        if (!edit){
            setEdit(!edit)
        }else{
            setEdit(!edit)
            setTodos(
                todos.map((t)=>(
                    t.id === todo.id ? {...t,text:editTodo}: t
                ))
            )
        }
    }

    const handleDelete=()=>{
        setTodos(
            todos.filter((t)=>t.id !== todo.id)
        )
    }

  return (
    <View style={styles.todoItem}>
        {
            !edit? <Text style={styles.todoText}>{todo.text}</Text>:<TextInput style={styles.editBox} value={editTodo} onChangeText={(text)=>setEditTodo(text)} ref={inputRef}/>
        }
      
      <TouchableOpacity style={styles.editBtn} onPress={handleEdit}>
        <Text style={styles.btnTxt}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleDelete}>
        <Text style={styles.btnTxt}>Delete</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  todoItem : {
    flexDirection:'row',
    flex:1,
    alignItems:'center',
    marginHorizontal:10,
    paddingHorizontal:15,
    paddingVertical:10,
    backgroundColor : "#6cf5cc",
    borderRadius:20,
    shadowColor:'#000000',
    elevation:10,
    marginVertical:5
  },
  todoText:{
    flex:1,
    fontSize:20,
    fontWeight:'800',
    color:"#954af7",
  },
  editBtn:{
    marginRight:10,
  },
  btnTxt:{
    color:"black",
    fontWeight:'600'
  },
  editBox:{
    flex:1,
    backgroundColor:"white",
    marginRight:5,
    paddingHorizontal:5,
    fontSize:18,
    paddingVertical:5,
  },
})