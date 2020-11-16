export interface ErrorPe {
    roomId: String,
    date: Date,
    detail: ErrorDetail
}
export interface ErrorDetail{
    code: String,
    description: String
}