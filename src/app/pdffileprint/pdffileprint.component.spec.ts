import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdffileprintComponent } from './pdffileprint.component';

describe('PdffileprintComponent', () => {
  let component: PdffileprintComponent;
  let fixture: ComponentFixture<PdffileprintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PdffileprintComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdffileprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
