function useDashboard() {
	// Items Delivered
	const labels = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];

	const received_data = {
		labels,
		datasets: [
			{
				label: 'Dataset 1',
				data: [2, 3, 3, 5, 6, 7, 8, 1, 3, 5, 3, 0],
				backgroundColor: [
					'red',
					'green',
					'yellow',
					'black',
					'pink',
					'blue',
					'purple',
					'violet',
					'lightbrown',
					'indigo',
					'silver',
					'gold',
					'peach',
				],
				borderWidth: 0,
			},
		],
	};

    const sent_data = {
		labels,
		datasets: [
			{
				label: 'Dataset 1',
				data: [12, 13, 13, 15, 16, 17, 18, 11, 13, 15, 13, 10],
				backgroundColor: [
					'red',
					'green',
					'yellow',
					'black',
					'pink',
					'blue',
					'purpule',
					'violet',
					'lightbrown',
					'indigo',
					'silver',
					'gold',
					'peach',
				],
				borderWidth: 0,
			},
		],
	};
	return {
        received_data,
		sent_data,
	};
}

export default useDashboard;
