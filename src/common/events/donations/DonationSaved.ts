export class DonationSavedEvent {
  constructor(param: {
    userId: number;
    userGender: string;
    experienceAmount: number;
  }) {
    this.userId = param.userId;
    this.userGender = param.userGender;
    this.experienceAmount = param.experienceAmount;
  }

  userId: number;
  userGender: string;
  experienceAmount: number;
}
