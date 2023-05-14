export class DonationSavedEvent {
  constructor(param: { userId: number; userGender: string }) {
    this.userId = param.userId;
    this.userGender = param.userGender;
  }

  userId: number;
  userGender: string;
}
