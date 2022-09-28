const {
  data: {
    search: { nodes: repositories },
  },
} = require("../fixtures/search-react.json");

const REPOSITORY_COL = "nth-child(1)";
const STARS_COL = "nth-child(2)";
const FORKS_COL = "nth-child(3)";

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

  describe("table", () => {
    it("shows results correctly", () => {
      cy.intercept("https://api.github.com/graphql", {
        fixture: "search-react.json",
      });

      cy.get("#repositoryTable").within(() => {
        cy.get("thead tr").within(() => {
          cy.get(`th:${REPOSITORY_COL}`).contains("Repository");
          cy.get(`th:${STARS_COL}`).contains("Stars 🌟");
          cy.get(`th:${FORKS_COL}`).contains("Forks 🍴");
        });

        cy.get("tbody tr")
          .should("have.length", repositories.length)
          .each(($tr, index) => {
            cy.get($tr).within(() => {
              const repository = repositories[index];

              cy.get(`td:${REPOSITORY_COL}`)
                .contains(repository.nameWithOwner)
                .invoke("attr", "href")
                .should("equal", repository.url);

              cy.get(`td:${STARS_COL}`).contains(repository.stargazerCount);
              cy.get(`td:${FORKS_COL}`).contains(repository.forkCount);
            });
          });
      });
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
