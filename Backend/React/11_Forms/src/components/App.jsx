import React, {useState} from "react";

function App() {
  const [name,setName] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("white");
  const [userInput, setUserInput] = useState("");

  function handleChange(event){
    setName(event.target.value);
  }

    function handleMouseOver() {
    setBackgroundColor("black");
  }

  function handleMouseOut(){
    setBackgroundColor("white");
  }

  function handleClick(){
    setUserInput(name);
  }

  return (
    <div className="container">
      <h1>Hello {userInput}</h1>
      <input 
      onChange={handleChange}
      type="text" 
      placeholder="What's your name?"
      value={name} 
      />
       <button 
      style={{ backgroundColor: backgroundColor }} 
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onClick={handleClick}
  
      >Submit</button>
    </div>
  );
}

export default App;
