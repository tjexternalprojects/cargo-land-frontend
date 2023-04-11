import api from './api.services'

const login=(loginData:Record<string,string>)=>{
    return api.post('/user/login', loginData)
}

const signup = (signUpData:Record<string, string>)=>{
    return api.post('/user/register', signUpData)
}

const AuthServices = {
    login,
    signup
}
export default AuthServices