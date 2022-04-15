/// <reference types="cypress" />

import { API_URL } from '../../support/';

describe('Product Details Page', () => {
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
    cy.visit('/products');
  });

  it('should redirect to products page if product details are not found', () => {
    cy.wait(1000);
    cy.visit('/products/10');
    cy.url().should('not.include', '10');
  });

  it('should display product details', () => {
    cy.contains('Iphone').click();
    cy.contains('Iphone').should('be.visible');
    cy.contains('Created at').should('be.visible');
    cy.contains('Added by hknkocak97@icloud.com').should('be.visible');
    cy.contains('$1,232.00').should('be.visible');
    cy.contains('Description').should('be.visible');
    cy.contains('What an awesome phone').should('be.visible');
  });

  it('should open delete dialog when delete button clicked', () => {
    cy.contains('Iphone').click();
    cy.get('[data-cy="delete-product-btn"]').click();
    cy.contains('Delete Product').should('be.visible');
  });

  it('should close delete dialog when close button clicked', () => {
    cy.contains('Iphone').click();
    cy.get('[data-cy="delete-product-btn"]').click();
    cy.contains('Delete Product').should('be.visible');
    cy.contains('Close').click();
    cy.contains('Delete Product').should('not.exist');
  });

  it('should delete product and navigate to /products page', () => {
    cy.intercept(
      {
        method: 'DELETE',
        url: `${API_URL}/products/1`
      },
      {
        avatar: "https://snipstock.com/image/png-images-pngs-iphone-x-iphone-smartphone-iphones-phone-24-png-45085?download=small",
        category: "Electronic",
        createdAt: 1650040436,
        description: "What an awesome phone",
        developerEmail: "hknkocak97@icloud.com",
        id: "1",
        name: "Iphone",
        price: 1232,

      }
    );
    cy.contains('Iphone').click();
    cy.get('[data-cy="delete-product-btn"]').click();
    cy.contains('Delete Product').should('be.visible');
    cy.contains('Yes').click();
    cy.contains('Iphone').should('not.exist');
  });

  it('should open error dialog when there is an error deleting product', () => {
    cy.intercept(
      {
        method: 'DELETE',
        url: `${API_URL}/products/1`
      },
      {
        forceNetworkError: true
      }
    );
    cy.contains('Iphone').click();
    cy.get('[data-cy="delete-product-btn"]').click();
    cy.contains('Delete Product').should('be.visible');
    cy.contains('Yes').click();
    cy.contains('Error deleting product').should('exist');
  });
});