var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, ReflectiveInjector } from 'angular2/src/core/di';
import { ComponentResolver } from './component_resolver';
import { isPresent } from 'angular2/src/facade/lang';
/**
 * Use ComponentResolver and ViewContainerRef directly.
 *
 * @deprecated
 */
export class DynamicComponentLoader {
}
export let DynamicComponentLoader_ = class DynamicComponentLoader_ extends DynamicComponentLoader {
    constructor(_compiler) {
        super();
        this._compiler = _compiler;
    }
    loadAsRoot(type, overrideSelectorOrNode, injector, onDispose, projectableNodes) {
        return this._compiler.resolveComponent(type).then(componentFactory => {
            var componentRef = componentFactory.create(injector, projectableNodes, isPresent(overrideSelectorOrNode) ? overrideSelectorOrNode : componentFactory.selector);
            if (isPresent(onDispose)) {
                componentRef.onDestroy(onDispose);
            }
            return componentRef;
        });
    }
    loadNextToLocation(type, location, providers = null, projectableNodes = null) {
        return this._compiler.resolveComponent(type).then(componentFactory => {
            var contextInjector = location.parentInjector;
            var childInjector = isPresent(providers) && providers.length > 0 ?
                ReflectiveInjector.fromResolvedProviders(providers, contextInjector) :
                contextInjector;
            return location.createComponent(componentFactory, location.length, childInjector, projectableNodes);
        });
    }
};
DynamicComponentLoader_ = __decorate([
    Injectable(), 
    __metadata('design:paramtypes', [ComponentResolver])
], DynamicComponentLoader_);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pY19jb21wb25lbnRfbG9hZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGlmZmluZ19wbHVnaW5fd3JhcHBlci1vdXRwdXRfcGF0aC1ISkVTMUZwMi50bXAvYW5ndWxhcjIvc3JjL2NvcmUvbGlua2VyL2R5bmFtaWNfY29tcG9uZW50X2xvYWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7T0FBTyxFQUdMLFVBQVUsRUFDVixrQkFBa0IsRUFDbkIsTUFBTSxzQkFBc0I7T0FDdEIsRUFBQyxpQkFBaUIsRUFBQyxNQUFNLHNCQUFzQjtPQUMvQyxFQUEwQixTQUFTLEVBQUMsTUFBTSwwQkFBMEI7QUFJM0U7Ozs7R0FJRztBQUNIO0FBa0dBLENBQUM7QUFHRCwyRUFBNkMsc0JBQXNCO0lBQ2pFLFlBQW9CLFNBQTRCO1FBQUksT0FBTyxDQUFDO1FBQXhDLGNBQVMsR0FBVCxTQUFTLENBQW1CO0lBQWEsQ0FBQztJQUU5RCxVQUFVLENBQUMsSUFBVSxFQUFFLHNCQUFvQyxFQUFFLFFBQWtCLEVBQ3BFLFNBQXNCLEVBQUUsZ0JBQTBCO1FBQzNELE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0I7WUFDaEUsSUFBSSxZQUFZLEdBQUcsZ0JBQWdCLENBQUMsTUFBTSxDQUN0QyxRQUFRLEVBQUUsZ0JBQWdCLEVBQzFCLFNBQVMsQ0FBQyxzQkFBc0IsQ0FBQyxHQUFHLHNCQUFzQixHQUFHLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzVGLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pCLFlBQVksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDcEMsQ0FBQztZQUNELE1BQU0sQ0FBQyxZQUFZLENBQUM7UUFDdEIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsa0JBQWtCLENBQUMsSUFBVSxFQUFFLFFBQTBCLEVBQ3RDLFNBQVMsR0FBaUMsSUFBSSxFQUM5QyxnQkFBZ0IsR0FBWSxJQUFJO1FBQ2pELE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0I7WUFDaEUsSUFBSSxlQUFlLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQztZQUM5QyxJQUFJLGFBQWEsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDO2dCQUN4QyxrQkFBa0IsQ0FBQyxxQkFBcUIsQ0FBQyxTQUFTLEVBQUUsZUFBZSxDQUFDO2dCQUNwRSxlQUFlLENBQUM7WUFDeEMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLEVBQUUsUUFBUSxDQUFDLE1BQU0sRUFBRSxhQUFhLEVBQ2hELGdCQUFnQixDQUFDLENBQUM7UUFDcEQsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0FBQ0gsQ0FBQztBQTdCRDtJQUFDLFVBQVUsRUFBRTs7MkJBQUE7QUE2QloiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBJbmplY3RvcixcbiAgUmVzb2x2ZWRSZWZsZWN0aXZlUHJvdmlkZXIsXG4gIEluamVjdGFibGUsXG4gIFJlZmxlY3RpdmVJbmplY3RvclxufSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9kaSc7XG5pbXBvcnQge0NvbXBvbmVudFJlc29sdmVyfSBmcm9tICcuL2NvbXBvbmVudF9yZXNvbHZlcic7XG5pbXBvcnQge2lzVHlwZSwgVHlwZSwgc3RyaW5naWZ5LCBpc1ByZXNlbnR9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge0NvbXBvbmVudFJlZn0gZnJvbSAnLi9jb21wb25lbnRfZmFjdG9yeSc7XG5pbXBvcnQge1ZpZXdDb250YWluZXJSZWZ9IGZyb20gJy4vdmlld19jb250YWluZXJfcmVmJztcblxuLyoqXG4gKiBVc2UgQ29tcG9uZW50UmVzb2x2ZXIgYW5kIFZpZXdDb250YWluZXJSZWYgZGlyZWN0bHkuXG4gKlxuICogQGRlcHJlY2F0ZWRcbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIER5bmFtaWNDb21wb25lbnRMb2FkZXIge1xuICAvKipcbiAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBhIENvbXBvbmVudCBgdHlwZWAgYW5kIGF0dGFjaGVzIGl0IHRvIHRoZSBmaXJzdCBlbGVtZW50IGluIHRoZVxuICAgKiBwbGF0Zm9ybS1zcGVjaWZpYyBnbG9iYWwgdmlldyB0aGF0IG1hdGNoZXMgdGhlIGNvbXBvbmVudCdzIHNlbGVjdG9yLlxuICAgKlxuICAgKiBJbiBhIGJyb3dzZXIgdGhlIHBsYXRmb3JtLXNwZWNpZmljIGdsb2JhbCB2aWV3IGlzIHRoZSBtYWluIERPTSBEb2N1bWVudC5cbiAgICpcbiAgICogSWYgbmVlZGVkLCB0aGUgY29tcG9uZW50J3Mgc2VsZWN0b3IgY2FuIGJlIG92ZXJyaWRkZW4gdmlhIGBvdmVycmlkZVNlbGVjdG9yYC5cbiAgICpcbiAgICogWW91IGNhbiBvcHRpb25hbGx5IHByb3ZpZGUgYGluamVjdG9yYCBhbmQgdGhpcyB7QGxpbmsgSW5qZWN0b3J9IHdpbGwgYmUgdXNlZCB0byBpbnN0YW50aWF0ZSB0aGVcbiAgICogQ29tcG9uZW50LlxuICAgKlxuICAgKiBUbyBiZSBub3RpZmllZCB3aGVuIHRoaXMgQ29tcG9uZW50IGluc3RhbmNlIGlzIGRlc3Ryb3llZCwgeW91IGNhbiBhbHNvIG9wdGlvbmFsbHkgcHJvdmlkZVxuICAgKiBgb25EaXNwb3NlYCBjYWxsYmFjay5cbiAgICpcbiAgICogUmV0dXJucyBhIHByb21pc2UgZm9yIHRoZSB7QGxpbmsgQ29tcG9uZW50UmVmfSByZXByZXNlbnRpbmcgdGhlIG5ld2x5IGNyZWF0ZWQgQ29tcG9uZW50LlxuICAgKlxuICAgKiAjIyMgRXhhbXBsZVxuICAgKlxuICAgKiBgYGBcbiAgICogQENvbXBvbmVudCh7XG4gICAqICAgc2VsZWN0b3I6ICdjaGlsZC1jb21wb25lbnQnLFxuICAgKiAgIHRlbXBsYXRlOiAnQ2hpbGQnXG4gICAqIH0pXG4gICAqIGNsYXNzIENoaWxkQ29tcG9uZW50IHtcbiAgICogfVxuICAgKlxuICAgKiBAQ29tcG9uZW50KHtcbiAgICogICBzZWxlY3RvcjogJ215LWFwcCcsXG4gICAqICAgdGVtcGxhdGU6ICdQYXJlbnQgKDxjaGlsZCBpZD1cImNoaWxkXCI+PC9jaGlsZD4pJ1xuICAgKiB9KVxuICAgKiBjbGFzcyBNeUFwcCB7XG4gICAqICAgY29uc3RydWN0b3IoZGNsOiBEeW5hbWljQ29tcG9uZW50TG9hZGVyLCBpbmplY3RvcjogSW5qZWN0b3IpIHtcbiAgICogICAgIGRjbC5sb2FkQXNSb290KENoaWxkQ29tcG9uZW50LCAnI2NoaWxkJywgaW5qZWN0b3IpO1xuICAgKiAgIH1cbiAgICogfVxuICAgKlxuICAgKiBib290c3RyYXAoTXlBcHApO1xuICAgKiBgYGBcbiAgICpcbiAgICogUmVzdWx0aW5nIERPTTpcbiAgICpcbiAgICogYGBgXG4gICAqIDxteS1hcHA+XG4gICAqICAgUGFyZW50IChcbiAgICogICAgIDxjaGlsZCBpZD1cImNoaWxkXCI+Q2hpbGQ8L2NoaWxkPlxuICAgKiAgIClcbiAgICogPC9teS1hcHA+XG4gICAqIGBgYFxuICAgKi9cbiAgYWJzdHJhY3QgbG9hZEFzUm9vdCh0eXBlOiBUeXBlLCBvdmVycmlkZVNlbGVjdG9yT3JOb2RlOiBzdHJpbmcgfCBhbnksIGluamVjdG9yOiBJbmplY3RvcixcbiAgICAgICAgICAgICAgICAgICAgICBvbkRpc3Bvc2U/OiAoKSA9PiB2b2lkLFxuICAgICAgICAgICAgICAgICAgICAgIHByb2plY3RhYmxlTm9kZXM/OiBhbnlbXVtdKTogUHJvbWlzZTxDb21wb25lbnRSZWY8YW55Pj47XG5cblxuICAvKipcbiAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBhIENvbXBvbmVudCBhbmQgYXR0YWNoZXMgaXQgdG8gdGhlIFZpZXcgQ29udGFpbmVyIGZvdW5kIGF0IHRoZVxuICAgKiBgbG9jYXRpb25gIHNwZWNpZmllZCBhcyB7QGxpbmsgVmlld0NvbnRhaW5lclJlZn0uXG4gICAqXG4gICAqIFlvdSBjYW4gb3B0aW9uYWxseSBwcm92aWRlIGBwcm92aWRlcnNgIHRvIGNvbmZpZ3VyZSB0aGUge0BsaW5rIEluamVjdG9yfSBwcm92aXNpb25lZCBmb3IgdGhpc1xuICAgKiBDb21wb25lbnQgSW5zdGFuY2UuXG4gICAqXG4gICAqIFJldHVybnMgYSBwcm9taXNlIGZvciB0aGUge0BsaW5rIENvbXBvbmVudFJlZn0gcmVwcmVzZW50aW5nIHRoZSBuZXdseSBjcmVhdGVkIENvbXBvbmVudC5cbiAgICpcbiAgICpcbiAgICogIyMjIEV4YW1wbGVcbiAgICpcbiAgICogYGBgXG4gICAqIEBDb21wb25lbnQoe1xuICAgKiAgIHNlbGVjdG9yOiAnY2hpbGQtY29tcG9uZW50JyxcbiAgICogICB0ZW1wbGF0ZTogJ0NoaWxkJ1xuICAgKiB9KVxuICAgKiBjbGFzcyBDaGlsZENvbXBvbmVudCB7XG4gICAqIH1cbiAgICpcbiAgICogQENvbXBvbmVudCh7XG4gICAqICAgc2VsZWN0b3I6ICdteS1hcHAnLFxuICAgKiAgIHRlbXBsYXRlOiAnUGFyZW50J1xuICAgKiB9KVxuICAgKiBjbGFzcyBNeUFwcCB7XG4gICAqICAgY29uc3RydWN0b3IoZGNsOiBEeW5hbWljQ29tcG9uZW50TG9hZGVyLCB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmKSB7XG4gICAqICAgICBkY2wubG9hZE5leHRUb0xvY2F0aW9uKENoaWxkQ29tcG9uZW50LCB2aWV3Q29udGFpbmVyUmVmKTtcbiAgICogICB9XG4gICAqIH1cbiAgICpcbiAgICogYm9vdHN0cmFwKE15QXBwKTtcbiAgICogYGBgXG4gICAqXG4gICAqIFJlc3VsdGluZyBET006XG4gICAqXG4gICAqIGBgYFxuICAgKiA8bXktYXBwPlBhcmVudDwvbXktYXBwPlxuICAgKiA8Y2hpbGQtY29tcG9uZW50PkNoaWxkPC9jaGlsZC1jb21wb25lbnQ+XG4gICAqIGBgYFxuICAgKi9cbiAgYWJzdHJhY3QgbG9hZE5leHRUb0xvY2F0aW9uKHR5cGU6IFR5cGUsIGxvY2F0aW9uOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvdmlkZXJzPzogUmVzb2x2ZWRSZWZsZWN0aXZlUHJvdmlkZXJbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2plY3RhYmxlTm9kZXM/OiBhbnlbXVtdKTogUHJvbWlzZTxDb21wb25lbnRSZWY8YW55Pj47XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEeW5hbWljQ29tcG9uZW50TG9hZGVyXyBleHRlbmRzIER5bmFtaWNDb21wb25lbnRMb2FkZXIge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9jb21waWxlcjogQ29tcG9uZW50UmVzb2x2ZXIpIHsgc3VwZXIoKTsgfVxuXG4gIGxvYWRBc1Jvb3QodHlwZTogVHlwZSwgb3ZlcnJpZGVTZWxlY3Rvck9yTm9kZTogc3RyaW5nIHwgYW55LCBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgICAgICAgICAgb25EaXNwb3NlPzogKCkgPT4gdm9pZCwgcHJvamVjdGFibGVOb2Rlcz86IGFueVtdW10pOiBQcm9taXNlPENvbXBvbmVudFJlZjxhbnk+PiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbXBpbGVyLnJlc29sdmVDb21wb25lbnQodHlwZSkudGhlbihjb21wb25lbnRGYWN0b3J5ID0+IHtcbiAgICAgIHZhciBjb21wb25lbnRSZWYgPSBjb21wb25lbnRGYWN0b3J5LmNyZWF0ZShcbiAgICAgICAgICBpbmplY3RvciwgcHJvamVjdGFibGVOb2RlcyxcbiAgICAgICAgICBpc1ByZXNlbnQob3ZlcnJpZGVTZWxlY3Rvck9yTm9kZSkgPyBvdmVycmlkZVNlbGVjdG9yT3JOb2RlIDogY29tcG9uZW50RmFjdG9yeS5zZWxlY3Rvcik7XG4gICAgICBpZiAoaXNQcmVzZW50KG9uRGlzcG9zZSkpIHtcbiAgICAgICAgY29tcG9uZW50UmVmLm9uRGVzdHJveShvbkRpc3Bvc2UpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbXBvbmVudFJlZjtcbiAgICB9KTtcbiAgfVxuXG4gIGxvYWROZXh0VG9Mb2NhdGlvbih0eXBlOiBUeXBlLCBsb2NhdGlvbjogVmlld0NvbnRhaW5lclJlZixcbiAgICAgICAgICAgICAgICAgICAgIHByb3ZpZGVyczogUmVzb2x2ZWRSZWZsZWN0aXZlUHJvdmlkZXJbXSA9IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICBwcm9qZWN0YWJsZU5vZGVzOiBhbnlbXVtdID0gbnVsbCk6IFByb21pc2U8Q29tcG9uZW50UmVmPGFueT4+IHtcbiAgICByZXR1cm4gdGhpcy5fY29tcGlsZXIucmVzb2x2ZUNvbXBvbmVudCh0eXBlKS50aGVuKGNvbXBvbmVudEZhY3RvcnkgPT4ge1xuICAgICAgdmFyIGNvbnRleHRJbmplY3RvciA9IGxvY2F0aW9uLnBhcmVudEluamVjdG9yO1xuICAgICAgdmFyIGNoaWxkSW5qZWN0b3IgPSBpc1ByZXNlbnQocHJvdmlkZXJzKSAmJiBwcm92aWRlcnMubGVuZ3RoID4gMCA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWZsZWN0aXZlSW5qZWN0b3IuZnJvbVJlc29sdmVkUHJvdmlkZXJzKHByb3ZpZGVycywgY29udGV4dEluamVjdG9yKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0SW5qZWN0b3I7XG4gICAgICByZXR1cm4gbG9jYXRpb24uY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudEZhY3RvcnksIGxvY2F0aW9uLmxlbmd0aCwgY2hpbGRJbmplY3RvcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvamVjdGFibGVOb2Rlcyk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==