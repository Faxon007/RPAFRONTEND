import { ModalController } from '@ionic/angular'
import { Component, Input, OnInit } from '@angular/core'
import { IRobot, IPagination } from 'src/app/interfaces'
import { RobotsService } from 'src/app/services/robot/robot.service'
import { EventService } from 'src/app/services/event.service'

@Component({
	selector: 'app-robot-modal',
	templateUrl: './robot-modal.component.html',
	styleUrls: ['./robot-modal.component.scss'],
})
export class RobotModalComponent implements OnInit {
	@Input() type: string | undefined
	@Input() data: IRobot = {
		name: '',
		description: '',
		script:'',
		status:'',
	}
	robot: IRobot = {
		name: '',
		description: '',
		script:'',
		status:'',
	}
	loading: boolean = false
	constructor(
		private modalController: ModalController,
		private robotsService: RobotsService,
		private eventService: EventService
	) {}

	ngOnInit() {
		if (this.type === 'update') {
			this.robot = this.data
		}
	}

	close() {
		this.modalController.dismiss()
	}

	onSumbit() {
		this.loading = true
		this.type === 'create'
			? this.robotsService.createRobot(this.robot).subscribe((_) => {
					this.robotsService.updateTable()
					this.loading = false
					this.modalController.dismiss()
			  })
			: this.robotsService
					.updateRobot(this.robot)
					.subscribe((_) => {
						this.robotsService.updateTable()
						this.loading = false
						this.modalController.dismiss()
					})
	}
}
