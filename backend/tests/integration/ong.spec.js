const req = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection')

describe('ONG', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll( async () => {
    await connection.destroy();
  });

  it('should be able to create a new ONG', async () => {
    const resp = await req(app)
    .post('/ong')
    .send({
      name:'Teste', 
      email:'email@teste.com.br', 
      whatsapp:'12312312312', 
      city:'Cidade', 
      uf:'PR'
    });
    
    expect(resp.body).toHaveProperty('id');
    expect(resp.body.id).toHaveLength(8);
    
  });
})