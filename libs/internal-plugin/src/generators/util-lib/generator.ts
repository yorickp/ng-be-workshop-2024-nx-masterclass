import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  Tree,
} from '@nx/devkit';
import * as path from 'path';
import { UtilLibGeneratorSchema } from './schema';
import { libraryGenerator } from '@nx/js';

export async function utilLibGenerator(
  tree: Tree,
  options: UtilLibGeneratorSchema
) {
  // 6. Console log the properties
  console.log('Name specified:', options.name);

  // 7. Add prefix
  const libName = options.name.startsWith('util-')
    ? options.name
    : 'util-' + options.name;

  // 5. Extend other generators
  /* const projectRoot = `libs/${options.name}`;
  addProjectConfiguration(tree, options.name, {
    root: projectRoot,
    projectType: 'library',
    sourceRoot: `${projectRoot}/src`,
    targets: {},
  });
  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, options); */

  await libraryGenerator(tree, {
    directory: 'libs/' + options.directory + '/' + libName,
    // 9. Add tags
    tags: 'scope:' + options.directory,
  });

  await formatFiles(tree);
}

export default utilLibGenerator;
