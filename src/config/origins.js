import DEBUG from "./debug";
const backendOrigin = DEBUG ? 'http://localhost:8080' : 'https://cpduels-backend.onrender.com';
console.log(backendOrigin);
export default backendOrigin;