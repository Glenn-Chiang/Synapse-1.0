import socket from "../socket"

export default function Logout() {
  const handleClick = () => {
    localStorage.clear()
    socket.disconnect()
  }

  return <button onClick={handleClick}>Logout</button>
}