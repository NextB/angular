import { XHR } from 'angular2/src/compiler/xhr';
import { WebWorkerXHRImpl } from 'angular2/src/web_workers/worker/xhr_impl';
import { WebWorkerRootRenderer } from 'angular2/src/web_workers/worker/renderer';
import { print } from 'angular2/src/facade/lang';
import { RootRenderer } from 'angular2/src/core/render/api';
import { PLATFORM_DIRECTIVES, PLATFORM_PIPES, ExceptionHandler, APPLICATION_COMMON_PROVIDERS, PLATFORM_COMMON_PROVIDERS, OpaqueToken } from 'angular2/core';
import { COMMON_DIRECTIVES, COMMON_PIPES, FORM_PROVIDERS } from "angular2/common";
import { ClientMessageBrokerFactory, ClientMessageBrokerFactory_ } from 'angular2/src/web_workers/shared/client_message_broker';
import { ServiceMessageBrokerFactory, ServiceMessageBrokerFactory_ } from 'angular2/src/web_workers/shared/service_message_broker';
import { Serializer } from "angular2/src/web_workers/shared/serializer";
import { ON_WEB_WORKER } from "angular2/src/web_workers/shared/api";
import { RenderStore } from 'angular2/src/web_workers/shared/render_store';
class PrintLogger {
    constructor() {
        this.log = print;
        this.logError = print;
        this.logGroup = print;
    }
    logGroupEnd() { }
}
export const WORKER_APP_PLATFORM_MARKER = 
/*@ts2dart_const*/ new OpaqueToken('WorkerAppPlatformMarker');
export const WORKER_APP_PLATFORM = 
/*@ts2dart_const*/ [
    PLATFORM_COMMON_PROVIDERS,
    /*@ts2dart_const*/ (
    /* @ts2dart_Provider */ { provide: WORKER_APP_PLATFORM_MARKER, useValue: true })
];
export const WORKER_APP_APPLICATION_COMMON = 
/*@ts2dart_const*/ [
    APPLICATION_COMMON_PROVIDERS,
    FORM_PROVIDERS,
    Serializer,
    /* @ts2dart_Provider */ { provide: PLATFORM_PIPES, useValue: COMMON_PIPES, multi: true },
    /* @ts2dart_Provider */ { provide: PLATFORM_DIRECTIVES, useValue: COMMON_DIRECTIVES, multi: true },
    /* @ts2dart_Provider */ { provide: ClientMessageBrokerFactory, useClass: ClientMessageBrokerFactory_ },
    /* @ts2dart_Provider */ { provide: ServiceMessageBrokerFactory, useClass: ServiceMessageBrokerFactory_ },
    WebWorkerRootRenderer,
    /* @ts2dart_Provider */ { provide: RootRenderer, useExisting: WebWorkerRootRenderer },
    /* @ts2dart_Provider */ { provide: ON_WEB_WORKER, useValue: true },
    RenderStore,
    /* @ts2dart_Provider */ { provide: ExceptionHandler, useFactory: _exceptionHandler, deps: [] },
    WebWorkerXHRImpl,
    /* @ts2dart_Provider */ { provide: XHR, useExisting: WebWorkerXHRImpl }
];
function _exceptionHandler() {
    return new ExceptionHandler(new PrintLogger());
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2VyX2FwcF9jb21tb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaWZmaW5nX3BsdWdpbl93cmFwcGVyLW91dHB1dF9wYXRoLUhKRVMxRnAyLnRtcC9hbmd1bGFyMi9zcmMvcGxhdGZvcm0vd29ya2VyX2FwcF9jb21tb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ik9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSwyQkFBMkI7T0FDdEMsRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLDBDQUEwQztPQUNsRSxFQUFDLHFCQUFxQixFQUFDLE1BQU0sMENBQTBDO09BQ3ZFLEVBQUMsS0FBSyxFQUFDLE1BQU0sMEJBQTBCO09BQ3ZDLEVBQUMsWUFBWSxFQUFDLE1BQU0sOEJBQThCO09BQ2xELEVBQ0wsbUJBQW1CLEVBQ25CLGNBQWMsRUFDZCxnQkFBZ0IsRUFDaEIsNEJBQTRCLEVBQzVCLHlCQUF5QixFQUN6QixXQUFXLEVBQ1osTUFBTSxlQUFlO09BQ2YsRUFBQyxpQkFBaUIsRUFBRSxZQUFZLEVBQUUsY0FBYyxFQUFDLE1BQU0saUJBQWlCO09BQ3hFLEVBQ0wsMEJBQTBCLEVBQzFCLDJCQUEyQixFQUM1QixNQUFNLHVEQUF1RDtPQUN2RCxFQUNMLDJCQUEyQixFQUMzQiw0QkFBNEIsRUFDN0IsTUFBTSx3REFBd0Q7T0FDeEQsRUFBQyxVQUFVLEVBQUMsTUFBTSw0Q0FBNEM7T0FDOUQsRUFBQyxhQUFhLEVBQUMsTUFBTSxxQ0FBcUM7T0FDMUQsRUFBQyxXQUFXLEVBQUMsTUFBTSw4Q0FBOEM7QUFFeEU7SUFBQTtRQUNFLFFBQUcsR0FBRyxLQUFLLENBQUM7UUFDWixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLGFBQVEsR0FBRyxLQUFLLENBQUM7SUFFbkIsQ0FBQztJQURDLFdBQVcsS0FBSSxDQUFDO0FBQ2xCLENBQUM7QUFFRCxPQUFPLE1BQU0sMEJBQTBCO0FBQ25DLGtCQUFrQixDQUFDLElBQUksV0FBVyxDQUFDLHlCQUF5QixDQUFDLENBQUM7QUFFbEUsT0FBTyxNQUFNLG1CQUFtQjtBQUM1QixrQkFBa0IsQ0FBQTtJQUNoQix5QkFBeUI7SUFDekIsa0JBQWtCLENBQUM7SUFDZix1QkFBdUIsQ0FBQyxFQUFDLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFDLENBQUM7Q0FDbkYsQ0FBQztBQUVOLE9BQU8sTUFBTSw2QkFBNkI7QUFDdEMsa0JBQWtCLENBQUE7SUFDaEIsNEJBQTRCO0lBQzVCLGNBQWM7SUFDZCxVQUFVO0lBQ1YsdUJBQXVCLENBQUMsRUFBQyxPQUFPLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBQztJQUN0Rix1QkFBdUIsQ0FBQyxFQUFDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBQztJQUNoRyx1QkFBdUIsQ0FBQyxFQUFDLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxRQUFRLEVBQUUsMkJBQTJCLEVBQUM7SUFDcEcsdUJBQXVCLENBQUMsRUFBQyxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsUUFBUSxFQUFFLDRCQUE0QixFQUFDO0lBQ3RHLHFCQUFxQjtJQUNyQix1QkFBdUIsQ0FBQyxFQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLHFCQUFxQixFQUFDO0lBQ25GLHVCQUF1QixDQUFDLEVBQUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFDO0lBQ2hFLFdBQVc7SUFDWCx1QkFBdUIsQ0FBQyxFQUFDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxVQUFVLEVBQUUsaUJBQWlCLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBQztJQUM1RixnQkFBZ0I7SUFDaEIsdUJBQXVCLENBQUMsRUFBQyxPQUFPLEVBQUUsR0FBRyxFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsRUFBQztDQUN0RSxDQUFDO0FBRU47SUFDRSxNQUFNLENBQUMsSUFBSSxnQkFBZ0IsQ0FBQyxJQUFJLFdBQVcsRUFBRSxDQUFDLENBQUM7QUFDakQsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7WEhSfSBmcm9tICdhbmd1bGFyMi9zcmMvY29tcGlsZXIveGhyJztcbmltcG9ydCB7V2ViV29ya2VyWEhSSW1wbH0gZnJvbSAnYW5ndWxhcjIvc3JjL3dlYl93b3JrZXJzL3dvcmtlci94aHJfaW1wbCc7XG5pbXBvcnQge1dlYldvcmtlclJvb3RSZW5kZXJlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL3dlYl93b3JrZXJzL3dvcmtlci9yZW5kZXJlcic7XG5pbXBvcnQge3ByaW50fSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtSb290UmVuZGVyZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL3JlbmRlci9hcGknO1xuaW1wb3J0IHtcbiAgUExBVEZPUk1fRElSRUNUSVZFUyxcbiAgUExBVEZPUk1fUElQRVMsXG4gIEV4Y2VwdGlvbkhhbmRsZXIsXG4gIEFQUExJQ0FUSU9OX0NPTU1PTl9QUk9WSURFUlMsXG4gIFBMQVRGT1JNX0NPTU1PTl9QUk9WSURFUlMsXG4gIE9wYXF1ZVRva2VuXG59IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtDT01NT05fRElSRUNUSVZFUywgQ09NTU9OX1BJUEVTLCBGT1JNX1BST1ZJREVSU30gZnJvbSBcImFuZ3VsYXIyL2NvbW1vblwiO1xuaW1wb3J0IHtcbiAgQ2xpZW50TWVzc2FnZUJyb2tlckZhY3RvcnksXG4gIENsaWVudE1lc3NhZ2VCcm9rZXJGYWN0b3J5X1xufSBmcm9tICdhbmd1bGFyMi9zcmMvd2ViX3dvcmtlcnMvc2hhcmVkL2NsaWVudF9tZXNzYWdlX2Jyb2tlcic7XG5pbXBvcnQge1xuICBTZXJ2aWNlTWVzc2FnZUJyb2tlckZhY3RvcnksXG4gIFNlcnZpY2VNZXNzYWdlQnJva2VyRmFjdG9yeV9cbn0gZnJvbSAnYW5ndWxhcjIvc3JjL3dlYl93b3JrZXJzL3NoYXJlZC9zZXJ2aWNlX21lc3NhZ2VfYnJva2VyJztcbmltcG9ydCB7U2VyaWFsaXplcn0gZnJvbSBcImFuZ3VsYXIyL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvc2VyaWFsaXplclwiO1xuaW1wb3J0IHtPTl9XRUJfV09SS0VSfSBmcm9tIFwiYW5ndWxhcjIvc3JjL3dlYl93b3JrZXJzL3NoYXJlZC9hcGlcIjtcbmltcG9ydCB7UmVuZGVyU3RvcmV9IGZyb20gJ2FuZ3VsYXIyL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvcmVuZGVyX3N0b3JlJztcblxuY2xhc3MgUHJpbnRMb2dnZXIge1xuICBsb2cgPSBwcmludDtcbiAgbG9nRXJyb3IgPSBwcmludDtcbiAgbG9nR3JvdXAgPSBwcmludDtcbiAgbG9nR3JvdXBFbmQoKSB7fVxufVxuXG5leHBvcnQgY29uc3QgV09SS0VSX0FQUF9QTEFURk9STV9NQVJLRVIgPVxuICAgIC8qQHRzMmRhcnRfY29uc3QqLyBuZXcgT3BhcXVlVG9rZW4oJ1dvcmtlckFwcFBsYXRmb3JtTWFya2VyJyk7XG5cbmV4cG9ydCBjb25zdCBXT1JLRVJfQVBQX1BMQVRGT1JNOiBBcnJheTxhbnkgLypUeXBlIHwgUHJvdmlkZXIgfCBhbnlbXSovPiA9XG4gICAgLypAdHMyZGFydF9jb25zdCovW1xuICAgICAgUExBVEZPUk1fQ09NTU9OX1BST1ZJREVSUyxcbiAgICAgIC8qQHRzMmRhcnRfY29uc3QqLyAoXG4gICAgICAgICAgLyogQHRzMmRhcnRfUHJvdmlkZXIgKi8ge3Byb3ZpZGU6IFdPUktFUl9BUFBfUExBVEZPUk1fTUFSS0VSLCB1c2VWYWx1ZTogdHJ1ZX0pXG4gICAgXTtcblxuZXhwb3J0IGNvbnN0IFdPUktFUl9BUFBfQVBQTElDQVRJT05fQ09NTU9OOiBBcnJheTxhbnkgLypUeXBlIHwgUHJvdmlkZXIgfCBhbnlbXSovPiA9XG4gICAgLypAdHMyZGFydF9jb25zdCovW1xuICAgICAgQVBQTElDQVRJT05fQ09NTU9OX1BST1ZJREVSUyxcbiAgICAgIEZPUk1fUFJPVklERVJTLFxuICAgICAgU2VyaWFsaXplcixcbiAgICAgIC8qIEB0czJkYXJ0X1Byb3ZpZGVyICovIHtwcm92aWRlOiBQTEFURk9STV9QSVBFUywgdXNlVmFsdWU6IENPTU1PTl9QSVBFUywgbXVsdGk6IHRydWV9LFxuICAgICAgLyogQHRzMmRhcnRfUHJvdmlkZXIgKi8ge3Byb3ZpZGU6IFBMQVRGT1JNX0RJUkVDVElWRVMsIHVzZVZhbHVlOiBDT01NT05fRElSRUNUSVZFUywgbXVsdGk6IHRydWV9LFxuICAgICAgLyogQHRzMmRhcnRfUHJvdmlkZXIgKi8ge3Byb3ZpZGU6IENsaWVudE1lc3NhZ2VCcm9rZXJGYWN0b3J5LCB1c2VDbGFzczogQ2xpZW50TWVzc2FnZUJyb2tlckZhY3RvcnlffSxcbiAgICAgIC8qIEB0czJkYXJ0X1Byb3ZpZGVyICovIHtwcm92aWRlOiBTZXJ2aWNlTWVzc2FnZUJyb2tlckZhY3RvcnksIHVzZUNsYXNzOiBTZXJ2aWNlTWVzc2FnZUJyb2tlckZhY3RvcnlffSxcbiAgICAgIFdlYldvcmtlclJvb3RSZW5kZXJlcixcbiAgICAgIC8qIEB0czJkYXJ0X1Byb3ZpZGVyICovIHtwcm92aWRlOiBSb290UmVuZGVyZXIsIHVzZUV4aXN0aW5nOiBXZWJXb3JrZXJSb290UmVuZGVyZXJ9LFxuICAgICAgLyogQHRzMmRhcnRfUHJvdmlkZXIgKi8ge3Byb3ZpZGU6IE9OX1dFQl9XT1JLRVIsIHVzZVZhbHVlOiB0cnVlfSxcbiAgICAgIFJlbmRlclN0b3JlLFxuICAgICAgLyogQHRzMmRhcnRfUHJvdmlkZXIgKi8ge3Byb3ZpZGU6IEV4Y2VwdGlvbkhhbmRsZXIsIHVzZUZhY3Rvcnk6IF9leGNlcHRpb25IYW5kbGVyLCBkZXBzOiBbXX0sXG4gICAgICBXZWJXb3JrZXJYSFJJbXBsLFxuICAgICAgLyogQHRzMmRhcnRfUHJvdmlkZXIgKi8ge3Byb3ZpZGU6IFhIUiwgdXNlRXhpc3Rpbmc6IFdlYldvcmtlclhIUkltcGx9XG4gICAgXTtcblxuZnVuY3Rpb24gX2V4Y2VwdGlvbkhhbmRsZXIoKTogRXhjZXB0aW9uSGFuZGxlciB7XG4gIHJldHVybiBuZXcgRXhjZXB0aW9uSGFuZGxlcihuZXcgUHJpbnRMb2dnZXIoKSk7XG59XG4iXX0=