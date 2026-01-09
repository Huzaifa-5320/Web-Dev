import React, {useState} from "react";

function App() {

  const [headingText, setHeadingText] = React.useState("Hello");
  const [backgroundColor, setBackgroundColor] = useState("white");

  function handleClick() {
    setHeadingText("Submmited");
  }

  function handleMouseOver() {
    setBackgroundColor("black");
  }

  function handleMouseOut(){
    setBackgroundColor("white");
  }


  return (
    <div className="container">
      <h1>{headingText}</h1>
      <input type="text" placeholder="What's your name?" />
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
