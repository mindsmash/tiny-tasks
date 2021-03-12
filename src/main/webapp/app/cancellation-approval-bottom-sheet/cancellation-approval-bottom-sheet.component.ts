import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'tiny-cancellation-approval-bottom-sheet',
  templateUrl: './cancellation-approval-bottom-sheet.component.html',
  styleUrls: ['./cancellation-approval-bottom-sheet.component.css']
})
export class CancellationApprovalBottomSheetComponent implements OnInit {

  constructor(
    public bottomSheetRef: MatBottomSheetRef<CancellationApprovalBottomSheetComponent>
  ) { }

  ngOnInit(): void {
  }
}
