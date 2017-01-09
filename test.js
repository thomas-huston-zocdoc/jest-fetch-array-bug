const http = require('http');
const expect = require('chai').expect;
const fetch = require('node-fetch');

describe('fetch', () => {

    const request = () => new Promise((resolve) => {
        http.get('http://localhost:3000/', (res) => {
            resolve(res.headers);
        });
    })

    it('`set-cookie` header is `instanceof Array`', () => {
        return request().then((headers) => {
            expect(headers['set-cookie']).to.be.instanceof(Array);
        });
    });

    it('`set-cookie` header is `Array.isArray`', () => {
        return request().then((headers) => {
            expect(Array.isArray(headers['set-cookie'])).to.be.true;
        });
    });

    it('`set-cookie` header is returned by `node-fetch`', () => {
        return fetch('http://localhost:3000/')
            .then((response) => {
                expect(response.headers.get('set-cookie')).to.equal('test=foo; Path=/');
            });
    });

});

