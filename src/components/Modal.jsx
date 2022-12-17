import React from 'react'

function Modal({ setModalShow,item,modal }) {
    return (
        <section className='modal'>
        <div className='modal-container'>
              <button className='delete' onClick={() =>setModalShow(false) } >X</button>
            {modal.map((a)=>(
                <div key={a.id} className="orders">
                    <div className="heading">
                    <h1>Total Amount---{a.total_amount}AZN</h1>
                    <h2>Waiter-{a.waiter.name}</h2>
                    <h3>Table N^{a.table.name}</h3>
                    </div>
                    <div id='line'></div>
           <div key={a.id} className="container">{a.meals.map((b)=>(
            <div key={b.id}>
            <h2>Name---{b.name}</h2>
            <h3>Count--- {b.count}</h3>
            <h4>Price---{b.price}AZN</h4>
            <h1>------</h1>
            </div>  ))}
            
            </div>
              </div>
            ))}
          
        </div>
        </section>
    )
}

export default Modal