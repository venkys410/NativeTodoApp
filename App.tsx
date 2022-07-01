

import React, { useEffect, useRef, useState } from 'react';
import {
  
  FlatList,
  StyleSheet,
  Text,  
  TextInput,  
  TouchableOpacity,  
  View,
} from 'react-native';
import Todo from './types'
import TodoItem from './components/TodoItem';



const App = () => {

  const [todo,setTodo] = useState<string>('')
  const [todos,setTodos] = useState<Todo[]>([]) 

  const inputRef = useRef<TextInput>(null)

  useEffect(()=>{
    inputRef.current?.focus()
  })
  
  const handleAdd=()=>{
    if (todo){
      setTodos([...todos,{
      id : Date.now(),
      text : todo,
    }])
    setTodo('')
    }
    
  }

  return (
    <View style={styles.appContainer}>
      <Text style={styles.appTitle}>Todo App</Text>
      <View style={styles.inputBtnView}>
        <TextInput style={styles.inputBox} placeholder='Enter a todo'
         onChangeText={(text)=>setTodo(text)}
         value={todo}
         ref = {inputRef}
        />
        <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
          <Text style={styles.btnTxt}>ADD</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.todosItems}>
        <FlatList 
         keyExtractor={(item)=>item.id.toString()}
         data={todos}
         renderItem={({item})=>(<TodoItem todo={item} todos={todos} setTodos={setTodos}/>)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  appContainer:{
    flex:1,
    backgroundColor:"#6bbffa",
    paddingTop:10,
  }, 
  appTitle:{
    fontSize:25,
    color:'black',
    fontWeight:'800',
    textAlign:"center"
  },
  inputBtnView:{    
    flexDirection:'row',
    alignItems:'center',
    margin:10,
  },
  inputBox:{
    flex:1,
    borderRadius:10,
    shadowColor:'black',
    elevation:10,
    margin:10,
    backgroundColor:'white',
    paddingLeft:10,
  },
  addBtn:{
    backgroundColor:"#954af7",
    borderRadius:8,
    padding:15,

  },
  btnTxt:{
    color:'#ffffff',
    fontSize:15,
  },
  todosItems:{
    flex:1,    
  }
});

export default App;
