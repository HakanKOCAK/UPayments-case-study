/// <reference types="cypress" />
import { API_URL } from '../../support/';

describe('Products Page', () => {
  beforeEach(() => {
    //Go to products page
    cy.visit('/products')
  });

  it('should display create product button', () => {
    cy.intercept(`${API_URL}/products`, [{
      avatar: "https://snipstock.com/image/png-images-pngs-iphone-x-iphone-smartphone-iphones-phone-24-png-45085?download=small",
      category: "Electronic",
      createdAt: 1650040436,
      description: "asdasdsa",
      developerEmail: "hknkocak97@icloud.com",
      id: "1",
      name: "Iphone X",
      price: 1232,

    }]);

    cy.intercept(`${API_URL}/categories`, [
      {
        createdAt: "2022-04-14T18:27:19.838Z",
        id: "1",
        name: "Electronic"
      },
      {
        createdAt: "2022-04-14T18:27:19.838Z",
        id: "2",
        name: "Furnitures"
      },
      {
        createdAt: "2022-04-14T18:27:19.838Z",
        id: "3",
        name: "Clothing"
      },
      {
        createdAt: "2022-04-14T18:27:19.838Z",
        id: "4",
        name: "Accessories"
      },
    ])
    cy.get('[data-cy="add-product-btn"]').should('exist')
  });

  it('should display products', () => {
    cy.intercept(`${API_URL}/products`, [
      {
        avatar: "https://snipstock.com/image/png-images-pngs-iphone-x-iphone-smartphone-iphones-phone-24-png-45085?download=small",
        category: "Electronic",
        createdAt: 1650040436,
        description: "asdasdsa",
        developerEmail: "hknkocak97@icloud.com",
        id: "1",
        name: "Iphone X",
        price: 1232,

      },
      {
        avatar: "https://snipstock.com/image/png-images-pngs-iphone-x-iphone-smartphone-iphones-phone-24-png-45085?download=small",
        category: "Electronic",
        createdAt: 1650040436,
        description: "asdasdsa",
        developerEmail: "hknkocak97@icloud.com",
        id: "2",
        name: "Iphone X 2",
        price: 1232,

      }
    ]);
    cy.intercept(`${API_URL}/categories`, [
      {
        createdAt: "2022-04-14T18:27:19.838Z",
        id: "1",
        name: "Electronic"
      },
      {
        createdAt: "2022-04-14T18:27:19.838Z",
        id: "2",
        name: "Furnitures"
      },
      {
        createdAt: "2022-04-14T18:27:19.838Z",
        id: "3",
        name: "Clothing"
      },
      {
        createdAt: "2022-04-14T18:27:19.838Z",
        id: "4",
        name: "Accessories"
      },
    ]);

    cy.contains('Iphone X').should('exist');
    cy.contains('Iphone X 2').should('exist');
  });

  it('should display open error modal if there is an error fetching products or categories', () => {
    cy.intercept(`${API_URL}/products`, { forceNetworkError: true });
    cy.intercept(`${API_URL}/categories`, { forceNetworkError: true });

    cy.contains('Error fetching products').should('exist');
    cy.contains('Error fetching categories').should('exist');
  });

  it('should enable filter inputs when there are products', () => {
    cy.intercept(`${API_URL}/products`, [
      {
        avatar: "https://snipstock.com/image/png-images-pngs-iphone-x-iphone-smartphone-iphones-phone-24-png-45085?download=small",
        category: "Electronic",
        createdAt: 1650040436,
        description: "asdasdsa",
        developerEmail: "hknkocak97@icloud.com",
        id: "1",
        name: "Iphone X",
        price: 1232,

      },
      {
        avatar: "https://snipstock.com/image/png-images-pngs-iphone-x-iphone-smartphone-iphones-phone-24-png-45085?download=small",
        category: "Electronic",
        createdAt: 1650040436,
        description: "asdasdsa",
        developerEmail: "hknkocak97@icloud.com",
        id: "2",
        name: "Iphone X 2",
        price: 1232,

      }
    ]);
    cy.intercept(`${API_URL}/categories`, [
      {
        createdAt: "2022-04-14T18:27:19.838Z",
        id: "1",
        name: "Electronic"
      },
      {
        createdAt: "2022-04-14T18:27:19.838Z",
        id: "2",
        name: "Furnitures"
      },
      {
        createdAt: "2022-04-14T18:27:19.838Z",
        id: "3",
        name: "Clothing"
      },
      {
        createdAt: "2022-04-14T18:27:19.838Z",
        id: "4",
        name: "Accessories"
      },
    ]);

    cy.get('[data-cy="name-filter-input"]').should('not.be.disabled');
    cy.get('[data-cy="category-filter-input"]').should('not.be.disabled');
  });

  it('should display no products message when there are no products', () => {
    cy.intercept(`${API_URL}/products`, []);
    cy.intercept(`${API_URL}/categories`, [
      {
        createdAt: "2022-04-14T18:27:19.838Z",
        id: "1",
        name: "Electronic"
      },
      {
        createdAt: "2022-04-14T18:27:19.838Z",
        id: "2",
        name: "Furnitures"
      },
      {
        createdAt: "2022-04-14T18:27:19.838Z",
        id: "3",
        name: "Clothing"
      },
      {
        createdAt: "2022-04-14T18:27:19.838Z",
        id: "4",
        name: "Accessories"
      },
    ]);

    cy.contains('Currently there are no products in the store.').should('exist');
  });

  it('should disable filter inputs when there are no products', () => {
    cy.intercept(`${API_URL}/products`, []);
    cy.intercept(`${API_URL}/categories`, [
      {
        createdAt: "2022-04-14T18:27:19.838Z",
        id: "1",
        name: "Electronic"
      },
      {
        createdAt: "2022-04-14T18:27:19.838Z",
        id: "2",
        name: "Furnitures"
      },
      {
        createdAt: "2022-04-14T18:27:19.838Z",
        id: "3",
        name: "Clothing"
      },
      {
        createdAt: "2022-04-14T18:27:19.838Z",
        id: "4",
        name: "Accessories"
      },
    ]);

    cy.get('[data-cy="name-filter-input"]').should('be.disabled');
    cy.get('[data-cy="category-filter-input"]').should('be.disabled');
  });

  context('Filters', () => {
    it('should filter by name', () => {
      cy.intercept(`${API_URL}/products`, [
        {
          avatar: "https://snipstock.com/image/png-images-pngs-iphone-x-iphone-smartphone-iphones-phone-24-png-45085?download=small",
          category: "Electronic",
          createdAt: 1650040436,
          description: "asdasdsa",
          developerEmail: "hknkocak97@icloud.com",
          id: "1",
          name: "Iphone",
          price: 1232,

        },
        {
          avatar: "https://st-intersport.mncdn.com/mnresize/1500/1500/Content/media/ProductImg/original/2310026621_o307-wmns-nike-city-rep-tr-637662918580998494.jpg",
          category: "Clothing",
          createdAt: 1650040436,
          description: "asdasdsa",
          developerEmail: "hknkocak97@icloud.com",
          id: "2",
          name: "Shoes",
          price: 200,

        }
      ]);
      cy.intercept(`${API_URL}/categories`, [
        {
          createdAt: "2022-04-14T18:27:19.838Z",
          id: "1",
          name: "Electronic"
        },
        {
          createdAt: "2022-04-14T18:27:19.838Z",
          id: "2",
          name: "Furnitures"
        },
        {
          createdAt: "2022-04-14T18:27:19.838Z",
          id: "3",
          name: "Clothing"
        },
        {
          createdAt: "2022-04-14T18:27:19.838Z",
          id: "4",
          name: "Accessories"
        },
      ]);

      cy.get('[data-cy="name-filter-input"]').type('ipho');
      cy.get('p').contains('Shoes').should('not.exist');
      cy.get('p').contains('Iphone').should('exist');
    });

    it('should filter by category', () => {
      cy.intercept(`${API_URL}/products`, [
        {
          avatar: "https://snipstock.com/image/png-images-pngs-iphone-x-iphone-smartphone-iphones-phone-24-png-45085?download=small",
          category: "Electronic",
          createdAt: 1650040436,
          description: "asdasdsa",
          developerEmail: "hknkocak97@icloud.com",
          id: "1",
          name: "Iphone",
          price: 1232,

        },
        {
          avatar: "https://st-intersport.mncdn.com/mnresize/1500/1500/Content/media/ProductImg/original/2310026621_o307-wmns-nike-city-rep-tr-637662918580998494.jpg",
          category: "Clothing",
          createdAt: 1650040436,
          description: "asdasdsa",
          developerEmail: "hknkocak97@icloud.com",
          id: "2",
          name: "Shoes",
          price: 200,

        }
      ]);
      cy.intercept(`${API_URL}/categories`, [
        {
          createdAt: "2022-04-14T18:27:19.838Z",
          id: "1",
          name: "Electronic"
        },
        {
          createdAt: "2022-04-14T18:27:19.838Z",
          id: "2",
          name: "Furnitures"
        },
        {
          createdAt: "2022-04-14T18:27:19.838Z",
          id: "3",
          name: "Clothing"
        },
        {
          createdAt: "2022-04-14T18:27:19.838Z",
          id: "4",
          name: "Accessories"
        },
      ]);

      cy.get('[data-cy="category-filter-input"]').select('Clothing');
      cy.get('p').contains('Shoes').should('exist');
      cy.get('p').contains('Iphone').should('not.exist');
    });

    it('should filter by both category and name', () => {
      cy.intercept(`${API_URL}/products`, [
        {
          avatar: "https://snipstock.com/image/png-images-pngs-iphone-x-iphone-smartphone-iphones-phone-24-png-45085?download=small",
          category: "Electronic",
          createdAt: 1650040436,
          description: "asdasdsa",
          developerEmail: "hknkocak97@icloud.com",
          id: "1",
          name: "Iphone",
          price: 1232,

        },
        {
          avatar: "https://st-intersport.mncdn.com/mnresize/1500/1500/Content/media/ProductImg/original/2310026621_o307-wmns-nike-city-rep-tr-637662918580998494.jpg",
          category: "Clothing",
          createdAt: 1650040436,
          description: "asdasdsa",
          developerEmail: "hknkocak97@icloud.com",
          id: "2",
          name: "Shoes",
          price: 200
        },
        {
          avatar: "https://snipstock.com/image/laptop-2746336-960-720-png-54021?download=medium",
          category: "Electronic",
          createdAt: 1650040436,
          description: "asdasdsa",
          developerEmail: "hknkocak97@icloud.com",
          id: "3",
          name: "Laptop",
          price: 1500,

        },
      ]);
      cy.intercept(`${API_URL}/categories`, [
        {
          createdAt: "2022-04-14T18:27:19.838Z",
          id: "1",
          name: "Electronic"
        },
        {
          createdAt: "2022-04-14T18:27:19.838Z",
          id: "2",
          name: "Furnitures"
        },
        {
          createdAt: "2022-04-14T18:27:19.838Z",
          id: "3",
          name: "Clothing"
        },
        {
          createdAt: "2022-04-14T18:27:19.838Z",
          id: "4",
          name: "Accessories"
        },
      ]);

      cy.get('[data-cy="category-filter-input"]').select('Electronic');
      cy.get('[data-cy="name-filter-input"]').type('Lapt')
      cy.get('p').contains('Laptop').should('exist');
      cy.get('p').contains('Iphone').should('not.exist');
      cy.get('p').contains('Shoes').should('not.exist');
    });

    it('should display no product with given filters message when there are no product with given filters', () => {
      cy.intercept(`${API_URL}/products`, [
        {
          avatar: "https://snipstock.com/image/png-images-pngs-iphone-x-iphone-smartphone-iphones-phone-24-png-45085?download=small",
          category: "Electronic",
          createdAt: 1650040436,
          description: "asdasdsa",
          developerEmail: "hknkocak97@icloud.com",
          id: "1",
          name: "Iphone",
          price: 1232,

        },
        {
          avatar: "https://st-intersport.mncdn.com/mnresize/1500/1500/Content/media/ProductImg/original/2310026621_o307-wmns-nike-city-rep-tr-637662918580998494.jpg",
          category: "Clothing",
          createdAt: 1650040436,
          description: "asdasdsa",
          developerEmail: "hknkocak97@icloud.com",
          id: "2",
          name: "Shoes",
          price: 1232,

        }
      ]);
      cy.intercept(`${API_URL}/categories`, [
        {
          createdAt: "2022-04-14T18:27:19.838Z",
          id: "1",
          name: "Electronic"
        },
        {
          createdAt: "2022-04-14T18:27:19.838Z",
          id: "2",
          name: "Furnitures"
        },
        {
          createdAt: "2022-04-14T18:27:19.838Z",
          id: "3",
          name: "Clothing"
        },
        {
          createdAt: "2022-04-14T18:27:19.838Z",
          id: "4",
          name: "Accessories"
        },
      ]);

      cy.get('[data-cy="name-filter-input"]').type('ipho')
      cy.get('[data-cy="category-filter-input"]').select('Clothing')
      cy.get('p').contains('Shoes').should('not.exist');
      cy.get('p').contains('Iphone').should('not.exist');
      cy.contains('There are no products with given filters.').should('be.visible');
    });
  });

  context('Navigation', () => {
    it('should redirect to product details page', () => {
      cy.intercept(`${API_URL}/products`, [
        {
          avatar: "https://snipstock.com/image/png-images-pngs-iphone-x-iphone-smartphone-iphones-phone-24-png-45085?download=small",
          category: "Electronic",
          createdAt: 1650040436,
          description: "asdasdsa",
          developerEmail: "hknkocak97@icloud.com",
          id: "1",
          name: "Iphone",
          price: 1232,

        },
        {
          avatar: "https://st-intersport.mncdn.com/mnresize/1500/1500/Content/media/ProductImg/original/2310026621_o307-wmns-nike-city-rep-tr-637662918580998494.jpg",
          category: "Clothing",
          createdAt: 1650040436,
          description: "asdasdsa",
          developerEmail: "hknkocak97@icloud.com",
          id: "2",
          name: "Shoes",
          price: 1232,

        }
      ]);
      cy.intercept(`${API_URL}/categories`, [
        {
          createdAt: "2022-04-14T18:27:19.838Z",
          id: "1",
          name: "Electronic"
        },
        {
          createdAt: "2022-04-14T18:27:19.838Z",
          id: "2",
          name: "Furnitures"
        },
        {
          createdAt: "2022-04-14T18:27:19.838Z",
          id: "3",
          name: "Clothing"
        },
        {
          createdAt: "2022-04-14T18:27:19.838Z",
          id: "4",
          name: "Accessories"
        },
      ]);

      cy.contains('Iphone').click();
      cy.url().should('include', '1');
    });

    it('should redirect to new product page when add button clicked', () => {
      cy.intercept(`${API_URL}/products`, [
        {
          avatar: "https://snipstock.com/image/png-images-pngs-iphone-x-iphone-smartphone-iphones-phone-24-png-45085?download=small",
          category: "Electronic",
          createdAt: 1650040436,
          description: "asdasdsa",
          developerEmail: "hknkocak97@icloud.com",
          id: "1",
          name: "Iphone",
          price: 1232,

        },
        {
          avatar: "https://st-intersport.mncdn.com/mnresize/1500/1500/Content/media/ProductImg/original/2310026621_o307-wmns-nike-city-rep-tr-637662918580998494.jpg",
          category: "Clothing",
          createdAt: 1650040436,
          description: "asdasdsa",
          developerEmail: "hknkocak97@icloud.com",
          id: "2",
          name: "Shoes",
          price: 1232,

        }
      ]);
      cy.intercept(`${API_URL}/categories`, [
        {
          createdAt: "2022-04-14T18:27:19.838Z",
          id: "1",
          name: "Electronic"
        },
        {
          createdAt: "2022-04-14T18:27:19.838Z",
          id: "2",
          name: "Furnitures"
        },
        {
          createdAt: "2022-04-14T18:27:19.838Z",
          id: "3",
          name: "Clothing"
        },
        {
          createdAt: "2022-04-14T18:27:19.838Z",
          id: "4",
          name: "Accessories"
        },
      ]);

      cy.get('[data-cy="add-product-btn"]').click();
      cy.url().should('include', 'new');
    });
  });
})