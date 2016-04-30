/**
 * @module
 * @description
 * Alternative implementation of the router. Experimental.
 */
export { Router, RouterOutletMap } from './src/alt_router/router';
export { RouteSegment, UrlSegment, Tree } from './src/alt_router/segments';
export { Routes } from './src/alt_router/metadata/decorators';
export { Route } from './src/alt_router/metadata/metadata';
export { RouterUrlSerializer, DefaultRouterUrlSerializer } from './src/alt_router/router_url_serializer';
export { ROUTER_PROVIDERS } from './src/alt_router/router_providers';
import { RouterOutlet } from './src/alt_router/directives/router_outlet';
import { RouterLink } from './src/alt_router/directives/router_link';
export const ROUTER_DIRECTIVES = [RouterOutlet, RouterLink];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWx0X3JvdXRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtSEpFUzFGcDIudG1wL2FuZ3VsYXIyL2FsdF9yb3V0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILFNBQVEsTUFBTSxFQUFFLGVBQWUsUUFBTyx5QkFBeUIsQ0FBQztBQUNoRSxTQUFRLFlBQVksRUFBRSxVQUFVLEVBQUUsSUFBSSxRQUFPLDJCQUEyQixDQUFDO0FBQ3pFLFNBQVEsTUFBTSxRQUFPLHNDQUFzQyxDQUFDO0FBQzVELFNBQVEsS0FBSyxRQUFPLG9DQUFvQyxDQUFDO0FBQ3pELFNBQ0UsbUJBQW1CLEVBQ25CLDBCQUEwQixRQUNyQix3Q0FBd0MsQ0FBQztBQUVoRCxTQUFRLGdCQUFnQixRQUFPLG1DQUFtQyxDQUFDO09BRTVELEVBQUMsWUFBWSxFQUFDLE1BQU0sMkNBQTJDO09BQy9ELEVBQUMsVUFBVSxFQUFDLE1BQU0seUNBQXlDO0FBRWxFLE9BQU8sTUFBTSxpQkFBaUIsR0FBNEIsQ0FBQyxZQUFZLEVBQUUsVUFBVSxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBtb2R1bGVcbiAqIEBkZXNjcmlwdGlvblxuICogQWx0ZXJuYXRpdmUgaW1wbGVtZW50YXRpb24gb2YgdGhlIHJvdXRlci4gRXhwZXJpbWVudGFsLlxuICovXG5cbmV4cG9ydCB7Um91dGVyLCBSb3V0ZXJPdXRsZXRNYXB9IGZyb20gJy4vc3JjL2FsdF9yb3V0ZXIvcm91dGVyJztcbmV4cG9ydCB7Um91dGVTZWdtZW50LCBVcmxTZWdtZW50LCBUcmVlfSBmcm9tICcuL3NyYy9hbHRfcm91dGVyL3NlZ21lbnRzJztcbmV4cG9ydCB7Um91dGVzfSBmcm9tICcuL3NyYy9hbHRfcm91dGVyL21ldGFkYXRhL2RlY29yYXRvcnMnO1xuZXhwb3J0IHtSb3V0ZX0gZnJvbSAnLi9zcmMvYWx0X3JvdXRlci9tZXRhZGF0YS9tZXRhZGF0YSc7XG5leHBvcnQge1xuICBSb3V0ZXJVcmxTZXJpYWxpemVyLFxuICBEZWZhdWx0Um91dGVyVXJsU2VyaWFsaXplclxufSBmcm9tICcuL3NyYy9hbHRfcm91dGVyL3JvdXRlcl91cmxfc2VyaWFsaXplcic7XG5leHBvcnQge09uQWN0aXZhdGUsIENhbkRlYWN0aXZhdGV9IGZyb20gJy4vc3JjL2FsdF9yb3V0ZXIvaW50ZXJmYWNlcyc7XG5leHBvcnQge1JPVVRFUl9QUk9WSURFUlN9IGZyb20gJy4vc3JjL2FsdF9yb3V0ZXIvcm91dGVyX3Byb3ZpZGVycyc7XG5cbmltcG9ydCB7Um91dGVyT3V0bGV0fSBmcm9tICcuL3NyYy9hbHRfcm91dGVyL2RpcmVjdGl2ZXMvcm91dGVyX291dGxldCc7XG5pbXBvcnQge1JvdXRlckxpbmt9IGZyb20gJy4vc3JjL2FsdF9yb3V0ZXIvZGlyZWN0aXZlcy9yb3V0ZXJfbGluayc7XG5cbmV4cG9ydCBjb25zdCBST1VURVJfRElSRUNUSVZFUzogYW55W10gPSAvKkB0czJkYXJ0X2NvbnN0Ki9bUm91dGVyT3V0bGV0LCBSb3V0ZXJMaW5rXTtcbiJdfQ==