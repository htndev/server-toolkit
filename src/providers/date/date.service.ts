import { Injectable } from '@nestjs/common';

import { MILLISECOND } from '../../constants/time.constant';

@Injectable()
export class DateService {
  MILLISECONDS = MILLISECOND;

  timestampToDate = (timestamp: number): Date => new Date(this.secondsToMilliseconds(timestamp));

  private secondsToMilliseconds(seconds: number): number {
    return seconds * this.MILLISECONDS;
  }
}
