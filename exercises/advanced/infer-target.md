# `📖 Exercise:` Infer Fly.io deploy target

## 📚&nbsp;&nbsp;**Learning outcomes**

- Learn how to create inferred target using crystal plugins

## 🏋️‍♀️&nbsp;&nbsp;Steps:

### 1. Creating inferred plugin

We already have a custom executor to execute the `deploy` target. We have to manually configure it per project. 
Of course, it would be desirable to have the project infer the `deploy` target whenever there is an existing `fly.toml`.
Let's build it. Since we want to parse the toml file we need to install package that would allow us to do that:

```bash
npm i -D toml
```

Create a file `libs/internal-plugin/src/plugins/plugin.ts` with following contents:

```ts
import { createNodesFromFiles, CreateNodesV2, logger, TargetConfiguration } from '@nx/devkit';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import toml from 'toml';

export interface FlyIoPluginOptions {
  targetName?: string;
  buildTargetName?: string;
}

function normalizeOptions(
  options: Partial<FlyIoPluginOptions> = {}
): FlyIoPluginOptions {
  return {
    targetName: options.targetName ?? 'deploy',
    buildTargetName: options.buildTargetName ?? 'build',
  };
}

export const createNodesV2: CreateNodesV2<FlyIoPluginOptions> = [
  '**/fly.toml',
  async (configFiles, options, context) => {
    try {
      const opts = normalizeOptions(options ?? {});
      const {
        buildTargetName,
        targetName
      } = opts;
      return await createNodesFromFiles(
        (tomlFile, options, context) => {
          const projectRoot = join(dirname(tomlFile), '..');
          const { app } = toml.parse(readFileSync(tomlFile, 'utf-8'));

          const targets: Record<string, TargetConfiguration> = {};
          targets[targetName] = {
            executor: '@nx-workshop/internal-plugin:fly-deploy',
            options: {
              distLocation: `dist/${projectRoot}`,
              flyAppName: app
            },
            cache: true,
            dependsOn: [
              { target: buildTargetName, projects: 'self', params: 'forward' }],
            inputs: [
              tomlFile.replace(projectRoot, '{projectRoot}'),
              'production', '^production',
            ],
          };

          return {
            projects: {
              [projectRoot]: {
                root: projectRoot,
                projectType: 'application',
                targets,
              },
            },
          };
        },
        configFiles,
        options,
        context
      );
    } catch (e) {
      logger.error(e);
    }
  },
];
```

Let's take a while to consume this code and understand what happens.

Our main `createNodesV2` struct takes two parameters:
- source file pattern
- create nodes function

We are searching for all `fly.toml` files as a file pattern. For each found file we will invoke the given function.
The `CreateNodesFunctionV2` takes three arguments:
- config files fed by the pattern
- `FlyIoPluginOptions` given to plugin via configuration
- context in which it was invoked (we will ignore this one since it's not used in this case) 

On each file discovered we will run `createNodesFromFiles` function and will parse the project root and extract the Fly.io app name from the toml file. Next we use that information to contruct the exact copy of our `deploy` target in the `movies-api` `project.json` where we use app name and projectRoot to fill out the dynamic information.

We now need to expose this plugin via `libs/internal-plugin/src/index.ts`:

```ts
export {
  createNodesV2,
  FlyIoPluginOptions,
} from './plugins/plugin';
```

Our plugin is now ready for import

### 2. Enabling plugin

Let's add our plugin to `nx.json`:

```jsonc
{
  // ...
  "plugins": {
    // ...
    {
      "plugin": "@nx-workshop/internal-plugin",
      "options": {
        "buildTargetName": "build",
        "targetName": "deploy"
      }
    }
  }
  // ...
}
```

For the testing purposes, we can try to change the `targetName` to something else e.g. `inferreddeploy`. If you look at your graph now you should see the new target.

Try to run `npx nx inferreddeploy movies-api`. It should successfully deploy the app.

### 3. Final steps and test

As we have our deploy target now inferred via plugin we can go ahead to our `apps/movies-api/project.json` and remove `deploy` target configuration from it.
Try to run `npx nx deploy movies-api` again. Deploy should still work since it's now using information from the crystal plugin.

## Want more?

There's one last [✨ bonus ✨](./bonus.md)
