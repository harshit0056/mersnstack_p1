import React, { createContext, useReducer, useContext } from 'react';

const cartStateContext = createContext();
const cartDispatchContext = createContext();

const reducer = (state, action) => {
  switch(action.type){
    case "ADD":
      return [...state, { id: action.id, name: action.name, price: action.price, qnt: action.qnt, size: action.size }];
    case "REMOVE":
      let newarr = [...state];
      newarr.splice(action.index, 1);
      return newarr;
    case "UPDATE":
      return state.map(food => {
        if (food.id === action.id) {
          return {
            ...food,
            qnt: parseInt(food.qnt) + parseInt(action.qnt), // Parse both quantities to integers before addition
            price: parseFloat(food.price) + parseFloat(action.price) // Parse both prices to floats before addition
          };
        } else {
          return food;
        }
      });
    case "DROP":
      return [];
    default:
      console.log("reducer error");
      return state;
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