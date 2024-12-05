import {
  formatFiles,
  getProjects,
  ProjectConfiguration,
  Tree,
  updateJson,
} from '@nx/devkit';
import { UpdateScopeSchemaGeneratorSchema } from './schema';

export async function updateScopeSchemaGenerator(
  tree: Tree,
  options: UpdateScopeSchemaGeneratorSchema
) {
  // 1. New generator
  /* const projectRoot = `libs/${options.name}`;
  addProjectConfiguration(tree, options.name, {
    root: projectRoot,
    projectType: 'library',
    sourceRoot: `${projectRoot}/src`,
    targets: {},
  });
  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, options); */

  const projects = getProjects(tree);
  const scopes = getScopes(projects);
  console.log('scopes', scopes);

  updateJson(tree, 'nx.json', (json) => ({
    ...json,
    defaultProject: 'movies-app',
  }));

  // 2. Add scope crawling
  updateJson(
    tree,
    'libs/internal-plugin/src/generators/util-lib/schema.json',
    (json) => {
      json.properties.directory['x-prompt'].enum = scopes;
      json.properties.directory['x-prompt'].items = scopes.map((scope) => ({
        value: scope,
        label: scope,
      }));
      return json;
    }
  );

  // 3. Updating non-JSON files
  tree.write(
    'libs/internal-plugin/src/generators/util-lib/schema.d.ts',
    `export interface UtilLibGeneratorSchema {
    name: string;
    directory: ${scopes.map((scope) => `'${scope}'`).join(' | ')};
    }`
  );

  await formatFiles(tree);
}

function getScopes(projectMap: Map<string, ProjectConfiguration>) {
  const allScopes: string[] = Array.from(projectMap.values())
    .map((project) => {
      if (project.tags) {
        const scopes = project.tags.filter((tag: string) =>
          tag.startsWith('scope:')
        );
        return scopes;
      }
      return [];
    })
    .reduce((acc, tags) => [...acc, ...tags], [])
    .map((scope: string) => scope.slice(6));

  // remove duplicates
  return Array.from(new Set(allScopes));
}

export default updateScopeSchemaGenerator;
