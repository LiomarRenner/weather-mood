// Shared lifecycle of an async request, reused by every module that loads data
export type RequestStatus = 'loading' | 'error' | 'success'
