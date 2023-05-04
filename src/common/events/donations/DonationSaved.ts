export class DonationSavedEvent {
  constructor(param: { userId: number; donationId: number }) {
    this.userId = param.userId;
    this.donationId = param.donationId;
  }

  userId: number;
  donationId: number;
}
