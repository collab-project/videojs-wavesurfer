/**
 * @since 2.3.0
 */

import pluginDefaultOptions from '../src/js/defaults.js';

/** @test {defaults} */
describe('defaults:', function() {

    /** @test {pluginDefaultOptions} */
    it('pluginDefaultOptions returns a non-empty object', function() {
        expect(pluginDefaultOptions).toBeNonEmptyObject();
    });
});
