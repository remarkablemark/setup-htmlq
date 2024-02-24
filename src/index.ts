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
    // Get the version of the tool to be installed
    const version = getInput('htmlq-version') || VERSION;
    const name = getInput('cli-name') || CLI_NAME;

    // Download the specific version of the tool (e.g., tarball/zipball)
    const downloadUrl = getDownloadUrl(version);
    const downloadPath = await downloadTool(downloadUrl);

    // Extract the tarball/zipball onto the host runner
    const extract = downloadUrl.endsWith('.zip') ? extractZip : extractTar;
    const binaryDirectory = await extract(downloadPath);

    // Rename the binary
    const binaryPath = getFilepath(binaryDirectory, name);
    if (name !== CLI_NAME) {
      await exec('mv', [getFilepath(binaryDirectory, CLI_NAME), binaryPath]);
    }

    // Cache the tool
    await cacheFile(binaryPath, name, name, version);

    // Expose the tool by adding it to the PATH
    addPath(binaryDirectory);
  } catch (error) {
    if (error instanceof Error) {
      setFailed(error.message);
    }
  }
}

run();
