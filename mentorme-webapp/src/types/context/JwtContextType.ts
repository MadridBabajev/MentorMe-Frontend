import IJWTResponse from "../dto/identity/IJWTResponse";

export interface JwtContextType {
    jwtResponse: IJWTResponse | null,
    setJwtResponse: ((data: IJWTResponse | null) => void) | null
}