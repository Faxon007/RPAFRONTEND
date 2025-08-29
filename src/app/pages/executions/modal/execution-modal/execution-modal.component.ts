import { ModalController } from '@ionic/angular'
import { Component, Input, OnInit } from '@angular/core'
import { IExecution, IPagination } from 'src/app/interfaces'
import { ExecutionService } from 'src/app/services/execution/execution.service'
import { EventService } from 'src/app/services/event.service'

@Component({
	selector: 'app-execution-modal',
	templateUrl: './execution-modal.component.html',
	styleUrls: ['./execution-modal.component.scss'],
})
export class ExecutionModalComponent implements OnInit {
	@Input() type: string | undefined
	@Input() data: IExecution = {
		name: '',
		description: '',
	}
	execution: IExecution = {
		name: '',
		description: '',
	}
	loading: boolean = false
	constructor(
		private modalController: ModalController,
		private executionService: ExecutionService,
		private eventService: EventService
	) {}

	ngOnInit() {
		if (this.type === 'update') {
			this.execution = this.data
		}
	}

	close() {
		this.modalController.dismiss()
	}

	onSumbit() {
		this.loading = true
		this.type === 'create'
			? this.executionService.createExecution(this.execution).subscribe((_) => {
					this.executionService.updateTable()
					this.loading = false
					this.modalController.dismiss()
			  })
			: this.executionService
					.updateExecution(this.execution)
					.subscribe((_) => {
						this.executionService.updateTable()
						this.loading = false
						this.modalController.dismiss()
					})
	}
}
