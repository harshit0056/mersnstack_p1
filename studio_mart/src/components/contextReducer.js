import React, { createContext, useReducer, useContext } from 'react';

const cartStateContext = createContext();
const cartDispatchContext = createContext();

const reducer = (state, action) => {
  
  switch(action.type){
    case "ADD":
        return [...state,{id:action.id,name:action.name,price:action.price,qnt:action.qnt,size:action.size}]
    case "REMOVE":
        let newarr=[...state]
        newarr.splice(action.index,1)
        return newarr

    case "UPDATE":
      let arr=[...state]
      arr.find((food,index)=>{
        if(food.id===action.id){
          arr[index]={...food,qnt:parseInt(action.qnt)+food.qnt,price:action.price + food.price}
        }
        return arr
      })
      return arr

    case "DROP":
      let emptyarr=[]
      return emptyarr

        default :
        console.log("reducer error")

  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);
  return (
    <cartDispatchContext.Provider value={dispatch}>
      <cartStateContext.Provider value={state}>
        {children}
      </cartStateContext.Provider>
    </cartDispatchContext.Provider>
  );
};

export const useCart = () => useContext(cartStateContext);
export const useDispatchCart = () => useContext(cartDispatchContext);