PageMixin = require '../../../lib/browser/page'
assert = require 'assertive'
{extend} = require 'lodash'

describe 'page api', ->
  describe '#setPageSize', ->
    driver =
      setPageSize: ->
    page = extend {driver}, PageMixin

    it 'fails if size is undefined', ->
      assert.throws ->
        page.setPageSize(undefined)

    it 'fails if size is not an Object', ->
      assert.throws ->
        page.setPageSize(100, 200)

    it 'fails if height does not exist', ->
      assert.throws ->
        page.setPageSize({width: 100})

    it 'fails if width does not exist', ->
      assert.throws ->
        page.setPageSize({height: 100})

    it 'succeeds if all conditions are met', ->
      page.setPageSize
        height: 100
        width: 200
