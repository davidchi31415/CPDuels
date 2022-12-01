import DEBUG from "./debug";
const backendOrigin = DEBUG ? 'http://localhost:8080' : 'https://cpduels-backend-production.up.railway.app';
if (DEBUG) console.log(backendOrigin);
export default backendOrigin;