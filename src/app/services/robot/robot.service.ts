import { Injectable } from '@angular/core'
import { IPagination, IRobot } from 'src/app/interfaces'
import { BehaviorSubject, Observable, of } from 'rxjs'
import * as QueryString from 'qs'
import { GeneralHttp } from '../common/generalHttp'
@Injectable({
    providedIn: 'root',
})
export class RobotsService {
    private robotsSubject: BehaviorSubject<IPagination>
    public robots: Observable<IPagination>

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
        this.robotsSubject = new BehaviorSubject<IPagination>(initialState)
        this.robots = this.robotsSubject.asObservable()
    }

    setRobots(robots: IPagination) {
        this.robotsSubject.next(robots)
    }

    get robotsValue(): IPagination {
        return this.robotsSubject.value
    }

    getAllrobotsWithReports(): Observable<IPagination> {
        let limit = -1
        let include = 'report'
        const QUERY_STRING = QueryString.stringify({ limit, include })
        return this.generalHttp.getAll('robots', QUERY_STRING)
    }

    getAllRobots(
        page: number = this.currentPage,
        limit: number = this.limit,
        name: string = ''
    ): Observable<IPagination> {
        this.query = { page, limit, name }
        const queryString = QueryString.stringify(this.query)
        return this.generalHttp.getAll('robots', queryString)
    }

    createRobot(Robot: IRobot): Observable<IRobot> {
        return this.generalHttp.create(
            'robots',
            Robot,
            'robots',
            false
        )
    }

    updateRobot(updatedRobot: IRobot): Observable<IRobot> {
        const { id } = updatedRobot
        return this.generalHttp.update(
            'robots',
            updatedRobot,
            id || 1,
            'Robot',
            true,
            'Robot actualizado'
        )
    }

    deleteRobot = (id: number) => {
        return this.generalHttp.delete(
            'robots',
            id,
            'Robot',
            true,
            false
        )
    }
    updateTable(isDelete: boolean = false) {
        if (isDelete)
            this.currentPage =
                this.robotsValue.rows.length <= 1 && this.currentPage > 1
                    ? this.currentPage - 1
                    : this.currentPage
        this.getAllRobots(
            this.currentPage,
            this.query.limit,
            this.query.name
        ).subscribe((res: IPagination) => this.robotsSubject.next(res))
    }
}
