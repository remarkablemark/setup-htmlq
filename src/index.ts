import { addPath, getInput, setFailed } from '@actions/core';
import { downloadTool, extractTar, extractZip } from '@actions/tool-cache';

import { VERSION } from './constants';
import { getDownloadObject } from './utils';

export async function run() {
  try {
    // Get version of tool to be installed
    const version = getInput('htmlq-version') || VERSION;

    // Download the specific version of the tool, e.g. as a tarball/zipball
    const download = getDownloadObject(version);
    const pathToTarball = await downloadTool(download.url);

    // Extract the tarball/zipball onto host runner
    const extract = download.url.endsWith('.zip') ? extractZip : extractTar;
    const pathToCLI = await extract(pathToTarball);

    // Expose the tool by adding it to the PATH
    addPath(pathToCLI);
  } catch (error) {
    if (error instanceof Error) {
      setFailed(error.message);
    }
  }
}

run();
