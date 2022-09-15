const chai = require('chai');
const expect = chai.expect;
// const chaiAsPromised = require('chai-as-promised')
// chai.use(chaiAsPromised);
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const rewire = require('rewire');
const request = require('supertest');

var restaurants = rewire('../../routes/restaurants');
var services = require('../../services');
var sandbox = sinon.createSandbox();

describe('Restaurants', () => {
    afterEach(() => {
        restaurants = rewire('../../routes/restaurants');
        sandbox.restore();
    })

    context('GET /random-postcodes', () => {
        let getDataStub
        debugger;
        it('should get /random-postcodes', async (done) => {
            try {
                getDataStub = sandbox.stub().callsFake(() => Promise.resolve({
                    result: {
                        'code': 'SE1P 4RR'
                    }, status: 200
                }));
                restaurants.__set__('getData', getDataStub);
                const response = await request(restaurants).get('/random-postcodes');
                expect(getDataStub).to.have.been.calledOnce;
                expect(response.body).to.have.property('code').to.equal('SE1P 4RR');
                done();
            } catch (error) {
                console.log({ error });
                done(error)
            }

        })
    })

    context('GET /location', () => {
        let getDataStub
        it('should get restaurants based on the /location', (done) => {
            getDataStub = sandbox.stub(services, 'getRequestedData').resolves(
                {
                    result: {
                        'code': 'SE1P 4RR'
                    }, status: 200
                }
            );
            request(restaurants).get('/SE1P 4RR')
                .expect(200)
                .end((err, response) => {
                    expect(getDataStub).to.have.been.calledOnce;
                    expect(response.body).to.have.property('code').to.equal('SE1P 4RR');
                    done(err);
                })
        })
    })

})

