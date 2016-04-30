'use strict';"use strict";
var segments_1 = require('./segments');
var metadata_1 = require('./metadata/metadata');
var lang_1 = require('angular2/src/facade/lang');
var collection_1 = require('angular2/src/facade/collection');
var promise_1 = require('angular2/src/facade/promise');
var exceptions_1 = require('angular2/src/facade/exceptions');
var constants_1 = require('./constants');
var reflection_1 = require('angular2/src/core/reflection/reflection');
// TODO: vsavkin: recognize should take the old tree and merge it
function recognize(componentResolver, type, url) {
    var matched = new _MatchResult(type, [url.root], null, segments_1.rootNode(url).children, []);
    return _constructSegment(componentResolver, matched)
        .then(function (roots) { return new segments_1.Tree(roots[0]); });
}
exports.recognize = recognize;
function _recognize(componentResolver, parentType, url) {
    var metadata = _readMetadata(parentType); // should read from the factory instead
    if (lang_1.isBlank(metadata)) {
        throw new exceptions_1.BaseException("Component '" + lang_1.stringify(parentType) + "' does not have route configuration");
    }
    var match;
    try {
        match = _match(metadata, url);
    }
    catch (e) {
        return promise_1.PromiseWrapper.reject(e, null);
    }
    var main = _constructSegment(componentResolver, match);
    var aux = _recognizeMany(componentResolver, parentType, match.aux).then(_checkOutletNameUniqueness);
    return promise_1.PromiseWrapper.all([main, aux]).then(collection_1.ListWrapper.flatten);
}
function _recognizeMany(componentResolver, parentType, urls) {
    var recognized = urls.map(function (u) { return _recognize(componentResolver, parentType, u); });
    return promise_1.PromiseWrapper.all(recognized).then(collection_1.ListWrapper.flatten);
}
function _constructSegment(componentResolver, matched) {
    return componentResolver.resolveComponent(matched.component)
        .then(function (factory) {
        var urlOutlet = matched.consumedUrlSegments[0].outlet;
        var segment = new segments_1.RouteSegment(matched.consumedUrlSegments, matched.parameters, lang_1.isBlank(urlOutlet) ? constants_1.DEFAULT_OUTLET_NAME : urlOutlet, matched.component, factory);
        if (matched.leftOverUrl.length > 0) {
            return _recognizeMany(componentResolver, matched.component, matched.leftOverUrl)
                .then(function (children) { return [new segments_1.TreeNode(segment, children)]; });
        }
        else {
            return _recognizeLeftOvers(componentResolver, matched.component)
                .then(function (children) { return [new segments_1.TreeNode(segment, children)]; });
        }
    });
}
function _recognizeLeftOvers(componentResolver, parentType) {
    return componentResolver.resolveComponent(parentType)
        .then(function (factory) {
        var metadata = _readMetadata(parentType);
        if (lang_1.isBlank(metadata)) {
            return [];
        }
        var r = metadata.routes.filter(function (r) { return r.path == "" || r.path == "/"; });
        if (r.length === 0) {
            return promise_1.PromiseWrapper.resolve([]);
        }
        else {
            return _recognizeLeftOvers(componentResolver, r[0].component)
                .then(function (children) {
                return componentResolver.resolveComponent(r[0].component)
                    .then(function (factory) {
                    var segment = new segments_1.RouteSegment([], null, constants_1.DEFAULT_OUTLET_NAME, r[0].component, factory);
                    return [new segments_1.TreeNode(segment, children)];
                });
            });
        }
    });
}
function _match(metadata, url) {
    for (var _i = 0, _a = metadata.routes; _i < _a.length; _i++) {
        var r = _a[_i];
        var matchingResult = _matchWithParts(r, url);
        if (lang_1.isPresent(matchingResult)) {
            return matchingResult;
        }
    }
    var availableRoutes = metadata.routes.map(function (r) { return ("'" + r.path + "'"); }).join(", ");
    throw new exceptions_1.BaseException("Cannot match any routes. Current segment: '" + url.value + "'. Available routes: [" + availableRoutes + "].");
}
function _matchWithParts(route, url) {
    var path = route.path.startsWith("/") ? route.path.substring(1) : route.path;
    var parts = path.split("/");
    var positionalParams = {};
    var consumedUrlSegments = [];
    var lastParent = null;
    var lastSegment = null;
    var current = url;
    for (var i = 0; i < parts.length; ++i) {
        if (lang_1.isBlank(current))
            return null;
        var p_1 = parts[i];
        var isLastSegment = i === parts.length - 1;
        var isLastParent = i === parts.length - 2;
        var isPosParam = p_1.startsWith(":");
        if (!isPosParam && p_1 != current.value.segment)
            return null;
        if (isLastSegment) {
            lastSegment = current;
        }
        if (isLastParent) {
            lastParent = current;
        }
        if (isPosParam) {
            positionalParams[p_1.substring(1)] = current.value.segment;
        }
        consumedUrlSegments.push(current.value);
        current = collection_1.ListWrapper.first(current.children);
    }
    if (lang_1.isPresent(current) && lang_1.isBlank(current.value.segment)) {
        lastParent = lastSegment;
        lastSegment = current;
    }
    var p = lastSegment.value.parameters;
    var parameters = collection_1.StringMapWrapper.merge(lang_1.isBlank(p) ? {} : p, positionalParams);
    var axuUrlSubtrees = lang_1.isPresent(lastParent) ? lastParent.children.slice(1) : [];
    return new _MatchResult(route.component, consumedUrlSegments, parameters, lastSegment.children, axuUrlSubtrees);
}
function _checkOutletNameUniqueness(nodes) {
    var names = {};
    nodes.forEach(function (n) {
        var segmentWithSameOutletName = names[n.value.outlet];
        if (lang_1.isPresent(segmentWithSameOutletName)) {
            var p = segmentWithSameOutletName.stringifiedUrlSegments;
            var c = n.value.stringifiedUrlSegments;
            throw new exceptions_1.BaseException("Two segments cannot have the same outlet name: '" + p + "' and '" + c + "'.");
        }
        names[n.value.outlet] = n.value;
    });
    return nodes;
}
var _MatchResult = (function () {
    function _MatchResult(component, consumedUrlSegments, parameters, leftOverUrl, aux) {
        this.component = component;
        this.consumedUrlSegments = consumedUrlSegments;
        this.parameters = parameters;
        this.leftOverUrl = leftOverUrl;
        this.aux = aux;
    }
    return _MatchResult;
}());
function _readMetadata(componentType) {
    var metadata = reflection_1.reflector.annotations(componentType).filter(function (f) { return f instanceof metadata_1.RoutesMetadata; });
    return collection_1.ListWrapper.first(metadata);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjb2duaXplLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGlmZmluZ19wbHVnaW5fd3JhcHBlci1vdXRwdXRfcGF0aC1KZnNNMVB6Zi50bXAvYW5ndWxhcjIvc3JjL2FsdF9yb3V0ZXIvcmVjb2duaXplLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSx5QkFBaUUsWUFBWSxDQUFDLENBQUE7QUFDOUUseUJBQTRDLHFCQUFxQixDQUFDLENBQUE7QUFDbEUscUJBQWtELDBCQUEwQixDQUFDLENBQUE7QUFDN0UsMkJBQTRDLGdDQUFnQyxDQUFDLENBQUE7QUFDN0Usd0JBQTZCLDZCQUE2QixDQUFDLENBQUE7QUFDM0QsMkJBQTRCLGdDQUFnQyxDQUFDLENBQUE7QUFFN0QsMEJBQWtDLGFBQWEsQ0FBQyxDQUFBO0FBQ2hELDJCQUF3Qix5Q0FBeUMsQ0FBQyxDQUFBO0FBRWxFLGlFQUFpRTtBQUNqRSxtQkFBMEIsaUJBQW9DLEVBQUUsSUFBVSxFQUNoRCxHQUFxQjtJQUM3QyxJQUFJLE9BQU8sR0FBRyxJQUFJLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLG1CQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ25GLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxpQkFBaUIsRUFBRSxPQUFPLENBQUM7U0FDL0MsSUFBSSxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsSUFBSSxlQUFJLENBQWUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQWhDLENBQWdDLENBQUMsQ0FBQztBQUN2RCxDQUFDO0FBTGUsaUJBQVMsWUFLeEIsQ0FBQTtBQUVELG9CQUFvQixpQkFBb0MsRUFBRSxVQUFnQixFQUN0RCxHQUF5QjtJQUMzQyxJQUFJLFFBQVEsR0FBRyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBRSx1Q0FBdUM7SUFDbEYsRUFBRSxDQUFDLENB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Q0FBQyxlQUFVLENBQUMsT0FBSSxDQUFDLENBQUM7UUFDL0YsQ0FBQztRQUNELEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDbEMsQ0FBQyxDQUFDLENBQUM7SUFDSCxNQUFNLENBQUMsS0FBSyxDQUFDO0FBQ2YsQ0FBQztBQUVEO0lBQ0Usc0JBQW1CLFNBQWUsRUFBUyxtQkFBaUMsRUFDekQsVUFBbUMsRUFDbkMsV0FBbUMsRUFBUyxHQUEyQjtRQUZ2RSxjQUFTLEdBQVQsU0FBUyxDQUFNO1FBQVMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFjO1FBQ3pELGVBQVUsR0FBVixVQUFVLENBQXlCO1FBQ25DLGdCQUFXLEdBQVgsV0FBVyxDQUF3QjtRQUFTLFFBQUcsR0FBSCxHQUFHLENBQXdCO0lBQUcsQ0FBQztJQUNoRyxtQkFBQztBQUFELENBQUMsQUFKRCxJQUlDO0FBRUQsdUJBQXVCLGFBQW1CO0lBQ3hDLElBQUksUUFBUSxHQUFHLHNCQUFTLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsWUFBWSx5QkFBYyxFQUEzQixDQUEyQixDQUFDLENBQUM7SUFDN0YsTUFBTSxDQUFDLHdCQUFXLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3JDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1JvdXRlU2VnbWVudCwgVXJsU2VnbWVudCwgVHJlZSwgVHJlZU5vZGUsIHJvb3ROb2RlfSBmcm9tICcuL3NlZ21lbnRzJztcbmltcG9ydCB7Um91dGVzTWV0YWRhdGEsIFJvdXRlTWV0YWRhdGF9IGZyb20gJy4vbWV0YWRhdGEvbWV0YWRhdGEnO1xuaW1wb3J0IHtUeXBlLCBpc0JsYW5rLCBpc1ByZXNlbnQsIHN0cmluZ2lmeX0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7TGlzdFdyYXBwZXIsIFN0cmluZ01hcFdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5pbXBvcnQge1Byb21pc2VXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL3Byb21pc2UnO1xuaW1wb3J0IHtCYXNlRXhjZXB0aW9ufSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2V4Y2VwdGlvbnMnO1xuaW1wb3J0IHtDb21wb25lbnRSZXNvbHZlcn0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge0RFRkFVTFRfT1VUTEVUX05BTUV9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCB7cmVmbGVjdG9yfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9yZWZsZWN0aW9uL3JlZmxlY3Rpb24nO1xuXG4vLyBUT0RPOiB2c2F2a2luOiByZWNvZ25pemUgc2hvdWxkIHRha2UgdGhlIG9sZCB0cmVlIGFuZCBtZXJnZSBpdFxuZXhwb3J0IGZ1bmN0aW9uIHJlY29nbml6ZShjb21wb25lbnRSZXNvbHZlcjogQ29tcG9uZW50UmVzb2x2ZXIsIHR5cGU6IFR5cGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogVHJlZTxVcmxTZWdtZW50Pik6IFByb21pc2U8VHJlZTxSb3V0ZVNlZ21lbnQ+PiB7XG4gIGxldCBtYXRjaGVkID0gbmV3IF9NYXRjaFJlc3VsdCh0eXBlLCBbdXJsLnJvb3RdLCBudWxsLCByb290Tm9kZSh1cmwpLmNoaWxkcmVuLCBbXSk7XG4gIHJldHVybiBfY29uc3RydWN0U2VnbWVudChjb21wb25lbnRSZXNvbHZlciwgbWF0Y2hlZClcbiAgICAgIC50aGVuKHJvb3RzID0+IG5ldyBUcmVlPFJvdXRlU2VnbWVudD4ocm9vdHNbMF0pKTtcbn1cblxuZnVuY3Rpb24gX3JlY29nbml6ZShjb21wb25lbnRSZXNvbHZlcjogQ29tcG9uZW50UmVzb2x2ZXIsIHBhcmVudFR5cGU6IFR5cGUsXG4gICAgICAgICAgICAgICAgICAgIHVybDogVHJlZU5vZGU8VXJsU2VnbWVudD4pOiBQcm9taXNlPFRyZWVOb2RlPFJvdXRlU2VnbWVudD5bXT4ge1xuICBsZXQgbWV0YWRhdGEgPSBfcmVhZE1ldGFkYXRhKHBhcmVudFR5cGUpOyAgLy8gc2hvdWxkIHJlYWQgZnJvbSB0aGUgZmFjdG9yeSBpbnN0ZWFkXG4gIGlmIChpc0JsYW5rKG1ldGFkYXRhKSkge1xuICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKFxuICAgICAgICBgQ29tcG9uZW50ICcke3N0cmluZ2lmeShwYXJlbnRUeXBlKX0nIGRvZXMgbm90IGhhdmUgcm91dGUgY29uZmlndXJhdGlvbmApO1xuICB9XG5cbiAgbGV0IG1hdGNoO1xuICB0cnkge1xuICAgIG1hdGNoID0gX21hdGNoKG1ldGFkYXRhLCB1cmwpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIFByb21pc2VXcmFwcGVyLnJlamVjdChlLCBudWxsKTtcbiAgfVxuXG4gIGxldCBtYWluID0gX2NvbnN0cnVjdFNlZ21lbnQoY29tcG9uZW50UmVzb2x2ZXIsIG1hdGNoKTtcbiAgbGV0IGF1eCA9XG4gICAgICBfcmVjb2duaXplTWFueShjb21wb25lbnRSZXNvbHZlciwgcGFyZW50VHlwZSwgbWF0Y2guYXV4KS50aGVuKF9jaGVja091dGxldE5hbWVVbmlxdWVuZXNzKTtcbiAgcmV0dXJuIFByb21pc2VXcmFwcGVyLmFsbChbbWFpbiwgYXV4XSkudGhlbihMaXN0V3JhcHBlci5mbGF0dGVuKTtcbn1cblxuZnVuY3Rpb24gX3JlY29nbml6ZU1hbnkoY29tcG9uZW50UmVzb2x2ZXI6IENvbXBvbmVudFJlc29sdmVyLCBwYXJlbnRUeXBlOiBUeXBlLFxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsczogVHJlZU5vZGU8VXJsU2VnbWVudD5bXSk6IFByb21pc2U8VHJlZU5vZGU8Um91dGVTZWdtZW50PltdPiB7XG4gIGxldCByZWNvZ25pemVkID0gdXJscy5tYXAodSA9PiBfcmVjb2duaXplKGNvbXBvbmVudFJlc29sdmVyLCBwYXJlbnRUeXBlLCB1KSk7XG4gIHJldHVybiBQcm9taXNlV3JhcHBlci5hbGwocmVjb2duaXplZCkudGhlbihMaXN0V3JhcHBlci5mbGF0dGVuKTtcbn1cblxuZnVuY3Rpb24gX2NvbnN0cnVjdFNlZ21lbnQoY29tcG9uZW50UmVzb2x2ZXI6IENvbXBvbmVudFJlc29sdmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hlZDogX01hdGNoUmVzdWx0KTogUHJvbWlzZTxUcmVlTm9kZTxSb3V0ZVNlZ21lbnQ+W10+IHtcbiAgcmV0dXJuIGNvbXBvbmVudFJlc29sdmVyLnJlc29sdmVDb21wb25lbnQobWF0Y2hlZC5jb21wb25lbnQpXG4gICAgICAudGhlbihmYWN0b3J5ID0+IHtcbiAgICAgICAgbGV0IHVybE91dGxldCA9IG1hdGNoZWQuY29uc3VtZWRVcmxTZWdtZW50c1swXS5vdXRsZXQ7XG4gICAgICAgIGxldCBzZWdtZW50ID0gbmV3IFJvdXRlU2VnbWVudChtYXRjaGVkLmNvbnN1bWVkVXJsU2VnbWVudHMsIG1hdGNoZWQucGFyYW1ldGVycyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzQmxhbmsodXJsT3V0bGV0KSA/IERFRkFVTFRfT1VUTEVUX05BTUUgOiB1cmxPdXRsZXQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRjaGVkLmNvbXBvbmVudCwgZmFjdG9yeSk7XG5cbiAgICAgICAgaWYgKG1hdGNoZWQubGVmdE92ZXJVcmwubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHJldHVybiBfcmVjb2duaXplTWFueShjb21wb25lbnRSZXNvbHZlciwgbWF0Y2hlZC5jb21wb25lbnQsIG1hdGNoZWQubGVmdE92ZXJVcmwpXG4gICAgICAgICAgICAgIC50aGVuKGNoaWxkcmVuID0+IFtuZXcgVHJlZU5vZGU8Um91dGVTZWdtZW50PihzZWdtZW50LCBjaGlsZHJlbildKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gX3JlY29nbml6ZUxlZnRPdmVycyhjb21wb25lbnRSZXNvbHZlciwgbWF0Y2hlZC5jb21wb25lbnQpXG4gICAgICAgICAgICAgIC50aGVuKGNoaWxkcmVuID0+IFtuZXcgVHJlZU5vZGU8Um91dGVTZWdtZW50PihzZWdtZW50LCBjaGlsZHJlbildKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG59XG5cbmZ1bmN0aW9uIF9yZWNvZ25pemVMZWZ0T3ZlcnMoY29tcG9uZW50UmVzb2x2ZXI6IENvbXBvbmVudFJlc29sdmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnRUeXBlOiBUeXBlKTogUHJvbWlzZTxUcmVlTm9kZTxSb3V0ZVNlZ21lbnQ+W10+IHtcbiAgcmV0dXJuIGNvbXBvbmVudFJlc29sdmVyLnJlc29sdmVDb21wb25lbnQocGFyZW50VHlwZSlcbiAgICAgIC50aGVuKGZhY3RvcnkgPT4ge1xuICAgICAgICBsZXQgbWV0YWRhdGEgPSBfcmVhZE1ldGFkYXRhKHBhcmVudFR5cGUpO1xuICAgICAgICBpZiAoaXNCbGFuayhtZXRhZGF0YSkpIHtcbiAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgciA9ICg8YW55W10+bWV0YWRhdGEucm91dGVzKS5maWx0ZXIociA9PiByLnBhdGggPT0gXCJcIiB8fCByLnBhdGggPT0gXCIvXCIpO1xuICAgICAgICBpZiAoci5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZVdyYXBwZXIucmVzb2x2ZShbXSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIF9yZWNvZ25pemVMZWZ0T3ZlcnMoY29tcG9uZW50UmVzb2x2ZXIsIHJbMF0uY29tcG9uZW50KVxuICAgICAgICAgICAgICAudGhlbihjaGlsZHJlbiA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbXBvbmVudFJlc29sdmVyLnJlc29sdmVDb21wb25lbnQoclswXS5jb21wb25lbnQpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZhY3RvcnkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIGxldCBzZWdtZW50ID1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFJvdXRlU2VnbWVudChbXSwgbnVsbCwgREVGQVVMVF9PVVRMRVRfTkFNRSwgclswXS5jb21wb25lbnQsIGZhY3RvcnkpO1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbbmV3IFRyZWVOb2RlPFJvdXRlU2VnbWVudD4oc2VnbWVudCwgY2hpbGRyZW4pXTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbn1cblxuZnVuY3Rpb24gX21hdGNoKG1ldGFkYXRhOiBSb3V0ZXNNZXRhZGF0YSwgdXJsOiBUcmVlTm9kZTxVcmxTZWdtZW50Pik6IF9NYXRjaFJlc3VsdCB7XG4gIGZvciAobGV0IHIgb2YgbWV0YWRhdGEucm91dGVzKSB7XG4gICAgbGV0IG1hdGNoaW5nUmVzdWx0ID0gX21hdGNoV2l0aFBhcnRzKHIsIHVybCk7XG4gICAgaWYgKGlzUHJlc2VudChtYXRjaGluZ1Jlc3VsdCkpIHtcbiAgICAgIHJldHVybiBtYXRjaGluZ1Jlc3VsdDtcbiAgICB9XG4gIH1cbiAgbGV0IGF2YWlsYWJsZVJvdXRlcyA9IG1ldGFkYXRhLnJvdXRlcy5tYXAociA9PiBgJyR7ci5wYXRofSdgKS5qb2luKFwiLCBcIik7XG4gIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKFxuICAgICAgYENhbm5vdCBtYXRjaCBhbnkgcm91dGVzLiBDdXJyZW50IHNlZ21lbnQ6ICcke3VybC52YWx1ZX0nLiBBdmFpbGFibGUgcm91dGVzOiBbJHthdmFpbGFibGVSb3V0ZXN9XS5gKTtcbn1cblxuZnVuY3Rpb24gX21hdGNoV2l0aFBhcnRzKHJvdXRlOiBSb3V0ZU1ldGFkYXRhLCB1cmw6IFRyZWVOb2RlPFVybFNlZ21lbnQ+KTogX01hdGNoUmVzdWx0IHtcbiAgbGV0IHBhdGggPSByb3V0ZS5wYXRoLnN0YXJ0c1dpdGgoXCIvXCIpID8gcm91dGUucGF0aC5zdWJzdHJpbmcoMSkgOiByb3V0ZS5wYXRoO1xuICBsZXQgcGFydHMgPSBwYXRoLnNwbGl0KFwiL1wiKTtcbiAgbGV0IHBvc2l0aW9uYWxQYXJhbXMgPSB7fTtcbiAgbGV0IGNvbnN1bWVkVXJsU2VnbWVudHMgPSBbXTtcblxuICBsZXQgbGFzdFBhcmVudDogVHJlZU5vZGU8VXJsU2VnbWVudD4gPSBudWxsO1xuICBsZXQgbGFzdFNlZ21lbnQ6IFRyZWVOb2RlPFVybFNlZ21lbnQ+ID0gbnVsbDtcblxuICBsZXQgY3VycmVudCA9IHVybDtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXJ0cy5sZW5ndGg7ICsraSkge1xuICAgIGlmIChpc0JsYW5rKGN1cnJlbnQpKSByZXR1cm4gbnVsbDtcblxuICAgIGxldCBwID0gcGFydHNbaV07XG4gICAgbGV0IGlzTGFzdFNlZ21lbnQgPSBpID09PSBwYXJ0cy5sZW5ndGggLSAxO1xuICAgIGxldCBpc0xhc3RQYXJlbnQgPSBpID09PSBwYXJ0cy5sZW5ndGggLSAyO1xuICAgIGxldCBpc1Bvc1BhcmFtID0gcC5zdGFydHNXaXRoKFwiOlwiKTtcblxuICAgIGlmICghaXNQb3NQYXJhbSAmJiBwICE9IGN1cnJlbnQudmFsdWUuc2VnbWVudCkgcmV0dXJuIG51bGw7XG4gICAgaWYgKGlzTGFzdFNlZ21lbnQpIHtcbiAgICAgIGxhc3RTZWdtZW50ID0gY3VycmVudDtcbiAgICB9XG4gICAgaWYgKGlzTGFzdFBhcmVudCkge1xuICAgICAgbGFzdFBhcmVudCA9IGN1cnJlbnQ7XG4gICAgfVxuXG4gICAgaWYgKGlzUG9zUGFyYW0pIHtcbiAgICAgIHBvc2l0aW9uYWxQYXJhbXNbcC5zdWJzdHJpbmcoMSldID0gY3VycmVudC52YWx1ZS5zZWdtZW50O1xuICAgIH1cblxuICAgIGNvbnN1bWVkVXJsU2VnbWVudHMucHVzaChjdXJyZW50LnZhbHVlKTtcblxuICAgIGN1cnJlbnQgPSBMaXN0V3JhcHBlci5maXJzdChjdXJyZW50LmNoaWxkcmVuKTtcbiAgfVxuXG4gIGlmIChpc1ByZXNlbnQoY3VycmVudCkgJiYgaXNCbGFuayhjdXJyZW50LnZhbHVlLnNlZ21lbnQpKSB7XG4gICAgbGFzdFBhcmVudCA9IGxhc3RTZWdtZW50O1xuICAgIGxhc3RTZWdtZW50ID0gY3VycmVudDtcbiAgfVxuXG4gIGxldCBwID0gbGFzdFNlZ21lbnQudmFsdWUucGFyYW1ldGVycztcbiAgbGV0IHBhcmFtZXRlcnMgPVxuICAgICAgPHtba2V5OiBzdHJpbmddOiBzdHJpbmd9PlN0cmluZ01hcFdyYXBwZXIubWVyZ2UoaXNCbGFuayhwKSA/IHt9IDogcCwgcG9zaXRpb25hbFBhcmFtcyk7XG4gIGxldCBheHVVcmxTdWJ0cmVlcyA9IGlzUHJlc2VudChsYXN0UGFyZW50KSA/IGxhc3RQYXJlbnQuY2hpbGRyZW4uc2xpY2UoMSkgOiBbXTtcblxuICByZXR1cm4gbmV3IF9NYXRjaFJlc3VsdChyb3V0ZS5jb21wb25lbnQsIGNvbnN1bWVkVXJsU2VnbWVudHMsIHBhcmFtZXRlcnMsIGxhc3RTZWdtZW50LmNoaWxkcmVuLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBheHVVcmxTdWJ0cmVlcyk7XG59XG5cbmZ1bmN0aW9uIF9jaGVja091dGxldE5hbWVVbmlxdWVuZXNzKG5vZGVzOiBUcmVlTm9kZTxSb3V0ZVNlZ21lbnQ+W10pOiBUcmVlTm9kZTxSb3V0ZVNlZ21lbnQ+W10ge1xuICBsZXQgbmFtZXMgPSB7fTtcbiAgbm9kZXMuZm9yRWFjaChuID0+IHtcbiAgICBsZXQgc2VnbWVudFdpdGhTYW1lT3V0bGV0TmFtZSA9IG5hbWVzW24udmFsdWUub3V0bGV0XTtcbiAgICBpZiAoaXNQcmVzZW50KHNlZ21lbnRXaXRoU2FtZU91dGxldE5hbWUpKSB7XG4gICAgICBsZXQgcCA9IHNlZ21lbnRXaXRoU2FtZU91dGxldE5hbWUuc3RyaW5naWZpZWRVcmxTZWdtZW50cztcbiAgICAgIGxldCBjID0gbi52YWx1ZS5zdHJpbmdpZmllZFVybFNlZ21lbnRzO1xuICAgICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oYFR3byBzZWdtZW50cyBjYW5ub3QgaGF2ZSB0aGUgc2FtZSBvdXRsZXQgbmFtZTogJyR7cH0nIGFuZCAnJHtjfScuYCk7XG4gICAgfVxuICAgIG5hbWVzW24udmFsdWUub3V0bGV0XSA9IG4udmFsdWU7XG4gIH0pO1xuICByZXR1cm4gbm9kZXM7XG59XG5cbmNsYXNzIF9NYXRjaFJlc3VsdCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBjb21wb25lbnQ6IFR5cGUsIHB1YmxpYyBjb25zdW1lZFVybFNlZ21lbnRzOiBVcmxTZWdtZW50W10sXG4gICAgICAgICAgICAgIHB1YmxpYyBwYXJhbWV0ZXJzOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSxcbiAgICAgICAgICAgICAgcHVibGljIGxlZnRPdmVyVXJsOiBUcmVlTm9kZTxVcmxTZWdtZW50PltdLCBwdWJsaWMgYXV4OiBUcmVlTm9kZTxVcmxTZWdtZW50PltdKSB7fVxufVxuXG5mdW5jdGlvbiBfcmVhZE1ldGFkYXRhKGNvbXBvbmVudFR5cGU6IFR5cGUpIHtcbiAgbGV0IG1ldGFkYXRhID0gcmVmbGVjdG9yLmFubm90YXRpb25zKGNvbXBvbmVudFR5cGUpLmZpbHRlcihmID0+IGYgaW5zdGFuY2VvZiBSb3V0ZXNNZXRhZGF0YSk7XG4gIHJldHVybiBMaXN0V3JhcHBlci5maXJzdChtZXRhZGF0YSk7XG59Il19