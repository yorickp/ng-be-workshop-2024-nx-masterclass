# ✨ Nx Advanced Workshop ✨ 

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

## Setup
### Prerequisites

- Node v20+
  - Check with `node --version`
- Optionally [Yarn](https://yarnpkg.com/) or [Pnpm](https://pnpm.io/)
- [GitHub](https://github.com/) account
- IDE of your choice
- A [Fly.io](https://fly.io/) account with CLI installed
  - Check with: `fly help`
  - `Note` No need to set up the Credit card, we will use free tier

### Getting the repo

- Fork this repo
- Clone your fork and install dependencies
```bash
git clone https://github.com/{your name}/ng-be-workshop-2024.git

npm install
# optionally use `yarn` or `pnpm`
```

### Get acquainted with the application

- Run the application
```
npx nx serve movies-app
```
- Check the `apps` and `libs` folder
- Run `npx nx graph` to see how architecture looks like

## Labs

| `Advanced course` |
| - |
| [Introduction](./exercises/advanced-intro.md) |
| Automate your workspace with local plugins |
| `☕ Break` |
| Learn how to write and test your own generators |
| Write advanced deployment targets using a custom executor |
| `☕ Break` |
| Set up CI for your pull requests, connect to Nx Cloud, enable remote caching and the GitHub integration |
| Nx Caching deep dive: Strategies for debugging cache misses, optimization strategies, and fine-tuning cache inputs and outputs |
| Set up continuous deployment pipeline for affected applications |
| `☕ Break` |
| Configure task distribution on CI with Nx Agents, including exploring custom launch templates and dynamic agent scaling. |
| Leverage Nx Crystal plugins and Nx Atomizer to configure task splitting for improving CI distribution and speed |
| Explore flaky task detection |
| `Bonus:` Nx import, CodeOwners, and Conformance |

## Extras

### Install Nx Console

Nx Console is an editor extension that enriches your developer experience. It lets you run tasks, generate code, and improves code autocompletion in your IDE. It is available for VSCode and IntelliJ.

[Install Nx Console &raquo;](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

### Useful links

Learn more:

- [Learn more about this workspace setup](https://nx.dev/getting-started/tutorials/angular-monorepo-tutorial?utm_source=nx_project&amp;utm_medium=readme&amp;utm_campaign=nx_projects)
- [Learn about Nx on CI](https://nx.dev/ci/intro/ci-with-nx?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Releasing Packages with Nx release](https://nx.dev/features/manage-releases?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [What are Nx plugins?](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

And join the Nx community:
- [Discord](https://go.nx.dev/community)
- [Follow us on X](https://twitter.com/nxdevtools) or [LinkedIn](https://www.linkedin.com/company/nrwl)
- [Our Youtube channel](https://www.youtube.com/@nxdevtools)
- [Our blog](https://nx.dev/blog?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
