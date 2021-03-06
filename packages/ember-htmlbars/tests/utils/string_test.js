import SafeString from 'htmlbars-util/safe-string';
import { htmlSafe } from 'ember-htmlbars/utils/string';

import { test, testModule } from 'ember-glimmer/tests/utils/skip-if-glimmer';

testModule('ember-htmlbars: SafeString');

test('htmlSafe should return an instance of SafeString', function() {
  var safeString = htmlSafe('you need to be more <b>bold</b>');

  ok(safeString instanceof SafeString, 'should be a SafeString');
});

test('htmlSafe should return an empty string for null', function() {
  var safeString = htmlSafe(null);

  equal(safeString instanceof SafeString, true, 'should be a SafeString');
  equal(safeString.toString(), '', 'should return an empty string');
});

test('htmlSafe should return an empty string for undefined', function() {
  var safeString = htmlSafe();

  equal(safeString instanceof SafeString, true, 'should be a SafeString');
  equal(safeString.toString(), '', 'should return an empty string');
});
