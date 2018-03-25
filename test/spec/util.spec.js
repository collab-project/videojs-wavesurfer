import pluginDefaultOptions from '../../es5/defaults.js';

/** @test {defaults} */
describe('defaults:', function() {

    /** @test {pluginDefaultOptions} */
    it('pluginDefaultOptions returns a non-empty object', function() {
        expect(pluginDefaultOptions).toBeNonEmptyObject();
    });
});
