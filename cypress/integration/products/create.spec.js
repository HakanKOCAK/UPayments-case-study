/// <reference types="cypress" />

import { API_URL } from "../../support";

describe('Create Product Page', () => {
  beforeEach(() => {
    cy.intercept(`${API_URL}/products`, [
      {
        avatar: "https://snipstock.com/image/png-images-pngs-iphone-x-iphone-smartphone-iphones-phone-24-png-45085?download=small",
        category: "Electronic",
        createdAt: 1650040436,
        description: "What an awesome phone",
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
    cy.visit('/products/new');
  });

  it('should not submit form if there are invalid inputs', () => {
    cy.contains('Submit').click();
    cy.get('[data-cy="name-input"]').should('have.css', 'border-color', 'rgb(239, 68, 68)');
    cy.get('[data-cy="description-input"]').should('have.css', 'border-color', 'rgb(239, 68, 68)');
    cy.get('[data-cy="avatar-input"]').should('have.css', 'border-color', 'rgb(239, 68, 68)');
    cy.get('[data-cy="category-input"]').should('have.css', 'border-color', 'rgb(239, 68, 68)');
    cy.get('[data-cy="price-input"]').should('have.css', 'border-color', 'rgb(239, 68, 68)');
  });

  it('should not submit form if name is empty', () => {
    cy.get('[data-cy="description-input"]').type('description');
    cy.get('[data-cy="avatar-input"]').type('avatar');
    cy.get('[data-cy="category-input"]').select('Electronic');
    cy.get('[data-cy="price-input"]').type('123.50');
    cy.contains('Submit').click();
    cy.get('[data-cy="name-input"]').should('have.css', 'border-color', 'rgb(239, 68, 68)');
  });

  it('should not submit form if description is empty', () => {
    cy.get('[data-cy="name-input"]').type('name');
    cy.get('[data-cy="avatar-input"]').type('avatar');
    cy.get('[data-cy="category-input"]').select('Electronic');
    cy.get('[data-cy="price-input"]').type('123.50');
    cy.contains('Submit').click();
    cy.get('[data-cy="description-input"]').should('have.css', 'border-color', 'rgb(239, 68, 68)');
  });

  it('should not submit form if category is empty', () => {
    cy.get('[data-cy="description-input"]').type('description');
    cy.get('[data-cy="name-input"]').type('name');
    cy.get('[data-cy="avatar-input"]').type('avatar');
    cy.get('[data-cy="price-input"]').type('123.50');
    cy.contains('Submit').click();
    cy.get('[data-cy="category-input"]').should('have.css', 'border-color', 'rgb(239, 68, 68)');
  });

  it('should not submit form if avatar is empty', () => {
    cy.get('[data-cy="description-input"]').type('description');
    cy.get('[data-cy="name-input"]').type('name');
    cy.get('[data-cy="category-input"]').select('Electronic');
    cy.get('[data-cy="price-input"]').type('123.50');
    cy.contains('Submit').click();
    cy.get('[data-cy="avatar-input"]').should('have.css', 'border-color', 'rgb(239, 68, 68)');
  });

  it('should not submit form if price is empty', () => {
    cy.get('[data-cy="description-input"]').type('description');
    cy.get('[data-cy="name-input"]').type('name');
    cy.get('[data-cy="category-input"]').select('Electronic');
    cy.get('[data-cy="avatar-input"]').type('avatar');
    cy.contains('Submit').click();
    cy.get('[data-cy="price-input"]').should('have.css', 'border-color', 'rgb(239, 68, 68)');
  });

  it('should create new product and return /products', () => {
    cy.intercept(
      {
        method: 'POST',
        url: `${API_URL}/products`
      },
      {
        avatar: "https://snipstock.com/image/laptop-2746336-960-720-png-54021?download=medium",
        category: "Electronic",
        createdAt: 1650040436,
        description: "Test case description",
        developerEmail: "hknkocak97@icloud.com",
        id: "3",
        name: "Test Laptop",
        price: 1500,
      }
    );

    cy.get('[data-cy="description-input"]').type('Test case description');
    cy.get('[data-cy="name-input"]').type('Laptop');
    cy.get('[data-cy="category-input"]').select('Electronic');
    cy.get('[data-cy="avatar-input"]').type('https://snipstock.com/image/laptop-2746336-960-720-png-54021?download=medium');
    cy.get('[data-cy="price-input"]').type('1500');

    cy.contains('Submit').click();
    cy.contains('Test Laptop').should('be.visible');
  });

  it('should open error modal if an error occurs while creating the product', () => {
    cy.intercept(
      {
        method: 'POST',
        url: `${API_URL}/products`
      },
      {
        forceNetworkError: true
      }
    );

    cy.get('[data-cy="description-input"]').type('Test case description');
    cy.get('[data-cy="name-input"]').type('Laptop');
    cy.get('[data-cy="category-input"]').select('Electronic');
    cy.get('[data-cy="avatar-input"]').type('https://snipstock.com/image/laptop-2746336-960-720-png-54021?download=medium');
    cy.get('[data-cy="price-input"]').type('1500');

    cy.contains('Submit').click();
    cy.contains('Error creating product').should('be.visible');
  });

  it('should close error modal when close is clicked', () => {
    cy.intercept(
      {
        method: 'POST',
        url: `${API_URL}/products`
      },
      {
        forceNetworkError: true
      }
    );

    cy.get('[data-cy="description-input"]').type('Test case description');
    cy.get('[data-cy="name-input"]').type('Laptop');
    cy.get('[data-cy="category-input"]').select('Electronic');
    cy.get('[data-cy="avatar-input"]').type('https://snipstock.com/image/laptop-2746336-960-720-png-54021?download=medium');
    cy.get('[data-cy="price-input"]').type('1500');

    cy.contains('Submit').click();
    cy.contains('Error creating product').should('be.visible');
    cy.contains('Close').click();
    cy.contains('Error creating product').should('not.exist');
  });
});