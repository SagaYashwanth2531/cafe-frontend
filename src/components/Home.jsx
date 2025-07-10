import "./Home.css"
export default function Home({name,age})
{
  let id=12306587
  return(
    <>
  <h1 style={{backgroundColor:"orange",color:"black"}}>Hellow {name} you are {age} years old!</h1>

  <h2 className="App-Home-Header">Your Student ID is{id}</h2>
  <p style={{backgroundColor:"green", color:"black"}}>This is paragraph</p>
  </>
)
}
