import { AppContextType, AppContext } from '@/context';
import { useContext } from 'react';
import api from './api.services'
import {LocalStorageServices} from '@/services'

 const getSingleUser = () => {
    const user = LocalStorageServices.getUserInfo();
     return api
      .get('/user/single-user/' + user.id)
}

const updateUser = (user_data:FormData) =>{
  return api.patch('/user/update', user_data)
}

const UserServices = {
  getSingleUser,
  updateUser
}

export default UserServices;





