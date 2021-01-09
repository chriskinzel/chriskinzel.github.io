import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'ck-education-item',
  templateUrl: './education-item.component.html',
  styleUrls: ['./education-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EducationItemComponent {
  @Input() name: string;
  @Input() degreeInfo: string;
  @Input() startYear: string;
  @Input() endYear: string;
  @Input() iconUrl: string;
}
