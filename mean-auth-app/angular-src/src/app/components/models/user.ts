export interface User {
    name: string;
    username: string;
    email: string;
    password: string;
}

export interface ServerResponse {
    success: boolean;
    msg: string;
    token?: string;
    user?: User;
}

export interface UserLogin {
    username: string;
    password: string;
}
