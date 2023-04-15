import { useState, useEffect, useContext } from 'react';
import { ShipmentServices } from '@/services';
import { AppContextType, AppContext } from '@/context';
import { toast } from 'react-toastify';

function useUAllShipment() {
    const { state, setState } = useContext<AppContextType>(AppContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const userShipments = async () => {
            setLoading(true)
            await ShipmentServices.getAllUserShipment().then(res => {
                setLoading(false)
                console.log(res.data.allUserShipment)
                // setState({
                //     ...state,
                //     user_data: res.data.user
                // })
            },
                err => {
                    setLoading(false)
                    toast.error(err.response.data.message, {
                        progressClassName: "bg-red-500 h-1",
                        autoClose: 3000,
                    });
                    setError(err)
                    
                }
            )
        }
        userShipments();
    }, []);

    return [loading, error];
}
export default useUAllShipment

