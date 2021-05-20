import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Plan} from '../models/plans.model';
import {ToolsService} from '../service/tools.service';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss']
})
export class ToolsComponent implements OnInit {
  public planTypes = Plan;
  @Output() applyPlanEvent = new EventEmitter<Plan>()
  constructor(private toolService: ToolsService) { }

  ngOnInit(): void {
  }

  applyPlan(plan: Plan): void {
    this.toolService.emitPlanEvent(plan);
  }
}
