import { useEffect, useState } from "react";

const Test=()=>{
    const [state,setState]=useState('Initial Value');
    const num=[1, 2, 3, 4, 5, 6];
    const evenno=num.filter(num=>num%2===0);
    const oddno=num.filter(num=>num%2!=0);
    useEffect(()=>{
       localStorage.setItem("data", JSON.stringify(state))

    },[state]);

    const arr=[
        { id: 1, name: "Alice", age: 25},
        {id: 2, name: "Bob", age: 30 },
        {
            id: 3, name: "Charlie", age: 35 
        }
    ];

    const numbers=[34, 78, 12, 90, 56, 101, 43];
    const maxnum=Math.max(...numbers);
    const min=Math.min(...numbers);
    //Reverse a String Using a Loop
    const[input, setInput]=useState("Urmila");
    const reversed=input.split("").reverse().join("");
    //remove duplicate array
    const ambiguious = [10, 20, 10, 30, 40, 20, 50];
    const duplicatearr=[...new Set(ambiguious)]    
    return(<>
    <h6>Filter even numbers and display them.</h6>
    <p>Remove Duplicates from an Array</p><div>
        <ul>{duplicatearr.map((item, index)=>(<li key={index} style={{color:"red"}}>{item}</li>))}</ul>
    </div>
    <ul>{evenno.map(item=><li key={item}>{item}</li>)}
        </ul>
        <h6>Filter odd numbers and display them.</h6>
        <ul>
            {oddno.map((item,index)=>(<li key={index}>{item}</li>))}
        </ul>
        <h6>How to persist state across reloads?{state}</h6>
        <div>
            <p style={{fontWeight:"bold", color:"red"}}>You have an array of objects representing users. Render them in a list using .map().</p>
            <ul>
                {arr.map((user, index)=>(<li key={index}>{user.id}-{user.name}-{user.age}</li>))}
            </ul>
            <p>Find the Largest Number in an Array</p>
            <strong>{maxnum}</strong>
            <br></br>
            <strong>{min}</strong>
            <input onChange={ (e)=>setInput(e.target.value)}/>
            <p style={{color:"red"}}>Reverse a String Using a Loop- {reversed}</p>
            <br>
            </br>
            
        </div>
        </>
        )
}

export default Test;