function useShipmentIDModal(setShowTrackingIdInput: React.Dispatch<React.SetStateAction<boolean>>,){
    const handleCloseModal =()=>{
        setShowTrackingIdInput(false)
    }
    return {handleCloseModal}
}
export default useShipmentIDModal