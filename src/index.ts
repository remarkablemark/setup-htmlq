import { addPath, getInput, setFailed } from '@actions/core';
import { exec } from '@actions/exec';
import {
  cacheFile,
  downloadTool,
  extractTar,
  extractZip,
} from '@actions/tool-cache';

import { CLI_NAME, VERSION } from './constants';
import { getDownloadUrl, getFilepath } from './utils';

export async function run() {
  try {
    // Get version of tool to be installed
    const version = getInput('htmlq-version') || VERSION;
    const name = getInput('cli-name') || CLI_NAME;

    // Download the specific version of the tool, e.g. as a tarball/zipball
    const downloadUrl = getDownloadUrl(version);
    const downloadPath = await downloadTool(downloadUrl);

    // Extract the tarball/zipball onto host runner
    const extract = downloadUrl.endsWith('.zip') ? extractZip : extractTar;
    const downloadDirectory = await extract(downloadPath);

    // Rename binary
    const cliPath = getFilepath(downloadDirectory, name);
    if (name !== CLI_NAME) {
      await exec('mv', [getFilepath(downloadDirectory, CLI_NAME), cliPath]);
    }

    // Cache tool
    await cacheFile(cliPath, name, name, version);

    // Expose the tool by adding it to the PATH
    addPath(downloadDirectory);
  } catch (error) {
    if (error instanceof Error) {
      setFailed(error.message);
    }
  }
}

run();
