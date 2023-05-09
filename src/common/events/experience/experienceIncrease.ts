export class ExperienceIncreaseEvent {
  constructor(param: { userId: number; experienceAmount: number }) {
    this.userId = param.userId;
    this.experienceAmount = param.experienceAmount;
  }

  userId: number;
  experienceAmount: number;
}
