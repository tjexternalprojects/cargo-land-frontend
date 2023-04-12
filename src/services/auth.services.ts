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
const AuthServices = {
    login,
    signup, 
    resendVerification,
    forgotPassword
}
export default AuthServices