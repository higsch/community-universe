export const names = ['Alenka', 'Matthias'];
export const badgesPath =
	'https://docs.google.com/spreadsheets/d/e/2PACX-1vRpCAjLJ3LFdkMfCveb8UdHsJV9S6AwtfZqpbk_OuF5SRXcTtJ2RTiLeYRprjg_VoXoNTCCLlT6dl8X/pub?output=csv';
export const personalityPath =
	'https://docs.google.com/spreadsheets/d/e/2PACX-1vRpCAjLJ3LFdkMfCveb8UdHsJV9S6AwtfZqpbk_OuF5SRXcTtJ2RTiLeYRprjg_VoXoNTCCLlT6dl8X/pub?gid=1637274742&single=true&output=csv';
export const personalityColors = {
	Analyst: '#e60049',
	Leadership: '#0bb4ff',
	Designer: '#50e991',
	'Developer/Engineer': '#e6d800',
	Scientist: '#9b19f5',
	Journalist: '#dc0ab4',
	Freelancer: '#00bfa0',
};

export const flowLabels = {
	Alenka: [
		{
			href: 'label-path-Analyst',
			label: 'Analyst',
			color: personalityColors.Analyst,
			offset: '16',
		},
		{
			href: 'label-path-Leadership',
			label: 'Leadership',
			color: personalityColors.Leadership,
			offset: '16',
		},
		{
			href: 'label-path-Designer',
			label: 'Designer',
			color: personalityColors.Designer,
			offset: '16',
		},
		{
			href: 'label-path-Developer/Engineer',
			label: 'Developer/Engineer',
			color: personalityColors['Developer/Engineer'],
			offset: '16',
		},
		{
			href: 'label-path-Scientist',
			label: 'Scientist',
			color: personalityColors.Scientist,
			offset: '16',
		},
		{
			href: 'label-path-Journalist',
			label: 'Journalist',
			color: personalityColors.Journalist,
			offset: '16',
		},
		{
			href: 'label-path-Freelancer',
			label: 'Freelancer',
			color: personalityColors.Freelancer,
			offset: '16',
		}
	],
	Matthias: [
		{
			href: 'label-path-Analyst',
			label: 'Analyst',
			color: personalityColors.Analyst,
			offset: '16',
		},
		{
			href: 'label-path-Leadership',
			label: 'Leadership',
			color: personalityColors.Leadership,
			offset: '16',
		},
		{
			href: 'label-path-Designer',
			label: 'Designer',
			color: personalityColors.Designer,
			offset: '16',
		},
		{
			href: 'label-path-Developer/Engineer',
			label: 'Developer/Engineer',
			color: personalityColors['Developer/Engineer'],
			offset: '16',
		},
		{
			href: 'label-path-Scientist',
			label: 'Scientist',
			color: personalityColors.Scientist,
			offset: '16',
		},
		{
			href: 'label-path-Journalist',
			label: 'Journalist',
			color: personalityColors.Journalist,
			offset: '16',
		},
		{
			href: 'label-path-Freelancer',
			label: 'Freelancer',
			color: personalityColors.Freelancer,
			offset: '16',
		}
	]
};

export const personalityHeight = 5000;
export const finalStarAlenka = [5, 4, 4, 5, 2, 4, 3, 4, 3];
export const finalStarMatthias = [5, 5, 4, 5, 5, 4, 3, 4, 2];
// data: collection, analysis, cleaning
// visualization: design, building, storytelling
// society: leadership, management, community

export const careerImages = {
	Alenka: [
		{
			x: '50%',
			y: 2011.5,
			src: 'img/alenka_lab.png',
			alt: 'Alenka in the lab',
		},
		{
			x: '20%',
			y: 2018.5,
			src: 'img/alenka_pi.png',
			alt: 'Alenka as a PI',
		},
		{
			x: '60%',
			y: 2020.5,
			src: 'img/alenka_computer.png',
			alt: 'Alenka as a data scientist',
		},
		{
			x: '30%',
			y: 2022.5,
			src: 'img/alenka_researcher.png',
			alt: 'Alenka as a researcher',
		},
	],
	Matthias: [
		{
			x: '50%',
			y: 2014.2,
			src: 'img/matthias_lab.png',
			alt: 'Matthias in the lab',
		},
		{
			x: '5%',
			y: 2019.5,
			src: 'img/matthias_pi.png',
			alt: 'Matthias as a PI',
		},
		{
			x: '30%',
			y: 2021.2,
			src: 'img/matthias_freelance.png',
			alt: 'Matthias as a freelancer',
		},
		{
			x: '70%',
			y: 2021.9,
			src: 'img/matthias_journalist.png',
			alt: 'Matthias as a journalist',
		},
	],
};

export const backgroundDotColors = [
	'#E24C80',
	'#EB6E75',
	'#F28D6F',
	'#F6A972',
	'#F9C480',
	'#FBDD97',
	'#FDF6B5',
];

// export const personalityColors = {
//   Analyst: '#b3e2cd',
//   Leadership: '#fdcdac',
//   Designer: '#cbd5e8',
//   'Developer/Engineer': '#f4cae4',
//   Scientist: '#e6f5c9',
//   Journalist: '#fff2ae',
//   Freelancer: '#f1e2cc',
// };
// export const personalityColors = {
//   Analyst: '#D59780',
//   Leadership: '#DB8EBD',
//   Designer: '#A69FDC',
//   'Developer/Engineer': '#43B4C6',
//   Scientist: '#55B88D',
//   Journalist: '#A5AB5F',
//   Freelancer: '#D59780',
// };
// export const personalityColors = {
//   Analyst: '#E24C80',
//   Leadership: '#EB6E75',
//   Designer: '#F28D6F',
//   'Developer/Engineer': '#F6A972',
//   Scientist: '#F9C480',
//   Journalist: '#FBDD97',
//   Freelancer: '#FDF6B5',
// };
// export const personalityColors = {
//   Analyst: '#8B0069',
//   Leadership: '#A23D47',
//   Designer: '#A96C00',
//   'Developer/Engineer': '#9A9800',
//   Scientist: '#75C165',
//   Journalist: '#50E2BB',
//   Freelancer: '#B0F4FA',
// };
// export const personalityColors = {
//   Analyst: '#F7DC05',
//   Leadership: '#3D98D3',
//   Designer: '#EC0B88',
//   'Developer/Engineer': '#5E35B1',
//   Scientist: '#F9791E',
//   Journalist: '#3DD378',
//   Freelancer: '#C6C6C6',
// };
// export const personalityColors = {
//   Analyst: '#a79fdc',
//   Leadership: '#8bd0eb',
//   Designer: '#4dcea5',
//   'Developer/Engineer': '#869764',
//   Scientist: '#65d04b',
//   Journalist: '#fd5917',
//   Freelancer: '#f6bb86',
// };
// export const personalityColors = {
//   Analyst: '#a79fdc',
//   Leadership: '#7afaba',
//   Designer: '#2480a1',
//   'Developer/Engineer': '#82d1f4',
//   Scientist: '#bc47b4',
//   Journalist: '#e6f8c0',
//   Freelancer: '#1d8a20',
// };
// export const personalityColors = {
//   Analyst: '#ABB065',
//   Leadership: '#BFAA67',
//   Designer: '#CFA373',
//   'Developer/Engineer': '#DB9D85',
//   Scientist: '#E2979A',
//   Journalist: '#E494AF',
//   Freelancer: '#E093C3',
// };
