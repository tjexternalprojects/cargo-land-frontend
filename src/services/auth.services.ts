import api from './api.services'

const login=(loginData:Record<string,string>)=>{
    return api.post('/user/login', loginData)
}

const signup = (signUpData:Record<string, string>)=>{
    return api.post('/user/register', signUpData)
}

const resendVerification = (email:string)=>{
    return api.post('/user/resend-verification', {email})
}

const forgotPassword = (email:string)=>{
    return api.post('/user/forgot-password', {email})
}

const resetPassword = (payload:Record<string, string | undefined>)=>{
    return api.post('/user/reset-password', payload)
}
const AuthServices = {
    login,
    signup, 
    resendVerification,
    forgotPassword,
    resetPassword,
}
export default AuthServices