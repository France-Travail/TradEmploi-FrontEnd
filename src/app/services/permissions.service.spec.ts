import { TestBed } from '@angular/core/testing';
import { PermissionsService } from './permissions.service';

describe('PermissionsService', () => {

  let service: PermissionsService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PermissionsService);
    service = new PermissionsService();
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should check if micro is  enabled', async () => {
    spyOn(navigator.mediaDevices, 'getUserMedia').and.returnValue(new Promise<MediaStream>((resolve, reject) => resolve()));
    const response = await service.check();
    expect(response).toEqual(true);
  });
  it('should check if micro is not enabled', async () => {
    spyOn(navigator.mediaDevices, 'getUserMedia').and.returnValue(new Promise<MediaStream>((resolve, reject) => reject(false)));
    const response = await service.check();
    expect(response).toEqual(false);
  });
});
