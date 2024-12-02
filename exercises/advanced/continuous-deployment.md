# `📖 Excercise:` Continuous deployment for affected projects

## 📚&nbsp;&nbsp;**Learning outcomes**
- Learn how to enable continuous deployments in CI
- Learn when to enable deployment caching and how to control it

## 🏋️‍♀️&nbsp;&nbsp;Steps:

### 1. Optimizing inputs for deploy target
In the previous lab we learned how to configure the inputs and outputs to better control when is our task's cache being busted.
Both of our deploy commands are NOT using first-party `@nx/...` executors for invoking the commands, so any changes to the installed dependencies/lockfile will have their cache busted. Even if you update e.g. version of `eslint` both of our apps will be re-deployed.

To avoid that, we need to limit the list of packages whose changes can influence those executors. We will use `externalDependencies` input mentioned in the previous lab. As both of them depend on the `nx` itself, we will add it via `targetDependencies` in `nx.json`:

```jsonc
"targetDefaults": {
  // ...
  "deploy": {
    "dependsOn": ["build"],
    "inputs": [
      "production", 
      "^production", 
      { "externalDependencies": ["nx" ]}
    ],
  },
  // ...
}
```

Since we specified `dependsOn` in our target defaults, we can go ahead and remove it from our `project.json` files. Notice how `deploy` now also depends on `production` instead of `default`, since we don't want e.g. changes to unit tests to trigger the deployment.

<details>
<summary>🐳&nbsp;&nbsp;Hint</summary>

This is hint
</details>
<br/>
<details>
<summary>🐳&nbsp;&nbsp;Solution</summary>

This is solution. Don't forget to separate two details blocks with line break.
</details>
<br/>
<details>
<summary>❓&nbsp;&nbsp;What does this do?</summary>

This is additional learning and it usually has question as a title
</details>

> ⚠️&nbsp;&nbsp;This is important info

## [➡️ Next lab ➡️](.)
