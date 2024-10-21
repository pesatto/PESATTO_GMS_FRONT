export interface AuthGeneric {
    error: boolean,
    data: any,
    message: string,
    token: string
}

export interface User {
    _id: string;
    fullname: string;
    email: string;
    user_type: number;
    userpassword: string;
    active: boolean;
    __v: number;
    company: Company;
  }
export  interface Company {
    _id: string;
    name: string;
    rfc: string;
    __v: number;
  }