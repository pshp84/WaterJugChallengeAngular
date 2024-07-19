// app.component.spec.ts
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { WaterJugService } from './water-jug.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let waterJugService: WaterJugService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [AppComponent],
      providers: [WaterJugService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    waterJugService = TestBed.inject(WaterJugService);
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('Small Capacity Jug Problem Solution', () => {
    component.x = 2;
    component.y = 10;
    component.z = 4;
    component.handleSubmit();

    expect(component.steps).toEqual([
      { jugX: 2, jugY: 0, action: 'Fill bucket X' },
      { jugX: 0, jugY: 2, action: 'Transfer from bucket X to bucket Y' },
      { jugX: 2, jugY: 2, action: 'Fill bucket X' },
      { jugX: 0, jugY: 4, action: 'Transfer from bucket X to bucket Y' },
    ]);
    expect(component.error).toBe('');
  });

  it('Large Capacity Jug Problem Solution', () => {
    component.x = 2;
    component.y = 100;
    component.z = 96;
    component.handleSubmit();

    expect(component.steps).toEqual([
      { jugX: 0, jugY: 100, action: 'Fill bucket Y' },
      { jugX: 2, jugY: 98, action: 'Transfer from bucket Y to bucket X' },
      { jugX: 0, jugY: 98, action: 'Empty bucket X' },
      { jugX: 2, jugY: 96, action: 'Transfer from bucket Y to bucket X' },
    ]);
    expect(component.error).toBe('');
  });

  it('Unsolvable/No solution Jug Problem Scenario', () => {
    component.x = 2;
    component.y = 6;
    component.z = 5;
    component.handleSubmit();

    expect(component.steps).toEqual([]);
    expect(component.error).toBe('No Solution');
  });
});
