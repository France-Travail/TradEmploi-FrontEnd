export interface ErrorType {
    roomId: string;
    day: string;
    hour: string;
    detail: ErrorDetail;
}
export interface ErrorDetail{
    code: string;
    description: string;
}
