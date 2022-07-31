/// <reference types="Cypress" />

import { expect } from "chai";

describe("The Home Page", () => {
  beforeEach(() => {
    // cy.request(
    //   "DELETE",
    //   "https://task4-ef227-default-rtdb.firebaseio.com/activities.json"
    // );
    cy.clearLocalStorage().should((localStorage) => {
      expect(localStorage.getItem("token")).to.be.null;
      expect(localStorage.getItem("username")).to.be.null;
      expect(localStorage.getItem("admin")).to.be.null;
    });
  });

  it("verify if in dashboard page", () => {
    cy.visit("/");
    cy.url().should("include", "/login");
  });

  it("verify login page and localStoarge", () => {
    cy.contains("Sign In");
    cy.get("#name").type("basel@batanjeh.com");
    cy.get("#pass").type("654321");
    cy.contains("Sign In")
      .click()
      .should(() => {
        expect(localStorage.getItem("token")).not.to.be.null;
        expect(localStorage.getItem("username")).not.to.be.null;
        expect(localStorage.getItem("admin")).not.to.be.null;
      });
  });

  it("verify login page and localStoarge", () => {
    cy.get("#addUser").should("have.text", "+");
    cy.get("#addUser").should("not.have.text", "Add New User");
    cy.get("#addUser").trigger("mouseover");
    cy.get("#addUser").should("not.have.text", "+");
    cy.get("#addUser").should("have.text", "Add New User");

    cy.get("#addUser").click();
    cy.contains("Add New Car");
    cy.url().should("include", "?addNewCar=true");
  });

  it("verify login page and localStoarge", () => {
    cy.get("#name").type("BMW");
    const p = "bmw.jpg";
    cy.get("#number").type("100");
    cy.get("#uploadImage").attachFile(p);
    cy.get("#details").type("BMW BMW");
    cy.get("#addEditButton").contains("Add");
    cy.get("#addEditButton").click();
  });

  it(
    "verify login page and localStoarge",
    { defaultCommandTimeout: 8000 },
    () => {
      cy.url().should("not.include", "?addNewCar=true");
      cy.contains("BMW BMW");
      cy.contains("100$");
      cy.contains("BMW - 100$").click();
      cy.get("#actionss").children().should("not.have.id", "rent");

      cy.get("#edit").should("be.visible");
      cy.get("#delete").should("be.visible");
      cy.get("#edit").click();

      cy.get("#name").clear().type("edited_name");
      const p = "bmw.jpg";
      cy.get("#uploadImage").attachFile(p);
      cy.get("#addEditButton").contains("Edit");
      cy.get("#addEditButton").click();
      cy.url().should("include", "?editCar=true");

      cy.contains("edited_name");
      cy.contains("Add New Image");

      cy.get("#delete").click();
      cy.get("#delete_car").click();
      cy.contains("edited_name - 100$").should("not.exist");
    }
  );

  it(
    "verify login page and localStoarge",
    { defaultCommandTimeout: 8000 },
    () => {
      cy.get("#historyButton").click();
      cy.url().should("include", "/history");

      cy.get("#usernameField").should("be.visible");
    }
  );

  it("verify login page and localStoarge", () => {
    cy.get("#logout").trigger("mouseover");
    cy.contains("Logout").should("be.visible");
    cy.url().should("include", "/history");

    cy.get("#logout").click();
    cy.url().should("include", "/login");
    cy.visit("/history");
    cy.url().should("include", "/login");
    expect(localStorage.getItem("token")).to.be.null;
    expect(localStorage.getItem("username")).to.be.null;
    expect(localStorage.getItem("admin")).to.be.null;
  });
});
