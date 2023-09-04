import * as core from '@actions/core';
import * as tc from '@actions/tool-cache';

import { run } from '.';
import { VERSION } from './constants';
import * as utils from './utils';

jest.mock('@actions/core');
jest.mock('@actions/tool-cache');
jest.mock('./utils');

const mockedCore = jest.mocked(core);
const mockedTc = jest.mocked(tc);
const mockedUtils = jest.mocked(utils);

beforeEach(() => {
  jest.resetAllMocks();
});

describe.each(['.zip', '.tar.gz'])('action', (downloadUrl) => {
  it('downloads, extracts, and exposes CLI in PATH', async () => {
    const pathToTarball = 'path/to/tarball';
    const pathToCLI = 'path/to/cli';

    mockedCore.getInput.mockImplementationOnce((name) =>
      name === 'htmlq-version' ? VERSION : '',
    );
    mockedUtils.getDownloadObject.mockReturnValueOnce({ url: downloadUrl });
    mockedTc.downloadTool.mockResolvedValueOnce(pathToTarball);
    const extract =
      downloadUrl === '.zip' ? mockedTc.extractZip : mockedTc.extractTar;
    extract.mockResolvedValueOnce(pathToCLI);

    await run();

    expect(mockedCore.getInput).toBeCalledWith('htmlq-version');
    expect(mockedUtils.getDownloadObject).toBeCalledWith(VERSION);
    expect(mockedTc.downloadTool).toBeCalledWith(downloadUrl);
    expect(extract).toBeCalledWith(pathToTarball);
    expect(mockedCore.addPath).toBeCalledWith(pathToCLI);
  });
});

describe('error', () => {
  it('throws error', async () => {
    mockedUtils.getDownloadObject.mockReturnValueOnce({ url: '' });
    const message = 'error';
    mockedTc.downloadTool.mockImplementationOnce(() => {
      throw new Error(message);
    });
    await run();
    expect(mockedUtils.getDownloadObject).toBeCalledWith(VERSION);
    expect(mockedCore.setFailed).toBeCalledWith(message);
  });
});
