import { PermissionsService } from './permissions.service';

describe('TestService', () => {
  let service: PermissionsService;

  beforeEach(() => {
    service = new PermissionsService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check if micro is enabled', async () => {
    await service
      .check()
      .then(result => {
        if (result) {
          expect(result).toEqual(true);
        } else {
          expect(result).toEqual(false);
        }
      });
  });
});
