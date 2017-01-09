const http = require('http');
const expect = require('chai').expect;
const fetch = require('node-fetch');

describe('fetch', () => {

    it('cookies with with http', () => {
        return new Promise((resolve) => {
            http.get('http://localhost:3000/', (res) => {
                resolve(res.headers);
            });
        }).then((headers) => {
            expect(headers['set-cookie']).to.be.instanceof(Array);
        });
    });

    it('cookies work', () => {
        return fetch('http://localhost:3000/')
            .then((response) => {
                expect(response.headers.get('set-cookie')).to.equal('test=foo; Path=/');
            });
    });

});

