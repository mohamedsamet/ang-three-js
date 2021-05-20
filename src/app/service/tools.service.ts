import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Plan} from '../models/plans.model';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {
  private selectPlanEvent$ = new Subject<Plan>();
  constructor() { }

  emitPlanEvent(plan: Plan): void {
    this.selectPlanEvent$.next(plan);
  }

  getPlanEvent(): Observable<Plan> {
    return this.selectPlanEvent$ as Observable<Plan>;
  }
}
