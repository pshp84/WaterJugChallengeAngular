import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WaterJugService } from './water-jug.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  x: number | undefined;
  y: number | undefined;
  z: number | undefined;
  steps: any[] = [];
  error: string | undefined;

  constructor(private waterJugService: WaterJugService) {}

  handleSubmit(): void {
    this.error = '';

    if (!this.x || !this.y || !this.z || this.x <= 0 || this.y <= 0 || this.z <= 0) {
      this.error = 'X, Y, and Z must be greater than 0.';
      return;
    }

    const result = this.waterJugService.solveWaterJug(this.x, this.y, this.z);
    if (result) {
      this.steps = result;
    } else {
      this.error = 'No Solution';
      this.steps = [];
    }
  }
}
