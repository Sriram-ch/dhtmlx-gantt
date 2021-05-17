import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
	createDb() {
		let task = [

			{ id: 1, procurement: 'PRO2893', start_date: '2021-04-12 00:00', progress: 0.6, building: 'Building01', product: 'Metamizol Na', Campaign: '', type: "project" },
			{ id: 2, procurement: 'PRO2894', start_date: '2021-04-13 00:00', progress: 0.4, building: 'Building01', product: 'Metamizol Na', Campaign: '', type: "project" },
			{
				id: 3, procurement: 'PRO2895', start_date: '2021-04-14 00:00', progress: 0.8, building: 'Building01', product: 'Metamizol Na', Campaign: '', type: "project"
			},
			{ id: 4, procurement: 'PRO-Clean#01', start_date: '2021-04-15 00:00', building: 'Building01', product: 'Metamizol Na', Campaign: '', type: "project" },
			{
				id: 5, procurement: 'PRO2896', start_date: '2021-04-13 00:00', progress: 0.8, building: 'Building01', product: 'Metamizol Na', Campaign: '', type: "project"
			},
			{ id: 6, procurement: 'PRO-Clean#02', start_date: '2021-04-14 00:00', building: 'Building01', product: 'Metamizol Na', Campaign: '', type: "project" },
			{ id: 7, procurement: 'PRO2897', start_date: '2021-04-12 00:00', progress: 0.7, building: 'Building01', product: 'Metamizol Mg', Campaign: '', type: "project" },
			{
				id: 8, procurement: "PRO2898", start_date: "2021-04-13 00:00", type: "project", building: 'Building01', product: 'Metamizol Mg'
			},
			{ id: 9, procurement: 'PRO-Clean#03', start_date: '2021-04-14 00:00', building: 'Building01', product: 'Metamizol Mg', Campaign: '', type: "project" },
			{
				id: 10, text: "Reaction 212", start_date: "2021-04-13 00:00", duration: 1,
				parent: 8, Campaign: ''
			},
			{
				id: 11, text: "Crystalization 412", start_date: "2021-04-14 00:00", duration: 2,
				parent: 8, Campaign: ''
			},
			{
				id: 12, text: "Centrifugation 543", start_date: "2021-04-16 00:00", duration: 2,
				parent: 8, Campaign: ''
			},
			{
				id: 13, text: "Drying 781", duration: 1, start_date: "2021-04-20 00:00",
				parent: 8, Campaign: ''
			},
			{
				id: 14, text: "Reaction 212", start_date: "2021-04-12 00:00", duration: 1,
				parent: 1, Campaign: ''
			},
			{
				id: 15, text: "Crystalization 412", start_date: "2021-04-13 00:00", duration: 2,
				parent: 1, Campaign: ''
			},
			{
				id: 16, text: "Centrifugation 543", start_date: "2021-04-15 00:00", duration: 2,
				parent: 1, Campaign: ''
			},
			{
				id: 17, text: "Drying 781", duration: 1, start_date: "2021-04-19 00:00",
				parent: 1, Campaign: ''
			},
			{
				id: 18, text: "Reaction 212", start_date: "2021-04-13 00:00", duration: 1,
				parent: 2, Campaign: ''
			},
			{
				id: 19, text: "Crystalization 412", start_date: "2021-04-14 00:00", duration: 2,
				parent: 2, Campaign: ''
			},
			{
				id: 20, text: "Centrifugation 543", start_date: "2021-04-16 00:00", duration: 2,
				parent: 2, Campaign: ''
			},
			{
				id: 21, text: "Drying 781", duration: 1, start_date: "2021-04-20 00:00",
				parent: 2, Campaign: ''
			},
			{
				id: 22, text: "Reaction 212", start_date: "2021-04-14 00:00", duration: 1,
				parent: 3, Campaign: ''
			},
			{
				id: 23, text: "Crystalization 412", start_date: "2021-04-15 00:00", duration: 2,
				parent: 3, Campaign: ''
			},
			{
				id: 24, text: "Centrifugation 543", start_date: "2021-04-19 00:00", duration: 2,
				parent: 3, Campaign: ''
			},
			{
				id: 25, text: "Drying 781", duration: 1, start_date: "2021-04-21 00:00",
				parent: 3, Campaign: ''
			},
			{
				id: 26, text: "", start_date: "2021-04-15 00:00", end_date: "2021-04-15 04:00",
				parent: 4, Campaign: ''
			},
			{
				id: 27, text: "", start_date: "2021-04-19 00:00", end_date: "2021-04-19 04:00",
				parent: 4, Campaign: ''
			},
			{
				id: 28, text: "", start_date: "2021-04-21 00:00", end_date: "2021-04-21 04:00",
				parent: 4, Campaign: ''
			},
			{
				id: 29, text: "", start_date: "2021-04-22 00:00", end_date: "2021-04-22 04:00",
				parent: 4, Campaign: ''
			},
			{
				id: 30, text: "Reaction 212", start_date: "2021-04-13 00:00", duration: 1,
				parent: 5, Campaign: ''
			},
			{
				id: 31, text: "Crystalization 412", start_date: "2021-04-14 00:00", duration: 2,
				parent: 5, Campaign: ''
			},
			{
				id: 32, text: "Centrifugation 543", start_date: "2021-04-16 00:00", duration: 2,
				parent: 5, Campaign: ''
			},
			{
				id: 33, text: "Drying 781", duration: 1, start_date: "2021-04-20 00:00",
				parent: 5, Campaign: ''
			},
			{
				id: 34, text: "", start_date: "2021-04-14 00:00", end_date: "2021-04-14 04:00",
				parent: 6, Campaign: ''
			},
			{
				id: 35, text: "", start_date: "2021-04-16 00:00", end_date: "2021-04-16 04:00",
				parent: 6, Campaign: ''
			},
			{
				id: 36, text: "", start_date: "2021-04-20 00:00", end_date: "2021-04-20 04:00",
				parent: 6, Campaign: ''
			},
			{
				id: 37, text: "", start_date: "2021-04-21 00:00", end_date: "2021-04-21 04:00",
				parent: 6, Campaign: ''
			},
			{
				id: 38, text: "Reaction 212", start_date: "2021-04-12 00:00", duration: 1,
				parent: 7, Campaign: ''
			},
			{
				id: 39, text: "Crystalization 412", start_date: "2021-04-13 00:00", duration: 2,
				parent: 7, Campaign: ''
			},
			{
				id: 40, text: "Centrifugation 543", start_date: "2021-04-15 00:00", duration: 2,
				parent: 7, Campaign: ''
			},
			{
				id: 41, text: "Drying 781", duration: 1, start_date: "2021-04-19 00:00",
				parent: 7, Campaign: ''
			},
			{
				id: 42, text: "Reaction 212", start_date: "2021-04-13 00:00", duration: 1,
				parent: 8, Campaign: ''
			},
			{
				id: 43, text: "Crystalization 412", start_date: "2021-04-14 00:00", duration: 2,
				parent: 8, Campaign: ''
			},
			{
				id: 44, text: "Centrifugation 543", start_date: "2021-04-16 00:00", duration: 2,
				parent: 8, Campaign: ''
			},
			{
				id: 45, text: "Drying 781", duration: 1, start_date: "2021-04-20 00:00",
				parent: 8, Campaign: ''
			},
			{
				id: 46, text: "", start_date: "2021-04-14 00:00", end_date: "2021-04-14 04:00",
				parent: 9, Campaign: ''
			},
			{
				id: 47, text: "", start_date: "2021-04-16 00:00", end_date: "2021-04-16 04:00",
				parent: 9, Campaign: ''
			},
			{
				id: 48, text: "", start_date: "2021-04-20 00:00", end_date: "2021-04-20 04:00",
				parent: 9, Campaign: ''
			},
			{
				id: 49, text: "", start_date: "2021-04-21 00:00", end_date: "2021-04-21 04:00",
				parent: 9, Campaign: ''
			},

		];

		let link = [

			{ id: 1, source: 12, target: 13, type: '0' },
			{ id: 2, source: 10, target: 11, type: '0' },
			{ id: 3, source: 11, target: 12, type: '0' },
			{ id: 4, source: 14, target: 15, type: '0' },
			{ id: 5, source: 15, target: 16, type: '0' },
			{ id: 6, source: 16, target: 17, type: '0' },
			{ id: 7, source: 18, target: 19, type: '0' },
			{ id: 8, source: 19, target: 20, type: '0' },
			{ id: 9, source: 20, target: 21, type: '0' },
			{ id: 10, source: 22, target: 23, type: '0' },
			{ id: 11, source: 23, target: 24, type: '0' },
			{ id: 12, source: 24, target: 25, type: '0' },
			// {id: 13, source: 26, target: 27, type: '0'},
			// {id: 14, source: 27, target: 28, type: '0'},
			// {id: 15, source: 28, target: 29, type: '0'},
			{ id: 16, source: 30, target: 31, type: '0' },
			{ id: 17, source: 31, target: 32, type: '0' },
			{ id: 18, source: 32, target: 33, type: '0' },
			// {id: 19, source: 34, target: 35, type: '0'},
			// {id: 20, source: 35, target: 36, type: '0'},
			// {id: 21, source: 36, target: 37, type: '0'},
			{ id: 22, source: 38, target: 39, type: '0' },
			{ id: 23, source: 39, target: 40, type: '0' },
			{ id: 24, source: 40, target: 41, type: '0' },
			{ id: 25, source: 42, target: 43, type: '0' },
			{ id: 26, source: 43, target: 44, type: '0' },
			{ id: 27, source: 44, target: 45, type: '0' },
			// {id: 28, source: 46, target: 47, type: '0'},
			// {id: 29, source: 47, target: 48, type: '0'},
			// {id: 30, source: 48, target: 49, type: '0'},

		];
		return { task, link };
	}
}