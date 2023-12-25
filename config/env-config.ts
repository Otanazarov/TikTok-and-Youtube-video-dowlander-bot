import {config} from "dotenv"
import {cleanEnv,str} from "envalid"

config()

export const env = cleanEnv (process.env,{
    BOTTOKEN:str(),
    NINJA_API_KEY:str()
});