import React from "react";
import RepositoryTable from "../../src/components/RepositorySearch/components/RepositoryTable";

const {
  data: {
    search: { nodes: repositories },
  },
} = require("../fixtures/search-react.json");

const REPOSITORY_COL = "nth-child(1)";
const STARS_COL = "nth-child(2)";
const FORKS_COL = "nth-child(3)";

describe("RepositoryTable", () => {
  it("mounts", () => {
    cy.mount(<RepositoryTable repositories={[]} />);
    cy.get("#repositoryTable").within(() => {
      cy.contains("No Data");
    });
  });

  it("shows results correctly", () => {
    cy.mount(<RepositoryTable repositories={repositories} />);

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
