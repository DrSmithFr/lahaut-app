import {IsConnectedGuard} from "./is-connected-guard.service";
import {AuthService} from "../services/auth.service";
import {ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";

describe('IsConnectedGuard', () => {
  it('should be created', () => {
    const service: IsConnectedGuard = new IsConnectedGuard({} as AuthService);
    expect(service).toBeTruthy();
  });

  it('isLogged should return true when AuthService.isLogged return true', (done) => {
    const service: IsConnectedGuard = new IsConnectedGuard({isLogged: () => true} as AuthService);

    service
      .isLogged()
      .then((result) => {
        expect(result).toBeTrue();
        done();
      });
  });

  it('canActivate should return true when AuthService.isLogged return true', (done) => {
    const service: IsConnectedGuard = new IsConnectedGuard({isLogged: () => true} as AuthService);

    service
      .canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)
      .then((result) => {
        expect(result).toBeTrue();
        done();
      });
  });

  it('canActivateChild should return true when AuthService.isLogged return true', (done) => {
    const service: IsConnectedGuard = new IsConnectedGuard({isLogged: () => true} as AuthService);

    service
      .canActivateChild({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)
      .then((result) => {
        expect(result).toBeTrue();
        done();
      });
  });

  it('isLogged should return false when AuthService.isLogged return false', (done) => {
    const service: IsConnectedGuard = new IsConnectedGuard({isLogged: () => false} as AuthService);

    service
      .isLogged()
      .then((result) => {
        expect(result).toBeFalse();
        done();
      });
  });

  it('canActivate should return false when AuthService.isLogged return false', (done) => {
    const service: IsConnectedGuard = new IsConnectedGuard({isLogged: () => false} as AuthService);

    service
      .canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)
      .then((result) => {
        expect(result).toBeFalse();
        done();
      });
  });

  it('canActivateChild should return false when AuthService.isLogged return false', (done) => {
    const service: IsConnectedGuard = new IsConnectedGuard({isLogged: () => false} as AuthService);

    service
      .canActivateChild({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)
      .then((result) => {
        expect(result).toBeFalse();
        done();
      });
  });
});
