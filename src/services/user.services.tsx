import { AppContextType, AppContext } from '@/context';
import { useContext } from 'react';
import api from './api.services'
import {LocalStorageServices} from '@/services'

 const getSingleUser = () => {
    const user = LocalStorageServices.getUserInfo();

     return api
      .get('/user/single-user/' + user.id)
  
}
const UserServices = {
  getSingleUser
}

export default UserServices;





