export class Balance {
  constructor(
    public readonly amount: number,
    public readonly userId: string,
    public readonly updatedAt: Date
  ) {}
}
