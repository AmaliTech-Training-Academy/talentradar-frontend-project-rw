export interface Session {
    id: string;
    user:{
        id:string;
        email: string;
        fullName: string;
    }
    ipAddress: string;
    deviceInfo: string;
    active: boolean;
    sessionId: string;
    createdAt: string;
}