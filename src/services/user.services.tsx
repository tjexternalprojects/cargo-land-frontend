import { AppContextType, AppContext } from '@/context';
import { useContext } from 'react';
import api from './api.services'
import {TokenServices} from '@/services'

 const getSingleUser = () => {
    const user_info = TokenServices.getUserInfo();
    const user = user_info ? JSON.parse(user_info) : null;

     return api
      .get('/user/single-user/' + user.id)
  
}
const UserServices = {
  getSingleUser
}

export default UserServices;





