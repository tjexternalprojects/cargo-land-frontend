import { AppContextType, AppContext } from '@/context';
import { useContext } from 'react';
import api from './api.services'
import {LocalStorageServices} from '@/services'

 const getSingleUser = () => {
    const user_info = LocalStorageServices.getUserInfo();
    const user = user_info ? JSON.parse(user_info) : null;

     return api
      .get('/user/single-user/' + user.id)
  
}
const UserServices = {
  getSingleUser
}

export default UserServices;





