import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';

describe('BadgesController (e2e)', () => {
  let app: INestApplication;
  let jwtToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Obter um token JWT válido
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'admin', password: 'admin' });
      
    jwtToken = loginResponse.body.access_token;
  });

  it('/badges/all (GET)', () => {
    return request(app.getHttpServer())
      .get('/badges/all')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200)
      .expect('Content-Type', /json/);
  });

  it('/badges/paginated (GET)', () => {
    return request(app.getHttpServer())
      .get('/badges/paginated?page=1&limit=10')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200)
      .expect('Content-Type', /json/);
  });

  it('/badges/filter (GET)', () => {
    return request(app.getHttpServer())
      .get('/badges/filter?name=Coruja')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200)
      .expect('Content-Type', /json/);
  });

  it('/badges/filter-paginated (GET)', () => {
    return request(app.getHttpServer())
      .get('/badges/filter-paginated?page=1&limit=10&name=Coruja')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200)
      .expect('Content-Type', /json/);
  });

  it('/badges/redeem (POST)', () => {
    return request(app.getHttpServer())
      .post('/badges/redeem')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ slug: 'cda' }) // Substitua pelo slug que você deseja resgatar
      .expect(201)
      .expect('Content-Type', /json/);
  });

  it('/badges/redeemed (GET)', () => {
    return request(app.getHttpServer())
      .get('/badges/redeemed')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200)
      .expect('Content-Type', /json/);
  });

  afterAll(async () => {
    await app.close();
  });
});
