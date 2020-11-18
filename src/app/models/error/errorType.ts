export interface ErrorType {
    roomId: String,
    day: String,
    hour: String,
    detail: ErrorDetail
}
export interface ErrorDetail{
    code: String,
    description: String
}