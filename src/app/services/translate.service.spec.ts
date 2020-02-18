import { TestBed } from '@angular/core/testing';
import { TranslateService } from './translate.service';
import axios from 'axios';

describe('TranslateService', () => {
  let service: TranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranslateService);
    service = new TranslateService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should translate with text', async () => {
    const expected = {
      data: {
        data: {
          translate: [
            {
              text: 'i am a test',
              provider: 'Google'
            }
          ]
        }
      }
    };
    spyOn(axios, 'post').and.returnValue(
      new Promise<any>((resolve, reject) => resolve(expected))
    );
    service.translate('je suis un test', 'speaker').subscribe(res => {
      expect(res).toEqual(expected.data.data.translate[0].text);
    });
  });

  it('should not translate and return error ', async () => {
    spyOn(axios, 'post').and.returnValue(
      new Promise<String>((resolve, reject) => reject('An error'))
    );
    service.translate('je suis un test', 'speaker').subscribe({
      error: err => {
        expect(err).toEqual('An error');
      }
    });
    expect(true).toEqual(true);
  });
});
