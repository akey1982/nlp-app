import {
    urlChecker
} from './urlChecker';

test('Is a valid url', () => {
    expect(urlChecker('https://www.apple.com')).toBeTruthy()
})