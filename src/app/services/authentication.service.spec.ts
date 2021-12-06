import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthApi } from './authentication.service';

describe('AuthApi', () => {
  let service: AuthApi;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AuthApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
