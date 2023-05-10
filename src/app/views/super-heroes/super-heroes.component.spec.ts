import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <table mat-table [dataSource]="dataSource">
      <ng-container matColumnDef="buttons">
        <th mat-header-cell class="narrow-column" *matHeaderCellDef mat-header>
          <button mat-raised-button (click)="onEditModifyClick()">Add</button>
        </th>
        <td mat-cell class="narrow-column" *matCellDef="let row">
          <button mat-icon-button (click)="onEditModifyClick(row)">
            <mat-icon>edit</mat-icon>
          </button>
          <button mat-icon-button (click)="onDeleteClick(row)">
            <mat-icon>delete</mat-icon>
          </button>
        </td>
      </ng-container>
      <tr mat-header-row *matHeaderRowDef="['buttons']"></tr>
      <tr mat-row *matRowDef="let row; columns: ['buttons']"></tr>
    </table>
  `,
})
class TestComponent {
  dataSource = [{ id: 1 }, { id: 2 }, { id: 3 }];
  onEditModifyClick = jasmine.createSpy('onEditModifyClick');
  onDeleteClick = jasmine.createSpy('onDeleteClick');
}

describe('TestComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [MatTableModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call onEditModifyClick when add button is clicked', () => {
    const addButton = fixture.debugElement.query(
      By.css('button[mat-raised-button]')
    ).nativeElement;
    addButton.click();

    expect(component.onEditModifyClick).toHaveBeenCalled();
  });

  it('should call onEditModifyClick with correct row data when edit button is clicked', () => {
    const editButton = fixture.debugElement.queryAll(
      By.css('button[mat-icon-button]')
    )[0].nativeElement;
    editButton.click();

    expect(component.onEditModifyClick).toHaveBeenCalledWith(
      component.dataSource[0]
    );
  });

  it('should call onDeleteClick with correct row data when delete button is clicked', () => {
    const deleteButton = fixture.debugElement.queryAll(
      By.css('button[mat-icon-button]')
    )[1].nativeElement;
    deleteButton.click();

    expect(component.onDeleteClick).toHaveBeenCalledWith(
      component.dataSource[0]
    );
  });
});
