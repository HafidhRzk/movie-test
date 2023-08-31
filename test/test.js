const request = require('supertest');
const casual = require("casual")
const app = require('../app');
const db = require('../models');
const uploadImg = require('../src/utils/uploadImg')

describe('App', function () {
  it('has the default page', function (done) {
    request(app)
      .get('/')
      .expect("Hello There!", done);
  });
});

describe('MOVIE TEST', () => {
  let moviedata = {}
  beforeEach(async () => {
    // await db.sequelize.sync({ force: true });
    moviedata = {
      title: casual.title,
      description: casual.description,
      rating: casual.double(from = 0, to = 100),
      image: "data:image/png;base64,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QSBUAlQY8nsOAWnDigDKH0C0hEDMBDhAdvYuAvI3H1LYmLcB1gaB7giwP7Tnl7yAcMLo7saiNwRSI0CF4h+PJykgBEBqtzzrhYAdAqkfQJMREFJQOzcQo0IAAiKp7i/RC0jqJwRubghAoF4CKVU4ohSQlBxY763BbBCAQBECsR9goxGQVFPIIsFMWwhAwA2BWPen4AUkdoV3E+7MCgEI2CIQU4UkSAGJyQG2gpRxIQAB/wmEfgAORkBiTQH9D3EshAAEbBMIdX/zXkBCV2jbgcf4EIBAXARCqrB4KSAhAYwrdFkNBCDgEwHfD9DeCEioKZxPwYYtEIBAnAR83R+dC4jvChtnOLIqCEAgVAI+VWicCIhPAEINIuyGAAQg4PoAXpuA+JqCEYIQgAAEXBG44IILZM8995QzzjijZcL4+LicffbZ8t1338kmm2wiDzzwgGy66aat6zfffLO8/vrrssEGG8hNN91k+ufZX//44w+ZP3++zJ49W5YuXfqvJe+0006y+eaby3rrrWd+fskll8i8efPMnz/99FM5//zzZdasWbLLLrvIbbfdJj09PeaadQFxrZCuAoN5IQABCHQi8Pnnn8vxxx8vH3zwgdmcm59FixbJrrvuKhdddJHceeedsmzZMnnllVfM5SeffFKeffZZee6550y/I444Qj777DPZeOONW/3bVXh0oz/mmGOkt7dXdtttt/8IyPDwsBGD6Z+//vrL2PL444/LXnvtZezdb7/95Oqrr7YnIJSouHEgAAEIdCawcOFCOe644+SEE05oNfzxxx9lhx12kNHRUenr65MDDzzQCMRrr71mTv/77ruv3HrrrXLwwQfLZZddJs8//7xcfvnlcu6558o333xjfv7+++/LRhttJIcddphcfPHFMmfOHPniiy9ED/P9/f3y8MMP/0tANDPZcccdTZvpn5dfftnM98Ybb5jxdUwd56uvvjLZSmUZSJ4UioCCAAQgAAGRVatWyemnny6vvvqqEYdmueitt96SCy+80IiAisPy5ctl7dq1ctJJJ8lpp50mG264oSlt6SFdhUczgjVr1shDDz1ksGpJSwVhjz32kCeeeKIlFM39WTOZp556Sh599FEZGBgw5axvv/1W9t57b9luu+3k+++/l/3331/uvfdeI2A6nv7sjjvukMWLFxuBUjs++eQT2WabbboXEEpU3A4QgAAEihHQjV+fK2i2ccopp8g777xjBnjmmWfk/vvvN6KipaIXXnhBbrjhBrO563OSLbfcUv7880/RZydavvr111+NGGimoB99fqKlJv3oz7bddtt/GaaCdNddd8ndd9/dyki0gc6jwqWCotmMlrSuu+46M88WW2xhxO7EE0+UlStXmoxG59RsqFQGQomqWLDQGgIQgECTwMTEhDndb7/99vL777+bDGDnnXeWDz/80JSKzjnnHCMa7777rtx+++1y6qmnyqGHHipa8tIMRLMUfcitm/mDDz4ob775pjz22GMtwJdeeqmsXr269dxkKnkVkPvuu6+VmbRLAD766CO54oorjC1qh5au9HP00UfLscceK1tttZWZU+3PLSCUqLgBIAABCFRLQN9w0pLQ22+/bQZet26dyRpUUPThuWYc+uxDy076ttXuu+9uMpBbbrnFPBRXsdG2KijN/gcddJB5qK5vb2lpqpOANK9N3d9VmJ5++ml56aWX5MUXX5SrrrpKNttsMyNYKhhaHtP/rr/++tkCQomq2oBhNAhAAAJNAtMFRH++YMEC81rukiVLzFdLWpo56EefdWhp6csvvzQP1w8//HDzNlbzNV99g+uAAw4wD8WvvfbaVr/mfNMzEP25lsGuv/56M64Kz8knn2yE6qijjjKZ0pFHHilXXnmlKW2dd9555nXfG2+80QzZNgOhREWAQwACELBPQF/lPeuss8zD9Obnl19+kTPPPFM+/vhj2XrrreWRRx6RwcHB1nXdvPWZhT6vuOeee2SfffYx17T0pL8/smLFCvN7Glr60ucrWnrSMpk+iP/pp5/MG15z584111Rw9KNvZumDcp1bH+jrm1f6arEmEO+9955cc8015sH9IYccYh6wN187bgmIGtjMNnRAfULffEpvHyMzQAACEICArwRmeoQxNjYmPSMjI5PaQNMV/aqyNT+qZJOTkzP+/0ztquo/Heh0e2YC3mxX1v6Z5ik7XlE7fQ0k7IIABNImoFqhb3vpV7Xif5NrXW9+jjU9AAAAAElFTkSuQmCC",
    }
  });

  describe('POST /Movies', function () {
    it('creating movie', function (done) {
      request(app)
        .post('/Movies')
        .send(moviedata)
        .expect(200)
        .end(function (err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });
  });

  describe('GET /Movies', function () {
    it('get all movie', async () => {
      request(app)
        .get('/Movies')
        .expect(200)
        .then()
    });
  });

  describe('GET /Movies/:id', function () {
    it('get movie details', async () => {
      moviedata.image = await uploadImg(moviedata.image);
      const data = await db.movie.create(moviedata);
      request(app)
        .get(`/Movies/${data.id}`)
        .expect(200)
        .then()
    });
  });

  describe('PATCH /Movies/:id', function () {
    it('updating movie', async () => {
      moviedata.image = await uploadImg(moviedata.image);
      const data = await db.movie.create(moviedata);
      request(app)
        .patch(`/Movies/${data.id}`)
        .send(moviedata)
        .expect(200)
    });
  });

  describe('DELETE /Movies/:id', function () {
    it('deleting user', async () => {
      moviedata.image = await uploadImg(moviedata.image);
      const data = await db.movie.create(moviedata);
      request(app)
        .del(`/Movies/${data.id}`)
        .expect(200)
        .then()
    });
  });
})

