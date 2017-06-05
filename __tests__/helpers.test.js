import { stripHtml } from '../src/helpers';

describe('helper functions', () => {

    it('can strip html', () => {

        const html = "<div class='jumbotron'><b>Hello</b>";

        expect(stripHtml(html)).toEqual('Hello');
    });

});
