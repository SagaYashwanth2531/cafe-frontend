// import React from 'react'

// export default function Temp() {
//   const handleClick=()=>{
//     alert("Hello World");
//   };
//   const handleSubmit=(name)=>{
//   alert(`Hello${name}`);
//   };
//   return (
//     <div>
//       <button onClick={handleClick}>Click</button><br/>
//       <button onClick={handleSubmit("Yash")}>Submit</button>
//     </div>
//   )
// }

import React, { useState } from 'react';

export default function Temp() {
  const [score, setScore] = useState(0);

  const updateScore = () => {
    setScore(score + 1); 
  };
  const reduces = () => {
    setScore(score - 1); 
  };

  return (
    <div>
      <h1>{score}</h1>
      <p>
        <button onClick={updateScore}>Update Score</button>
        <button onClick={reduces}>Decrease</button>
      </p>
    </div>
  );
}


