import io from "socket.io-client";
let socket = io("http://localhost:8081");
export default socket;