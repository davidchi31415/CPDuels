const DEBUG = process.env.REACT_APP_VERCEL_ENV ? false : true;
if (DEBUG) console.log("DEBUG");
export default DEBUG;