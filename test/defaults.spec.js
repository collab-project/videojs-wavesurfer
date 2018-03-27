/**
 * @since 2.3.0
 */

import pluginDefaultOptions from '../src/js/defaults.js';

/** @test {defaults} */
describe('pluginDefaultOptions', function() {

    /** @test {pluginDefaultOptions} */
    it('returns a non-empty object', function() {
        expect(pluginDefaultOptions).toBeNonEmptyObject();
    });
});
