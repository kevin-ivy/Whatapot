// //Create a New Context Object
// import React, { createContext, useContext } from "react";
// import { useProductReducer } from './reducers';


// const StoreContext = createContext();
// const { Provider } = StoreContext;

// const StoreProvider = ({ value = [], ...props }) => {
//     const [state, dispatch] = useProductReducer({
//         products: [],
//         cart: [],
//         cartOpen: false,
//         categories: [],
//         currentCategory: ''
//     });
//     //use this to confirm that it works!
//     console.log(state);
//     return <Provider value={[state, dispatch]} {...props} />;
// };