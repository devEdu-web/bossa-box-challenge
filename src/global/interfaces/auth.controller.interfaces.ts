export interface registerUserPayload {
  firstName: string,
  lastName: string,
  email: string,
  password: string
}

export interface issueTokensPayload {
  email: string,
  password: string
}