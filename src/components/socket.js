import io from "socket.io-client";
import backendOrigin from '../config/origins';
import { handleUID } from '../data';

handleUID();
let uid = localStorage.getItem('uid');
let socket = io(backendOrigin, { transports: ["websocket"], query: uid });
export default socket;