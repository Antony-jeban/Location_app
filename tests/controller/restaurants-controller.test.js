const chai = require('chai');
const expect = chai.expect;
// const chaiAsPromised = require('chai-as-promised')
// chai.use(chaiAsPromised);
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const rewire = require('rewire');
const request = require('supertest');
const axios = require('axios');

var { GetRandomPostCodes, GetLocationsInfo } = rewire('../../controller');
var sandbox = sinon.createSandbox();
var services = require('../../services');

describe('Restaurants - Controller', () => {
    afterEach(() => {
        sandbox.restore();
        axios.get.restore();
    })

    context('GET /random-postcodes', () => {
        let responseStub, sendStub, getDataStub
        it('should get /random-postcodes', async (done) => {
            try {
                const res = {
                    result: {
                        'code': 'SE1P 4RR'
                    }, status: 200
                };
                sinon.stub(axios, "get").resolves(res);
                    
                sendStub = sandbox.stub().returns({
                    result: {
                        code: 'SE1P 4RR'
                    }
                })
                responseStub = sandbox.stub().returns({ status: () => sendStub });

                const response = await GetRandomPostCodes(null, responseStub);

                expect(getDataStub).to.have.been.calledOnce;
                expect(response.body).to.have.property('code').to.equal('SE1P 4RR');
                done();
            } catch (error) {
                done(error)
            }

        })
    })

    // context('GET /location', () => {
    //     let responseStub, sendStub, getDataStub
    //     it('should get restaurants based on the /location', async (done) => {
    //         try {
    //             getDataStub = sandbox.stub(services, 'getRequestedData').returns(
    //                 {
    //                     result: {
    //                         'code': 'SE1P 4RR'
    //                     }, status: 200
    //                 }
    //             );
    //             sendStub = sandbox.stub().returns({
    //                 result: {
    //                     code: 'SE1P 4RR'
    //                 }
    //             })
    //             responseStub = sandbox.stub().returns({ status: () => sendStub });

    //             const response = await GetLocationsInfo({ params: { location: 'SE1P 4RR' }}, responseStub);

    //             expect(getDataStub).to.have.been.calledOnce;
    //             expect(response.body).to.have.property('code').to.equal('SE1P 4RR');
    //             done();
    //         } catch (error) {
    //             console.log({ error });
    //             done(error)
    //         }
    //     })
    // })

})

