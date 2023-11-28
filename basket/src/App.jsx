import React, { useEffect, useState } from 'react'
import './App.css';

function App() {
  const [api, setApi] = useState([])
    // const [count, setCount] = useState(0)
    const [basket, setBasket] = useState(
        localStorage.getItem("basket")
          ? JSON.parse(localStorage.getItem("basket"))
          : []
      );

    function getApi(){
        fetch("https://northwind.vercel.app/api/products")
        .then(res => res.json())
        .then(data=>setApi(data))
    }
    useEffect(() => {
     getApi()
    }, [])
    useEffect(() => {
        localStorage.setItem("basket", JSON.stringify(basket));
      }, [basket]);

     function add(newitem){
      let elementindex = basket.findIndex((x)=>x.id===newitem.id)
      if(elementindex !== -1){
        const newBasket=[...basket]
        newBasket[elementindex].count++
        setBasket(newBasket)
      }
     else{
      setBasket([...basket,{...newitem,count:1}]);
     }
     }
function remove(id){
  setBasket(basket.filter((x)=>x.id !==id))
}



function setCountValue(isAdd,newitem){
  let elementindex = basket.findIndex((x)=>x.id===newitem.id)
  const newBasket=[...basket]
  if(isAdd){
    newBasket[elementindex].count++
    setBasket(newBasket)
  }
  else{
    if(newBasket[elementindex].count > 1){
    newBasket[elementindex].count--
    setBasket(newBasket)
    }
  }
}


  return (
    <div>
        <div className='Basket'>
           <h1>Basket</h1> 
           <div className='basketProducts'>
           {basket.map((item)=>{
            return(
            <ul key={item.id}>
                <li>{item.id}</li>
                <li>{item.name}</li>
                <li>Sayi:{item.count}
                </li>
                <button className="plas" onClick={()=>setCountValue(true,item)}>+</button>
                <button className="minus" onClick={()=>setCountValue(false,item)}>-</button>
                <button className="dlt"  onClick={()=>remove(item.id)}>Remove</button>
            </ul>
                )})}
                </div>
        </div>

        <div className='products'>
          <h1>All products</h1>
          <div className='allBasketProducts'>
            {api.map((x)=>{
            return(
            <ul key={x.id}>
                <li>{x.id}</li>
                <li>{x.name}</li>
                <button className='add' onClick={()=>add(x)}>Add Basket <i class="fa-solid fa-cart-shopping"></i></button>
            
            </ul>
                )})}
        </div>
        </div>
    </div>
  )
}
export default App;