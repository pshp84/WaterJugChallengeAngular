import { Injectable } from '@angular/core';

interface State {
  x: number;
  y: number;
  actions: Array<{ jugX: number, jugY: number, action: string }>;
}

@Injectable({
  providedIn: 'root',
})
export class WaterJugService {
  solveWaterJug(X: number, Y: number, Z: number): Array<{ jugX: number, jugY: number, action: string }> | null {
    if (Z > Math.max(X, Y) || Z % this.gcd(X, Y) !== 0) {
      return null; // No solution possible
    }

    const visited = new Set<string>();
    const queue: State[] = [];
    const initialState: State = { x: 0, y: 0, actions: [] };
    queue.push(initialState);
    visited.add("0,0");

    while (queue.length > 0) {
      const { x, y, actions } = queue.shift()!;

      if (x === Z || y === Z) {
        return [...actions];
      }

      // Generate all possible states
      const possibleStates: Array<{ x: number, y: number, action: string }> = [
        { x: X, y, action: "Fill bucket X" },
        { x, y: Y, action: "Fill bucket Y" },
        { x: 0, y, action: "Empty bucket X" },
        { x, y: 0, action: "Empty bucket Y" },
        {
          x: x - Math.min(x, Y - y),
          y: y + Math.min(x, Y - y),
          action: "Transfer from bucket X to bucket Y",
        },
        {
          x: x + Math.min(y, X - x),
          y: y - Math.min(y, X - x),
          action: "Transfer from bucket Y to bucket X",
        },
      ];

      for (const state of possibleStates) {
        const stateKey = `${state.x},${state.y}`;
        if (!visited.has(stateKey)) {
          visited.add(stateKey);
          queue.push({
            x: state.x,
            y: state.y,
            actions: [
              ...actions,
              { jugX: state.x, jugY: state.y, action: state.action },
            ],
          });
        }
      }
    }

    return null; // No solution found
  }

  private gcd(a: number, b: number): number {
    while (b) {
      [a, b] = [b, a % b];
    }
    return a;
  }
}
