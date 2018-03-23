// Typings reference file, see links for more information
// https://github.com/typings/typings
// https://www.typescriptlang.org/docs/handbook/writing-declaration-files.html
import * as L from 'leaflet';

declare var System: any;
declare module 'leaflet' {
  namespace control {
    function fullscreen(v: any);
  }
}
