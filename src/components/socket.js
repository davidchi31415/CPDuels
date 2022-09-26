import io from "socket.io-client";
let socket = io("https://cpduels-backend.onrender.com/");
export default socket;