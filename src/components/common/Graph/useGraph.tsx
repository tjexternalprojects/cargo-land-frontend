import React, { useState } from 'react';

function useGraph() {
	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: 'left' as const,
			},
		},
	};

	return {
		options,
	};
}

export default useGraph;
