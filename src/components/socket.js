import io from "socket.io-client";
let socket = io("https://cpduels-backend.onrender.com:8081/");
export default socket;