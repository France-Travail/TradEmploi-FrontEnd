import { NO_ERRORS_SCHEMA } from '@angular/core';
import { inject, TestBed, waitForAsync } from '@angular/core/testing';
import { TelemetryService } from './telemetry.service';
import { TokenBrokerService } from './token-broker.service';
import axios from 'axios';

describe('TelemetryService', () => {
  let service: TelemetryService;

  let tokenBrokerServiceMock;

  beforeEach(waitForAsync(() => {
    tokenBrokerServiceMock = jasmine.createSpyObj(['getTokenGcp']);
    tokenBrokerServiceMock.getTokenGcp.and.returnValue(Promise.resolve({ tokenGW: 'ddddd' }));
    TestBed.configureTestingModule({
      providers: [
        { provide: TokenBrokerService, useValue: tokenBrokerServiceMock }
      ],
      declarations: [],
      imports: [],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));
  beforeEach(() => {

    TestBed.configureTestingModule({});
    service = TestBed.inject(TelemetryService);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });


});
