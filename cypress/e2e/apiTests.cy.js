import {faker} from '@faker-js/faker';

describe('API Tests', () => {

  it(' Get all posts. Verify HTTP response status code and content type', () => {
    cy.request('GET', '/posts')
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.headers['content-type']).to.include('application/json');
      });
  });

   it('Get only first 10 posts. Verify HTTP response status code. Verify that only first posts are returned', () => {
    cy.request('GET', '/posts?_limit=10')
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.lengthOf(10);
      });
  });

  it('Get posts with id = 55 and id = 60. Verify HTTP response status code. Verify id values of returned records', () => {
    cy.request('GET', '/posts?id=55&id=60')
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.lengthOf(2);
        
        const postIds = response.body.map(post => post.id);
        expect(postIds).to.include(55);
        expect(postIds).to.include(60);
      });
  });

  it('Create a post. Verify HTTP response 401 status code.', () => {
    cy.request({
      method: 'POST',
      url: '/664/posts',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });
});
