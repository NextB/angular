import { verifyNoBrowserErrors, browser } from 'angular2/src/testing/e2e_util';
import { expect } from 'angular2/testing';
function waitForElement(selector) {
    var EC = protractor.ExpectedConditions;
    // Waits for the element with id 'abc' to be present on the dom.
    browser.wait(EC.presenceOf($(selector)), 20000);
}
describe('on activate example app', function () {
    afterEach(verifyNoBrowserErrors);
    var URL = 'angular2/examples/router/ts/on_deactivate/';
    it('should update the text when navigating between routes', function () {
        browser.get(URL);
        waitForElement('my-cmp');
        expect(element(by.css('#log')).getText()).toEqual('Log:');
        element(by.css('#param-link')).click();
        waitForElement('my-cmp');
        expect(element(by.css('#log')).getText()).toEqual('Log:\nNavigating from "" to "1"');
        browser.navigate().back();
        waitForElement('my-cmp');
        expect(element(by.css('#log')).getText())
            .toEqual('Log:\nNavigating from "" to "1"\nNavigating from "1" to ""');
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib25fZGVhY3RpdmF0ZV9zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGlmZmluZ19wbHVnaW5fd3JhcHBlci1vdXRwdXRfcGF0aC1ISkVTMUZwMi50bXAvYW5ndWxhcjIvZXhhbXBsZXMvcm91dGVyL3RzL29uX2RlYWN0aXZhdGUvb25fZGVhY3RpdmF0ZV9zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJPQUFPLEVBQUMscUJBQXFCLEVBQUUsT0FBTyxFQUFDLE1BQU0sK0JBQStCO09BQ3JFLEVBQUMsTUFBTSxFQUFDLE1BQU0sa0JBQWtCO0FBRXZDLHdCQUF3QixRQUFnQjtJQUN0QyxJQUFJLEVBQUUsR0FBUyxVQUFXLENBQUMsa0JBQWtCLENBQUM7SUFDOUMsZ0VBQWdFO0lBQ2hFLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUNsRCxDQUFDO0FBRUQsUUFBUSxDQUFDLHlCQUF5QixFQUFFO0lBQ2xDLFNBQVMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0lBRWpDLElBQUksR0FBRyxHQUFHLDRDQUE0QyxDQUFDO0lBRXZELEVBQUUsQ0FBQyx1REFBdUQsRUFBRTtRQUMxRCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUV6QixNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUUxRCxPQUFPLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3ZDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUV6QixNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO1FBRXJGLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUMxQixjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFekIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDcEMsT0FBTyxDQUFDLDREQUE0RCxDQUFDLENBQUM7SUFDN0UsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7dmVyaWZ5Tm9Ccm93c2VyRXJyb3JzLCBicm93c2VyfSBmcm9tICdhbmd1bGFyMi9zcmMvdGVzdGluZy9lMmVfdXRpbCc7XG5pbXBvcnQge2V4cGVjdH0gZnJvbSAnYW5ndWxhcjIvdGVzdGluZyc7XG5cbmZ1bmN0aW9uIHdhaXRGb3JFbGVtZW50KHNlbGVjdG9yOiBzdHJpbmcpIHtcbiAgdmFyIEVDID0gKDxhbnk+cHJvdHJhY3RvcikuRXhwZWN0ZWRDb25kaXRpb25zO1xuICAvLyBXYWl0cyBmb3IgdGhlIGVsZW1lbnQgd2l0aCBpZCAnYWJjJyB0byBiZSBwcmVzZW50IG9uIHRoZSBkb20uXG4gIGJyb3dzZXIud2FpdChFQy5wcmVzZW5jZU9mKCQoc2VsZWN0b3IpKSwgMjAwMDApO1xufVxuXG5kZXNjcmliZSgnb24gYWN0aXZhdGUgZXhhbXBsZSBhcHAnLCBmdW5jdGlvbigpIHtcbiAgYWZ0ZXJFYWNoKHZlcmlmeU5vQnJvd3NlckVycm9ycyk7XG5cbiAgdmFyIFVSTCA9ICdhbmd1bGFyMi9leGFtcGxlcy9yb3V0ZXIvdHMvb25fZGVhY3RpdmF0ZS8nO1xuXG4gIGl0KCdzaG91bGQgdXBkYXRlIHRoZSB0ZXh0IHdoZW4gbmF2aWdhdGluZyBiZXR3ZWVuIHJvdXRlcycsIGZ1bmN0aW9uKCkge1xuICAgIGJyb3dzZXIuZ2V0KFVSTCk7XG4gICAgd2FpdEZvckVsZW1lbnQoJ215LWNtcCcpO1xuXG4gICAgZXhwZWN0KGVsZW1lbnQoYnkuY3NzKCcjbG9nJykpLmdldFRleHQoKSkudG9FcXVhbCgnTG9nOicpO1xuXG4gICAgZWxlbWVudChieS5jc3MoJyNwYXJhbS1saW5rJykpLmNsaWNrKCk7XG4gICAgd2FpdEZvckVsZW1lbnQoJ215LWNtcCcpO1xuXG4gICAgZXhwZWN0KGVsZW1lbnQoYnkuY3NzKCcjbG9nJykpLmdldFRleHQoKSkudG9FcXVhbCgnTG9nOlxcbk5hdmlnYXRpbmcgZnJvbSBcIlwiIHRvIFwiMVwiJyk7XG5cbiAgICBicm93c2VyLm5hdmlnYXRlKCkuYmFjaygpO1xuICAgIHdhaXRGb3JFbGVtZW50KCdteS1jbXAnKTtcblxuICAgIGV4cGVjdChlbGVtZW50KGJ5LmNzcygnI2xvZycpKS5nZXRUZXh0KCkpXG4gICAgICAgIC50b0VxdWFsKCdMb2c6XFxuTmF2aWdhdGluZyBmcm9tIFwiXCIgdG8gXCIxXCJcXG5OYXZpZ2F0aW5nIGZyb20gXCIxXCIgdG8gXCJcIicpO1xuICB9KTtcbn0pO1xuIl19