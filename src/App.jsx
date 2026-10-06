// import React, { useContext } from "react";
// import FolderStructure from "./components/FolderStructure";
// import "./App.css";
// import Input from "./components/input";
// import { createContext, useReducer, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   increment,
//   incrementByAmount,
//   incrementAsync,
// } from "./state/counter/counterSlice";
import Events from "./components/Events";
// import Modal from "./components/modal";
// import Virtualized from "./components/Virtualized";
// import DataTable from "./components/DataTable";
// import StarRating from "./components/StarRating";
// import OTPInput from "./components/OTPInput";
// import DragNDrop from "./components/DragNDrop";
// import TicTacToe from "./components/TicTacToe";
// import AutoComplete from "./components/Autocomplete";
// import TrafficLights from "./components/TrafficLights";
// import Toast from "./components/Toast/Toast";
// import { ToastContext } from "./Contexts/toastContext";
// import Accordion from "./components/Accordion/Accordion";
// import FillUnfill from "./components/FillUnfill";
// import FileUpload from "./components/FileUpload";

// const initialState = {
//   user: "Sujai",
//   theme: "Dark",
// };
// const myReducer = function (state, action) {
//   switch (action.type) {
//     case "SET_USER":
//       return { ...state, user: action.payload };
//     case "SET_THEME":
//       return { ...state, user: action.payload };
//     default:
//       return state;
//   }
// };
// export const UserContext = createContext(null);
// export const DispatchContext = createContext(null);

// const DelayedComponent = React.lazy(() => {
//   return new Promise((res) => {
//     setTimeout(() => {
//       res(import("./components/Autocomplete"));
//     }, 3000);
//   });
// });

function App() {
  // const [state, dispatch] = useReducer(myReducer, initialState);
  // const starMax = 5;
  // const count = useSelector((state) => state.counter.value);
  // const [isOpen, setIsOpen] = useState(false);
  // const [starValue, setStarValue] = useState(2.5);
  // const [otp, setOtp] = useState();

  // const dispatch = useDispatch();

  return (
    <>
      <Events />
      {/* <DataTable />
      <Toast> 
       <FileUpload />
        <FillUnfill />
        <Accordion /> 
      <TrafficLights />
      <React.Suspense fallback={<h2>Loading...</h2>}>
          <DelayedComponent />
        </React.Suspense> 
      {<AutoComplete /> 
      <TicTacToe /> 
       <UserContext.Provider value={state}>
        <DispatchContext.Provider value={dispatch}> 
       <DragNDrop />
        <OTPInput max={6} setOtp={setOtp} />
        <br /> 
       OTP is: {otp}
        <StarRating
          max={starMax}
          value={starValue}
          setStarValue={setStarValue}
        /> 
       <FolderStructure /> 
       <Modal title={"Modal"} isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <p>
            Critical. React Context Providers look strictly for a value prop.
            Passing causes consumers invoking useContext(UserContext) to receive
            the default value (null) instead of the active state.
          </p>
        </Modal>
        <button onClick={() => setIsOpen(true)}>Open Modal</button>
        <button onClick={() => dispatch(incrementAsync(12))}>Increment</button>
        <button onClick={() => dispatch(incrementByAmount(10))}>
          Increment by amount
        </button>
        {count}
        <Input /> 
       </DispatchContext.Provider>
      </UserContext.Provider> 
       <Virtualized /> 
       </Toast> */}
    </>
  );
}

export default App;
