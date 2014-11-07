'use strict';

describe('Service: apiurl', function () {

  // load the service's module
  beforeEach(module('bcApp'));

  // instantiate service
  var apiurl;
  beforeEach(inject(function (_apiurl_) {
    apiurl = _apiurl_;
  }));

  it('should do something', function () {
    expect(!!apiurl).toBe(true);
  });

});
