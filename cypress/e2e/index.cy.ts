describe("Application", () => {
  beforeEach(function () {
    cy.visit("http://localhost:3000/");
  });

  describe("title", () => {
    it("shows", () => {
      cy.contains("GitHub repository search (GraphQL API v4)");
    });
  });

  describe("search", () => {
    it("shows with default input", () => {
      cy.get('input[name="repositorySearch"]').should("have.value", "react");
    });

    it("allows custom searching", () => {
      cy.get('input[name="repositorySearch"]')
        .clear()
        .type("angular")
        .siblings()
        .find("button")
        .click();

      cy.get("#repositoryTable tbody tr:nth-child(1) td:nth-child(1)").contains(
        "angular/angular"
      );
    });
  });

  describe("load more", () => {
    it("shows", () => {
      cy.get("button[name='repositorySearchLoadMore").contains("Load more");
    });

    it("loads more repositories", () => {
      cy.get("button[name='repositorySearchLoadMore").click();

      cy.get("#repositoryTable tbody tr").should("have.length", 20);
    });
  });
});
