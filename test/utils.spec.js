/**
 * @since 2.3.0
 */

import formatTime from '../src/js/utils/format-time.js';
import log from '../src/js/utils/log.js';

/** @test {format-time} */
describe('formatTime', () => {

    /** @test {formatTime} */
    it('returns a formatted string for seconds', () => {
        let time = formatTime(10);
        expect(time).toEqual('0:10');

        time = formatTime(11);
        expect(time).toEqual('0:11');

        time = formatTime(121);
        expect(time).toEqual('2:01');

        time = formatTime(3661);
        expect(time).toEqual('1:01:01');
    });

    /** @test {formatTime} */
    it('returns a formatted string when using msDisplayMax', () => {
        let time = formatTime(2.011, 3, 10);
        expect(time).toEqual('0:02:011');

        time = formatTime(4.121, 3, 10);
        expect(time).toEqual('0:04:121');

        time = formatTime(6.001, 2, 20);
        expect(time).toEqual('0:06:001');
    });

    /** @test {formatTime} */
    it('returns a string when no arguments are received', () => {
        let time = formatTime();

        expect(time).toEqual('-:-');
    });

    /** @test {formatTime} */
    it('defaults to 0 when a negative value is received', () => {
        let time = formatTime(-2);

        expect(time).toEqual('0:00');
    });
});

/** @test {log} */
describe('log', () => {

    /** @test {log} */
    it('does not work when debug is false', () => {
        let test = log('foo', 'error', false);
        expect(test).toBeUndefined();
    });

    /** @test {log} */
    it('only works when debug is true', () => {
        let test = log('foo', 'error', true);
        expect(test).toBeUndefined();

        test = log('foo', 'warn', true);
        expect(test).toBeUndefined();

        test = log('foo', 'bar', true);
        expect(test).toBeUndefined();
    });
});