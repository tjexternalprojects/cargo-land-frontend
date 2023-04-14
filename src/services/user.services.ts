import { AppContextType, AppContext } from '@/context';
import { useContext } from 'react';
import api from './api.services'
import {TokenServices} from '@/services'

function UserServices(){
    const { state, setState } = useContext<AppContextType>(AppContext);

const getSingleUser=()=>{
        const user_info= TokenServices.getUserInfo()
        const user = user_info? JSON.parse(user_info):null
         api.get('/user/single-user/'+user.id).then((response)=>{
            const resp = response.data.user
            setState({
                ...state,
                user_data: resp,
            });
     console.log(state.user_data)
         },
         (error)=>{
            console.log(error)
            return error
         }
         )
    }
return { getSingleUser}
}

export default UserServices


