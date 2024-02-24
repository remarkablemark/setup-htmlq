import * as core from '@actions/core';
import * as exec from '@actions/exec';
import * as tc from '@actions/tool-cache';
import os from 'os';

import { run } from '.';

jest.mock('@actions/core');
jest.mock('@actions/exec');
jest.mock('@actions/tool-cache');
jest.mock('os');

const mockedCore = jest.mocked(core);
const mockedExec = jest.mocked(exec);
const mockedTc = jest.mocked(tc);
const mockedOs = jest.mocked(os);

beforeEach(() => {
  jest.resetAllMocks();
});

const name = 'cli-name';
const version = '1.2.3';
const downloadDirectory = 'downloadDirectory';

const downloads = [
  {
    os: 'linux',
    url: `https://github.com/mgdm/htmlq/releases/download/v${version}/htmlq-x86_64-linux.tar.gz`,
    source: `${downloadDirectory}/htmlq`,
    cli: `${downloadDirectory}/${name}`,
  },
  {
    os: 'win32',
    url: `https://github.com/mgdm/htmlq/releases/download/v${version}/htmlq-x86_64-windows.zip`,
    source: `${downloadDirectory}/htmlq.exe`,
    cli: `${downloadDirectory}/${name}.exe`,
  },
] as const;

describe.each(downloads)('action', (download) => {
  beforeEach(() => {
    jest.resetAllMocks();

    mockedOs.platform.mockReturnValue(download.os);

    mockedCore.getInput.mockImplementation((input) => {
      switch (input) {
        case 'htmlq-version':
          return version;
        case 'cli-name':
          return name;
        default:
          return '';
      }
    });

    mockedTc.downloadTool.mockResolvedValueOnce(downloadDirectory);

    const extract = download.url.endsWith('.zip')
      ? mockedTc.extractZip
      : mockedTc.extractTar;
    extract.mockResolvedValueOnce(downloadDirectory);
  });

  it('downloads, extracts, and adds CLI to PATH', async () => {
    await run();

    expect(mockedTc.downloadTool).toHaveBeenCalledWith(download.url);

    expect(mockedExec.exec).toHaveBeenCalledWith('mv', [
      download.source,
      download.cli,
    ]);

    expect(mockedTc.cacheFile).toHaveBeenCalledWith(
      download.cli,
      name,
      name,
      version,
    );

    expect(mockedCore.addPath).toHaveBeenCalledWith(downloadDirectory);
  });
});

describe('error', () => {
  it('throws error', async () => {
    const message = 'error';
    mockedTc.downloadTool.mockImplementationOnce(() => {
      throw new Error(message);
    });
    await run();
    expect(mockedCore.setFailed).toHaveBeenCalledWith(message);
  });
});
