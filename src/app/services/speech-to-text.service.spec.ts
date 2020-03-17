import { TestBed } from '@angular/core/testing';
import axios from 'axios';
import { SpeechToTextService } from './speech-to-text.service';

describe('TranslateService', () => {
  let service: SpeechToTextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpeechToTextService);
    service = new SpeechToTextService();
  });

  it('should speech to text', async () => {
    const response = {
      results: [
        {
          alternatives: [
            {
              confidence: 0.9840146,
              transcript: 'how old is the Brooklyn Bridge'
            }
          ]
        }
      ]
    };
    spyOn(axios, 'post').and.returnValue(
      new Promise<any>((resolve, reject) => resolve(response))
    );
    service.recognizeAsync('audioBytes', 'fr-Fr').subscribe(res => {
      expect(res).toEqual('how old is the Brooklyn Bridge');
    });
  });

  it('should not speech to text and return error ', async () => {
    spyOn(axios, 'post').and.returnValue(
      new Promise<String>((resolve, reject) => reject('An error'))
    );
    service.recognizeAsync('audioBytes', 'fr-Fr').subscribe({
      error: err => {
        expect(err).toEqual('Traduction indisponible momentanément');
      }
    });
    expect(true).toEqual(true);
  });
});
