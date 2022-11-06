
import React,{useState,useEffect} from 'react'
import io from 'socket.io-client'

const socket =io('http://localhost:3000')
const Home = () => {
 const [message,setMessage] = useState("")
 const [messages,setMessages] = useState([{
  body:"mensaje texto",
  from:"user1"
 }])
 const handleSubmit=(e)=>{
  e.preventDefault()
  socket.emit('message',message)
  const newMessage={
    body:message,
    from : "yo "
  }
  setMessages([newMessage,...messages])
  setMessage("")

  
 }
 useEffect(()=>{
  const recibirMsg=(message)=>{
   setMessages([message,...messages,])
  };
socket.on('message',recibirMsg)
return  ()=>{
  socket.off('message',recibirMsg)
}
 },[messages])
  return (
    <>
   <div className='h-screen bg-zinc-800 text-white flex items-center justify-center'>
   <form onSubmit={handleSubmit} className='bg-zinc-900 p-10 '>
    <h1 className='text-2x1 font-bold my-2'>Chat Clientes-Proveedores</h1>

    <input onChange={e=>setMessage(e.target.value)} value={message} type='text' className='border-2 border-zinc-500 p-2 text-black w-full'/>

<ul className='h-80 overflow-y-auto'>
{messages.map((message,index)=>(
<li key={index} className={`my-2 p-2 text-sm table rounded-md ${message.from === 'yo'? "bg-sky-700 ml-auto":"bg-black"}`}>
  <p>{message.from}:{message.body}</p>
</li>

   ))}

</ul>
   </form>

   </div>
    </>
  )
}

export default Home