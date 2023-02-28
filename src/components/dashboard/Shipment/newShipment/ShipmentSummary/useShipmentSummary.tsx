function useShipmentSummary(setAnimateTab: (value: string) => void) {
	const handleSummary = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
	
		setAnimateTab('item4');
	};

	return {
		handleSummary,
	};
}
export default useShipmentSummary;
