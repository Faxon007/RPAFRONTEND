import { Component, OnInit } from '@angular/core'
import { ModalController } from '@ionic/angular'
import { AlertModalComponent } from 'src/app/components/modals/alert-modal/alert-modal.component'
import { IExecution, IColumn } from 'src/app/interfaces'
import { ExecutionService } from 'src/app/services/execution/execution.service'
import { ExecutionModalComponent } from './modal/execution-modal/execution-modal.component'
import { LIMIT } from 'src/app/services/common/httpOptions'
@Component({
	selector: 'app-execution',
	templateUrl: './execution.page.html',
	styleUrls: ['./execution.page.scss'],
})
export class ExecutionsPage implements OnInit {
	listOptions: any[] = [
		{
			title: 'Editar',
			icon: 'create-outline',
			event: (execution: IExecution) => {
				const data = JSON.parse(JSON.stringify(execution))
				this.openExecutionModal('update', data)
			},
		},
		{
			title: 'Eliminar',
			icon: 'trash-outline',
			event: async (execution: IExecution) => {
				const modal = await this.modalCtrl.create({
					component: AlertModalComponent,
					cssClass: 'claro-oym-modal-action',
					swipeToClose: true,
					mode: 'ios',
					componentProps: {
						icon: 'trash-outline',
						title: 'Eliminar ejecución',
						message: `¿Estás seguro de eliminar la ejecución "${execution.name}"?`,
						data: execution,
						Accept: this.executionService.deleteExecution,
					},
				})
				modal.onWillDismiss().then((_) => {
					this.executionService.updateTable(true)
				})
				await modal.present()
			},
		},
	]
	columns: IColumn[] = [
		{
			label: 'Nombre',
			field: 'name',
			klass: 'w-[300px]',
		},
		{
			label: 'Descripción',
			field: 'description',
		},
		{
			label: '',
			field: 'actions',
			klass: 'w-[100px]',
		},
	]
	rows: any[] = []
	currentPage: number = 1
	limit: number = LIMIT
	totalPages: number = 0
	count: number = 0
	loading: boolean = false
	search = ''
	constructor(
		public modalCtrl: ModalController,
		public executionService: ExecutionService
	) {}

	ngOnInit() {
		this.getExecutions()
	}

	searchExecutions(executionName: string) {
		this.executionService.currentPage = 1
		this.search = executionName
		this.getExecutions(this.search)
	}

	getExecutions(
		name: string = this.search,
		page: number = this.executionService.currentPage,
		limit: number = this.limit
	) {
		this.loading = true
		this.executionService
			.getAllExecutions(page, limit, name)
			.subscribe((res: any) => {
				this.executionService.setCategoies(res)
				this.loading = false
			})
	}

	async openExecutionModal(type: string = 'create', execution?: IExecution) {
		const modal = await this.modalCtrl.create({
			component: ExecutionModalComponent,
			cssClass: 'claro-oym-modal',
			swipeToClose: true,
			mode: 'ios',
			componentProps: {
				type,
				data: execution,
			},
		})
		return await modal.present()
	}

	async onChangePage(page: number) {
		this.executionService.currentPage = page
		this.getExecutions()
	}
}
