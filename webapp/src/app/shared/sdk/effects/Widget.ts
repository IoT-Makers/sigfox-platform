/* tslint:disable */
import {Inject, Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {BaseLoopbackEffects} from './base';
import {WidgetActions, WidgetActionTypes} from '../actions/Widget';
import {WidgetApi} from '../services/index';

@Injectable()
export class WidgetEffects extends BaseLoopbackEffects {
    /**
   * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
   * @description
   * Decorate base effects metadata
   */
  @Effect() public create$;
  @Effect() public createMany$;
  @Effect() public findById$;
  @Effect() public find$;
  @Effect() public findOne$;
  @Effect() public updateAll$;
  @Effect() public deleteById$;
  @Effect() public updateAttributes$;
  @Effect() public upsert$;
  @Effect() public upsertWithWhere$;
  @Effect() public replaceOrCreate$;
  @Effect() public replaceById$;
  @Effect() public patchOrCreate$;
  @Effect() public patchAttributes$;

  constructor(
    @Inject(Actions) public actions$: Actions,
    @Inject(WidgetApi) public widget: WidgetApi
  ) {
    super(actions$, widget, 'Widget', WidgetActionTypes, WidgetActions);
  }
}
