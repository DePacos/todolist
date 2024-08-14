export  type FieldErrorType = {
  field: string,
  error: string,
}

export type BaseResponse<D = {}> = {
  resultCode: number
  messages: string[]
  fieldsErrors?: FieldErrorType[]
  data: D
}

export type RejectAppError = {
  error: BaseResponse
  type: "appError"
}

export type RejectCatchError = {
  error: unknown
  type: "catchError"
}

export type RejectActionError = RejectAppError | RejectCatchError