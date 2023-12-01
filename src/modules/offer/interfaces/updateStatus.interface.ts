import { Status } from 'src/databases/enums/offer.enum';

export class IUpdateStatus {
  id: string;
  status: Status;
  walletAddress: string;
}
