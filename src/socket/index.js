import io from "socket.io-client";
import backendOrigin from "../config/origins";
import { getUID } from "../data";

let uid = getUID();
let socket = io(backendOrigin, {
  transports: ["websocket", "polling"],
  query: uid,
});
export default socket;
