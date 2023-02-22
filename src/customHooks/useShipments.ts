import {useState} from 'react'
function useShipment (){
    const [newShipment, setNewShipment] = useState([])

    const handleNewShipment = ()=>{

    }
    return {handleNewShipment}
} 
export default useShipment