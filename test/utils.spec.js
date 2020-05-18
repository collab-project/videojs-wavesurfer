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
        expect(time).toEqual('00:10:000');

        time = formatTime(11);
        expect(time).toEqual('00:11:000');

        time = formatTime(121);
        expect(time).toEqual('02:01:000');

        time = formatTime(3661);
        expect(time).toEqual('01:01:01');

        // 300 days, 1 hour and 1 second
        time = formatTime(25923601);
        expect(time).toEqual('300:01:00:01');
    });

    /** @test {formatTime} */
    it('returns a formatted string using a guide', () => {
        let time = formatTime(4.121, 10);
        expect(time).toEqual('00:04:121');

        // using one hour as guide
        time = formatTime(4.121, 3600);
        expect(time).toEqual('00:00:04');

        // using one day as guide
        time = formatTime(4.121, 86400);
        expect(time).toEqual('00:00:00:04');
    });

    /** @test {formatTime} */
    it('returns a formatted string using displayMilliseconds option', () => {
        let time = formatTime(123.652, 10, false);
        expect(time).toEqual('02:03');

        time = formatTime(7.652, 4.652, false);
        expect(time).toEqual('00:07');

        // using one day as guide (will ignore option)
        time = formatTime(12.034, 86400, true);
        expect(time).toEqual('00:00:00:12');
    });

    /** @test {formatTime} */
    it('returns a string when no arguments are received', () => {
        let time = formatTime();

        expect(time).toEqual('00:00:000');
    });

    /** @test {formatTime} */
    it('defaults to 0 when a negative value is received', () => {
        let time = formatTime(-2);

        expect(time).toEqual('00:00:000');
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