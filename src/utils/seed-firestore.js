const db = require("../app/firestore");

async function seedFirestore() {
	// 'articles' collection
	db.collection('articles').doc('sample').set({
		title: 'Rice Planting Season',
		category: 'News',
		content: 'The planting season for rice has officially begun. Farmers are encouraged to start planting their rice crops as soon as possible.',
		createdAt: new Date().toLocaleString('en-US', {
			timeZone: 'Asia/Jakarta'
		}),
		pictureLink: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHZqj-XReJ2R76nji51cZl4ETk6-eHRmZBRw&s'
	});

	// 'predictions' collection
	db.collection('predictions').doc('sample').set({
		disease: 'BrownSpot',
		confidenceScore: 99.99,
		createdAt: new Date().toLocaleString('en-US', {
			timeZone: 'Asia/Jakarta'
		}),
		leafPictureLink: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHZqj-XReJ2R76nji51cZl4ETk6-eHRmZBRw&s'
	});

	// 'reminders' collection
	db.collection('reminders').doc('sample').set({
		activities: ['Water', 'Fertilize', 'Spray Pesticides'],
		isActive: true,
		repeatEvery: 7,
		time: new Date().toLocaleString('en-US', {
			timeZone: 'Asia/Jakarta'
		}),
	});

	// 'suggestions' collection
	db.collection('suggestions').doc('BrownSpot').set({
		cares: [
			Map({
				detail: 'Urea, SP-36, and KCl Combination. Use nitrogen (200-250 kg urea), phosphorus (100-150 kg SP-36), and potassium (75-100 kg KCl). Apply 100% SP-36 a day before planting, 30% urea and 50% KCl at 7 days, 40% urea at 20 days, and 30% urea and 50% KCl at 30 days.',
				pictureLink: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHZqj-XReJ2R76nji51cZl4ETk6-eHRmZBRw&s',
				title: 'Fertilise with sufficient nitrogen and phosphorus at the appropriate rate.'
			}),
			Map({
				pictureLink: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHZqj-XReJ2R76nji51cZl4ETk6-eHRmZBRw&s',
				title: 'Maintain optimal irrigation: not too flooded and not too dry'
			})
		],
		impreciseTechniques: [
			Map({
				pictureLink: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHZqj-XReJ2R76nji51cZl4ETk6-eHRmZBRw&s',
				title: 'Unbalanced fertilisation, especially nitrogen and phosphorus deficiencies'
			})
		],
		mainCause: Map({
			pictureLink: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHZqj-XReJ2R76nji51cZl4ETk6-eHRmZBRw&s',
			title: 'Helmintosporium oryzae fungus'
		})
	});

	db.collection('suggestions').doc('Healthy').set({
		cares: [
			Map({
				detail: 'Urea, SP-36, and KCl Combination. Use nitrogen (200-250 kg urea), phosphorus (100-150 kg SP-36), and potassium (75-100 kg KCl). Apply 100% SP-36 a day before planting, 30% urea and 50% KCl at 7 days, 40% urea at 20 days, and 30% urea and 50% KCl at 30 days.',
				pictureLink: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHZqj-XReJ2R76nji51cZl4ETk6-eHRmZBRw&s',
				title: 'Follow the general nitrogen fertilisation of rice guidelines'
			}),
			Map({
				detail: 'The SRI planting model involves paddy fields with trenches and planting distances of 27 x 27 cm to 35 x 35 cm. One seed per hole is planted within 15 minutes of uprooting with the roots forming an L at a depth of 0.5-1 cm. Water conditions are sufficiently wet or humid to prevent root rot and increase productivity.',
				pictureLink: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHZqj-XReJ2R76nji51cZl4ETk6-eHRmZBRw&s',
				title: 'Follow general rice spacing guidelines'
			})
		]
	});

	db.collection('suggestions').doc('Hispa').set({
		cares: [
			Map({
				details: [
					'Performed before planting using organic fertiliser or NPK 15:15:15 fertiliser.',
					'Done once, about 7-10 days after planting using NPK 21:0:0 fertiliser.',
					'Done once, around 21-28 days after planting using NPK 15:10:10 fertiliser.',
					'Once, about 35-42 days after planting, using NPK 10:10:20 fertiliser.'
				],
				pictureLink: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHZqj-XReJ2R76nji51cZl4ETk6-eHRmZBRw&s',
				title: 'Fertilise with sufficient nitrogen and phosphorus at the appropriate rate.'
			}),
			Map({
				pictureLink: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHZqj-XReJ2R76nji51cZl4ETk6-eHRmZBRw&s',
				title: 'Give wider spacing when seeding, or reduce seeding rate'
			})
		],
		impreciseTechniques: [
			Map({
				pictureLink: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHZqj-XReJ2R76nji51cZl4ETk6-eHRmZBRw&s',
				title: 'Excessive nitrogen fertilisation'
			}),
			Map({
				pictureLink: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHZqj-XReJ2R76nji51cZl4ETk6-eHRmZBRw&s',
				title: 'Plant spacing is too tight, due to direct seeding'
			})
		],
		mainCause: Map({
			pictureLink: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHZqj-XReJ2R76nji51cZl4ETk6-eHRmZBRw&s',
			title: 'Leaf scraped by Rice Hispa bugs (Dicladispa armigera)'
		})
	});

	db.collection('suggestions').doc('LeafBlast').set({
		cares: [
			Map({
				detail: 'Urea, SP-36, and KCl Combination. Use nitrogen (200-250 kg urea), phosphorus (100-150 kg SP-36), and potassium (75-100 kg KCl). Apply 100% SP-36 a day before planting, 30% urea and 50% KCl at 7 days, 40% urea at 20 days, and 30% urea and 50% KCl at 30 days.',
				pictureLink: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHZqj-XReJ2R76nji51cZl4ETk6-eHRmZBRw&s',
				title: 'Follow the general nitrogen fertilisation of rice guidelines'
			}),
			Map({
				detail: 'The SRI planting model involves paddy fields with trenches and planting distances of 27 x 27 cm to 35 x 35 cm. One seed per hole is planted within 15 minutes of uprooting with the roots forming an L at a depth of 0.5-1 cm. Water conditions are sufficiently wet or humid to prevent root rot and increase productivity.',
				pictureLink: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHZqj-XReJ2R76nji51cZl4ETk6-eHRmZBRw&s',
				title: 'Follow general rice spacing guidelines'
			})
		],
		impreciseTechniques: [
			Map({
				pictureLink: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHZqj-XReJ2R76nji51cZl4ETk6-eHRmZBRw&s',
				title: 'Plant spacing is too tight'
			}),
			Map({
				pictureLink: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHZqj-XReJ2R76nji51cZl4ETk6-eHRmZBRw&s',
				title: 'Excessive irrigation'
			})
		],
		mainCause: Map({
			pictureLink: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHZqj-XReJ2R76nji51cZl4ETk6-eHRmZBRw&s',
			title: 'Presence of Pyricularia grisea fungus'
		})
	});

	// 'users' collection
	db.collection('users').doc('sample').set({
		email: 'sample@exaple.com',
		fullName: 'Sample User',
		favArticles: ['sample'],
		password: 'samplepassword',
		passwordChangedAt: new Date().toLocaleString('en-US', {
			timeZone: 'Asia/Jakarta'
		}),
		passwordResetToken: '',
		passwordResetTokenExpiry: '',
		predictions: ['sample'],
		profpicLink: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHZqj-XReJ2R76nji51cZl4ETk6-eHRmZBRw&s',
		reminders: ['sample'],
		userId: 'sample'
	});
}

seedFirestore();