import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { TokenBrokerService } from './token-broker.service';
import { SpeechToTextService } from './speech-to-text.service';
import { JwtFbSingleton } from '../models/token/JwtFbSingleton';

describe('SpeechToTextService', () => {
  let service: SpeechToTextService;

  let tokenBrokerServiceMock;
  beforeEach(waitForAsync(() => {
    tokenBrokerServiceMock = jasmine.createSpyObj(['getTokenGcp']);
    tokenBrokerServiceMock.getTokenGcp.and.returnValue(Promise.resolve({ tokenGW: 'ddddd' }));
    TestBed.configureTestingModule({
      providers: [
        JwtFbSingleton,
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
    service = TestBed.inject(SpeechToTextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
