import { Injectable } from '@angular/core'
import { IPagination, ICategory } from 'src/app/interfaces'
import { BehaviorSubject, Observable, of } from 'rxjs'
import * as QueryString from 'qs'
import { GeneralHttp } from '../common/generalHttp'
@Injectable({
	providedIn: 'root',
})
export class CategoryService {
	private categoriesSubject: BehaviorSubject<IPagination>
	public categories: Observable<IPagination>

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
		this.categoriesSubject = new BehaviorSubject<IPagination>(initialState)
		this.categories = this.categoriesSubject.asObservable()
	}

	setCategoies(categories: IPagination) {
		this.categoriesSubject.next(categories)
	}

	get categoriesValue(): IPagination {
		return this.categoriesSubject.value
	}

	getAllCategoriesWithReports(): Observable<IPagination> {
		let limit = -1
		let include = 'report'
		const QUERY_STRING = QueryString.stringify({ limit, include })
		return this.generalHttp.getAll('categories', QUERY_STRING)
	}

	getAllCategories(
		page: number = this.currentPage,
		limit: number = this.limit,
		name: string = ''
	): Observable<IPagination> {
		this.query = { page, limit, name }
		const queryString = QueryString.stringify(this.query)
		return this.generalHttp.getAll('categories', queryString)
	}

	createCategory(category: ICategory): Observable<ICategory> {
		return this.generalHttp.create(
			'categories',
			category,
			'Categoria',
			false
		)
	}

	updateCategory(updatedCategory: ICategory): Observable<ICategory> {
		const { id } = updatedCategory
		return this.generalHttp.update(
			'categories',
			updatedCategory,
			id || 1,
			'Categoria',
			true,
			'Categoría actualizada'
		)
	}

	deleteCategory = (id: number) => {
		return this.generalHttp.delete(
			'categories',
			id,
			'Categoria',
			true,
			false
		)
	}
	updateTable(isDelete: boolean = false) {
		if (isDelete)
			this.currentPage =
				this.categoriesValue.rows.length <= 1 && this.currentPage > 1
					? this.currentPage - 1
					: this.currentPage
		this.getAllCategories(
			this.currentPage,
			this.query.limit,
			this.query.name
		).subscribe((res: IPagination) => this.categoriesSubject.next(res))
	}
}
