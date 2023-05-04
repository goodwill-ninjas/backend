export class DonationSavedEvent {
  constructor(param: {
    userId: number;
    donationId: number;
    experienceAmount: number;
  }) {
    this.userId = param.userId;
    this.donationId = param.donationId;
    this.experienceAmount = param.experienceAmount;
  }

  userId: number;
  donationId: number;
  experienceAmount: number;
}
