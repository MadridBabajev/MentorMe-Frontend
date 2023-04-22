import {createContext} from "react";
import IJWTResponse from "../dto/IJWTResponse";

// TODO: Make language context as well?

const JwtContext = createContext<{
    jwtResponse: IJWTResponse | null,
    setJwtResponse: ((data: IJWTResponse | null) => void) | null
}>({ jwtResponse: null, setJwtResponse: null });

export default JwtContext;