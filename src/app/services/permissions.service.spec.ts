import { TestBed } from '@angular/core/testing';

import { PermissionsService } from './permissions.service';

describe('TestService', () => {
  let service: PermissionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PermissionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check if micro is enabled', async () => {
    const response = await service.check();
    expect(response).toEqual(true || false);
  });
});
