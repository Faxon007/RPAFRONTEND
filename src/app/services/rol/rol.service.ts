import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { IPagination, IRole } from 'src/app/interfaces'
import * as QueryString from 'qs'
import { GeneralHttp } from '../common/generalHttp'
@Injectable({
	providedIn: 'root',
})
export class RolService {
	private rolesSubject: BehaviorSubject<IPagination>
	public roles: Observable<IPagination>
	private url: string = 'roles'
	public currentPage: number = 1
	queryString: any = {}

	constructor(private generalHttp: GeneralHttp) {
		const initialState = {
			rows: [],
			pages: 0,
			count: 0,
		}
		this.rolesSubject = new BehaviorSubject<IPagination>(initialState)
		this.roles = this.rolesSubject.asObservable()
	}

	getAllRoles(
		page: number,
		limit: number,
		name?: string
	): Observable<IPagination> {
		const QUERY_STRING = QueryString.stringify({ page, limit, name })
		this.queryString = { page, limit, name }
		return this.generalHttp.getAll(this.url, QUERY_STRING)
	}

	setRoles(roles: IPagination) {
		this.rolesSubject.next(roles)
	}

	get rolesValue(): IPagination {
		return this.rolesSubject.value
	}

	createRol(rol: any): Observable<IPagination> {
		return this.generalHttp.create(this.url, rol, 'Rol')
	}

	updateRol(id: number, rol: any): Observable<IRole> {
		return this.generalHttp.update(this.url, rol, id, 'Rol')
	}

	getOneRol(id: number): Observable<IRole> {
		return this.generalHttp.getOne(this.url, id, 'Rol')
	}

	deleteRol = (id: number): Observable<IRole> => {
		return this.generalHttp.delete(this.url, id, 'Rol', false)
	}

	updateTable(isDelete?: boolean) {
		if (isDelete)
			this.currentPage =
				this.rolesValue.rows.length <= 1 && this.currentPage > 1
					? this.currentPage - 1
					: this.currentPage

		this.getAllRoles(this.currentPage, 10, this.queryString.name).subscribe(
			(data) => this.setRoles(data)
		)
	}
}
