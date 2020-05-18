/**
 * @since 2.3.0
 */

import pluginDefaultOptions from '../src/js/defaults.js';

/** @test {defaults} */
describe('pluginDefaultOptions', () => {

    /** @test {pluginDefaultOptions} */
    it('returns a non-empty object', () => {
        expect(pluginDefaultOptions).toBeNonEmptyObject();
    });

    /** @test {pluginDefaultOptions} */
    it('contains correct default values', () => {
        expect(pluginDefaultOptions).toEqual({
            debug: false,
            displayMilliseconds: true
        });
    });
});
