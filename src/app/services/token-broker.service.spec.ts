import { TestBed } from '@angular/core/testing';

import { TokenBrokerService } from './token-broker.service';

describe('TokenBrokerService', () => {
  let service: TokenBrokerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenBrokerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
