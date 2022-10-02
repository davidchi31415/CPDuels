import DEBUG from "./debug";
const backendOrigin = DEBUG ? 'http://localhost:8080' : 'wss://cpduels-backend.onrender.com';
console.log(backendOrigin);
export default backendOrigin;