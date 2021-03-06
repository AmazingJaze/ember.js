import run from 'ember-metal/run_loop';
import View from 'ember-views/views/view';
import {
  getViewClientRects,
  getViewBoundingClientRect
} from 'ember-views/system/utils';

var hasGetClientRects, hasGetBoundingClientRect;
var ClientRectListCtor, ClientRectCtor;

(function() {
  if (document.createRange) {
    var range = document.createRange();

    if (range.getClientRects) {
      var clientRectsList = range.getClientRects();
      hasGetClientRects = true;
      ClientRectListCtor = clientRectsList && clientRectsList.constructor;
    }

    if (range.getBoundingClientRect) {
      var clientRect = range.getBoundingClientRect();
      hasGetBoundingClientRect = true;
      ClientRectCtor = clientRect && clientRect.constructor;
    }
  }
})();

var view;

QUnit.module('ViewUtils', {
  teardown() {
    run(function() {
      if (view) { view.destroy(); }
    });
  }
});


QUnit.test('getViewClientRects', function() {
  if (!hasGetClientRects || !ClientRectListCtor) {
    ok(true, 'The test environment does not support the DOM API required to run this test.');
    return;
  }

  view = View.create();

  run(function() { view.appendTo('#qunit-fixture'); });

  ok(getViewClientRects(view) instanceof ClientRectListCtor);
});

QUnit.test('getViewBoundingClientRect', function() {
  if (!hasGetBoundingClientRect || !ClientRectCtor) {
    ok(true, 'The test environment does not support the DOM API required to run this test.');
    return;
  }

  view = View.create();

  run(function() { view.appendTo('#qunit-fixture'); });

  ok(getViewBoundingClientRect(view) instanceof ClientRectCtor);
});
