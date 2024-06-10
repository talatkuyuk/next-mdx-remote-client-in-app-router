class Expect {
  private value: any;

  constructor(value: any) {
    this.value = value;
  }

  private formatValue(value: any): string {
    if (typeof value === "object") {
      return JSON.stringify(value, null, 2);
    } else {
      return String(value);
    }
  }

  public toBe(expected: any) {
    if (this.value !== expected) {
      throw new Error(
        `Expected ${this.formatValue(this.value)} to be ${this.formatValue(
          expected
        )}`
      );
    }
  }

  public toEqual(expected: any) {
    if (JSON.stringify(this.value) !== JSON.stringify(expected)) {
      throw new Error(
        `Expected ${this.formatValue(this.value)} to be ${this.formatValue(
          expected
        )}`
      );
    }
  }
}

// Helper function to create an Expect instance
export function expect(value: any): Expect {
  return new Expect(value);
}
