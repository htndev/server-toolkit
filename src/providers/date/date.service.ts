import { Injectable } from '@nestjs/common';

import { MILLISECOND } from '../../constants/time.constant';

@Injectable()
export class DateService {
  dateToMilliseconds = (date: Date): number => date.getTime();
  timestampToDate = (timestamp: number): Date => new Date(this.secondsToMilliseconds(timestamp));

  private secondsToMilliseconds(seconds: number): number {
    return seconds * MILLISECOND;
  }
}
