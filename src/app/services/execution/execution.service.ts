import { Injectable } from '@angular/core'
import { IPagination, IExecution } from 'src/app/interfaces'
import { BehaviorSubject, Observable, of } from 'rxjs'
import * as QueryString from 'qs'
import { GeneralHttp } from '../common/generalHttp'
@Injectable({
	providedIn: 'root',
})
export class ExecutionService {
	private executionsSubject: BehaviorSubject<IPagination>
	public executions: Observable<IPagination>

	public currentPage = 1
	private limit = 10
	private query = {
		page: this.currentPage,
		limit: this.limit,
		name: '',
	}

	constructor(private generalHttp: GeneralHttp) {
		const initialState = {
			rows: [],
			pages: 0,
			count: 0,
		}
		this.executionsSubject = new BehaviorSubject<IPagination>(initialState)
		this.executions = this.executionsSubject.asObservable()
	}

	setCategoies(executions: IPagination) {
		this.executionsSubject.next(executions)
	}

	get executionsValue(): IPagination {
		return this.executionsSubject.value
	}

	getAllExecutionsWithReports(): Observable<IPagination> {
		let limit = -1
		let include = 'report'
		const QUERY_STRING = QueryString.stringify({ limit, include })
		return this.generalHttp.getAll('executions', QUERY_STRING)
	}

	getAllExecutions(
		page: number = this.currentPage,
		limit: number = this.limit,
		name: string = ''
	): Observable<IPagination> {
		this.query = { page, limit, name }
		const queryString = QueryString.stringify(this.query)
		return this.generalHttp.getAll('executions', queryString)
	}

	createExecution(category: IExecution): Observable<IExecution> {
		return this.generalHttp.create(
			'executions',
			category,
			'Categoria',
			false
		)
	}

	updateExecution(updatedExecution: IExecution): Observable<IExecution> {
		const { id } = updatedExecution
		return this.generalHttp.update(
			'executions',
			updatedExecution,
			id || 1,
			'Categoria',
			true,
			'Categoría actualizada'
		)
	}

	deleteExecution = (id: number) => {
		return this.generalHttp.delete(
			'executions',
			id,
			'execution',
			true,
			false
		)
	}
	updateTable(isDelete: boolean = false) {
		if (isDelete)
			this.currentPage =
				this.executionsValue.rows.length <= 1 && this.currentPage > 1
					? this.currentPage - 1
					: this.currentPage
		this.getAllExecutions(
			this.currentPage,
			this.query.limit,
			this.query.name
		).subscribe((res: IPagination) => this.executionsSubject.next(res))
	}
}
