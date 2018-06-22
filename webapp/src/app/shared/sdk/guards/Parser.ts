/* tslint:disable */
import { Observable, of } from 'rxjs';
import { take, map, switchMap, catchError } from 'rxjs/operators'
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { ParserApi } from '../services/index';
import { getParserById } from '../reducers/Parser';
import { ParserActions } from '../actions/Parser';

@Injectable()
export class ParserExistsGuard implements CanActivate {
  constructor(
    private store: Store<any>,
    private Parser: ParserApi
  ) {}

  public canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.hasEntity(route.params['ParserId'] || route.params['id']);
  }

  protected hasEntityInStore(id: string): Observable<boolean> {
    return this.store.select(getParserById(id)).pipe(
      map((entitie) => !!entitie),
      take(1)
    );
  }

  protected hasEntityInApi(id: string): Observable<boolean> {
    return this.Parser.exists(id).pipe(
      map((response: any) => !!response.exists),
      catchError(() => {
        this.store.dispatch(new ParserActions.guardFail());
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
