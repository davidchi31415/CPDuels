import dotenv from 'dotenv';

dotenv.config();
const DEBUG = process.env.DEBUG ? false : true;

export default DEBUG;