import { IPage } from 'src/app/interfaces'

export const pages: IPage[] = [
	 /*{
	   title: 'Semáforo corporativo',
	   url: '/indicators',
	   icon: 'layers',
	   path: 'indicators',
	   isOpen: false,
	   children: [],
	},*/
	{
		title: 'Reportes O&M',
		url: '/oym-reports',
		icon: 'briefcase',
		path: 'reports',
		isOpen: false,
		children: [],
	},
	{
		title: 'RPAs',
		url: '/robots',
		icon: 'hardware-chip',
		path: 'robots',
		isOpen: false,
		children: [],
	},
	{
		title: 'Executions',
		url: '/executions',
		icon: 'calendar',
		path: 'execution',
		isOpen: false,
		children: [],
	}
]
