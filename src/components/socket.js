import io from "socket.io-client";
import DEBUG from "../config/debug";
import { handleUID } from '../data';

handleUID();
let uid = localStorage.getItem('uid');
const socketOrigin = DEBUG ? 'http://localhost:8080' : 'https://cpduels-backend.onrender.com';
let socket = io(socketOrigin, { transports: ["websocket", "polling"], query: uid });
export default socket;