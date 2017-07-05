import { FulltestNodePage } from './app.po';

describe('fulltest-node App', () => {
  let page: FulltestNodePage;

  beforeEach(() => {
    page = new FulltestNodePage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
