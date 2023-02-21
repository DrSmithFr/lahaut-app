import {IsDisconnectedGuard} from "./is-disconnected-guard.service";
import {AuthService} from "../services/auth.service";
import {ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";

describe('IsDisconnectedGuard', () => {
  it('should be created', () => {
    const service: IsDisconnectedGuard = new IsDisconnectedGuard({} as AuthService);
    expect(service).toBeTruthy();
  });

  it('isDisconnected should return false when AuthService.isLogged return true', (done) => {
    const service: IsDisconnectedGuard = new IsDisconnectedGuard({isLogged: () => true} as AuthService);

    service
      .isDisconnected()
      .then((result) => {
        expect(result).toBeFalse();
        done();
      });
  });

  it('canActivate should return false when AuthService.isLogged return true', (done) => {
    const service: IsDisconnectedGuard = new IsDisconnectedGuard({isLogged: () => true} as AuthService);

    service
      .canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)
      .then((result) => {
        expect(result).toBeFalse();
        done();
      });
  });

  it('canActivateChild should return false when AuthService.isLogged return true', (done) => {
    const service: IsDisconnectedGuard = new IsDisconnectedGuard({isLogged: () => true} as AuthService);

    service
      .canActivateChild({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)
      .then((result) => {
        expect(result).toBeFalse();
        done();
      });
  });

  it('isDisconnected should return true when AuthService.isLogged return false', (done) => {
    const service: IsDisconnectedGuard = new IsDisconnectedGuard({isLogged: () => false} as AuthService);

    service
      .isDisconnected()
      .then((result) => {
        expect(result).toBeTrue();
        done();
      });
  });

  it('canActivate should return true when AuthService.isLogged return false', (done) => {
    const service: IsDisconnectedGuard = new IsDisconnectedGuard({isLogged: () => false} as AuthService);

    service
      .canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)
      .then((result) => {
        expect(result).toBeTrue();
        done();
      });
  });

  it('canActivateChild should return true when AuthService.isLogged return false', (done) => {
    const service: IsDisconnectedGuard = new IsDisconnectedGuard({isLogged: () => false} as AuthService);

    service
      .canActivateChild({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)
      .then((result) => {
        expect(result).toBeTrue();
        done();
      });
  });
});
