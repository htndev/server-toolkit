import { Injectable } from '@nestjs/common';

import { MILLISECOND } from '../../constants/time.constant';

@Injectable()
export class DateService {
  timestampToDate = (timestamp: number): Date => new Date(this.secondsToMilliseconds(timestamp));

  private secondsToMilliseconds(seconds: number): number {
    return seconds * MILLISECOND;
  }
}
