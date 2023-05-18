import IJWTResponse from "./IJWTResponse";
import {IError} from "../../errors/IError";

export type IdentityServiceResponse = [IJWTResponse | null, IError | null];