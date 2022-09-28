import io from "socket.io-client";
import backendOrigin from '../config/origins';
let socket = io(backendOrigin);
export default socket;