import {DateService} from './date.service';

describe('DateService', () => {
  const service = new DateService();

  it('should be created', () => {
    const date = new Date('1995-12-17T03:24:00+00:00');
    expect(service.formatDate(date)).toEqual('1995-12-17');
    expect(service.formatDateTime(date)).toEqual('1995-12-17 04:24:00');
    expect(service.formatDateTime(date, 'T')).toEqual('1995-12-17T04:24:00');
    expect(service.formatDateTimeWithTimezone(date)).toEqual('1995-12-17T03:24:00-01:00');
  });
});
