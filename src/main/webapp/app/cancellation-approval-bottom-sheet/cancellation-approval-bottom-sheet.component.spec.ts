import { TestBed } from '@angular/core/testing';
import { MatBottomSheetHarness } from '@angular/material/bottom-sheet/testing';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';

import { of } from 'rxjs';

describe('CancellationApprovalBottomSheetComponent', () => {
  let matBottomSheet: MatBottomSheet;
  let bottomSheetSpy: jasmine.Spy;
  let bottomSheetRefSpyObj = jasmine.createSpyObj({ afterClosed: of({}), close: null });
  bottomSheetRefSpyObj.componentInstance = { body: '' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatBottomSheetModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    matBottomSheet = TestBed.inject(MatBottomSheet);
    bottomSheetSpy = spyOn(matBottomSheet, 'open').and.returnValue(bottomSheetRefSpyObj);
  });

  it('should open', async () => {
    matBottomSheet.open(MatBottomSheetHarness);
    expect(bottomSheetSpy).toHaveBeenCalled();
  });
});
