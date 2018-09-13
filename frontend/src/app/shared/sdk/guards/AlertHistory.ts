/* tslint:disable */
import { Observable, of } from 'rxjs';
import { take, map, switchMap, catchError } from 'rxjs/operators'
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { AlertHistoryApi } from '../services/index';
import { getAlertHistoryById } from '../reducers/AlertHistory';
import { AlertHistoryActions } from '../actions/AlertHistory';

@Injectable()
export class AlertHistoryExistsGuard implements CanActivate {
  constructor(
    private store: Store<any>,
    private AlertHistory: AlertHistoryApi
  ) {}

  public canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.hasEntity(route.params['AlertHistoryId'] || route.params['id']);
  }

  protected hasEntityInStore(id: string): Observable<boolean> {
    return this.store.select(getAlertHistoryById(id)).pipe(
      map((entitie) => !!entitie),
      take(1)
    );
  }

  protected hasEntityInApi(id: string): Observable<boolean> {
    return this.AlertHistory.exists(id).pipe(
      map((response: any) => !!response.exists),
      catchError(() => {
        this.store.dispatch(new AlertHistoryActions.guardFail());
        return of(false);
      })
    );
  }

  protected hasEntity(id: string): Observable<boolean> {
    return this.hasEntityInStore(id).pipe(
      switchMap((inStore) => {
        if (inStore) {
          return of(inStore);
        }

        return this.hasEntityInApi(id);
      })
    );
  }
}
