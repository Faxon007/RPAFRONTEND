import { AlertModalModule } from '../../components/modals/alert-modal/alert-modal.module'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'

import { ExecutionsPageRoutingModule } from './executions-routing.module'

import { ExecutionsPage } from './execution.page'
import { HeaderModule } from 'src/app/components/common/header/header.module'
import { ButtonModule } from 'src/app/components/common/button/button.module'
import { SearchModule } from 'src/app/components/search/search.module'
import { ExecutionModalModule } from './modal/execution-modal/execution-modal.module'
import { TableModule } from 'src/app/components/table/table.module'

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		HeaderModule,
		ButtonModule,
		SearchModule,
		ExecutionModalModule,
		TableModule,
		AlertModalModule,
		ExecutionsPageRoutingModule,
	],
	declarations: [ExecutionsPage],
})
export class ExecutionsPageModule {}
