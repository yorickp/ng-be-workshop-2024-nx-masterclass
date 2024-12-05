## Exercise 1

exercises/advanced/custom-plugins.md

## Exercise 2

exercises/advanced/complex-generators.md

## Exercise 3

exercises/advanced/deploy-target-and-custom-executor.md

### Step 2

```
npx nx g @nx/workspace:run-commands deploy --project movies-app --command 'npx surge dist/apps/movies-app/browser <https://ng-be-2024-workshop-movies-app.surge.sh> --token 7311416f78824b8f297a567dd0530b88'
```
