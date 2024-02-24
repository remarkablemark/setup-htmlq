import os from 'os';

import { getBinaryPath, getDownloadUrl } from './utils';

jest.mock('os');

const mockedOs = jest.mocked(os);

const platforms = ['darwin', 'linux', 'win32'] as const;

describe('getDownloadUrl', () => {
  describe.each(platforms)('when OS is %p', (os) => {
    const { RUNNER_TEMP } = process.env;
    const version = '0.4.0';

    beforeAll(() => {
      process.env.RUNNER_TEMP = '';
    });

    afterAll(() => {
      process.env.RUNNER_TEMP = RUNNER_TEMP;
    });

    beforeEach(() => {
      jest.resetAllMocks();
      mockedOs.platform.mockReturnValueOnce(os);
      mockedOs.tmpdir.mockReturnValueOnce('/var/folders/1/tmp/T');
    });

    it('gets download object', () => {
      expect(getDownloadUrl(version)).toMatchSnapshot();
    });
  });
});

describe('getBinaryPath', () => {
  describe.each(platforms)('when OS is %p', (os) => {
    beforeEach(() => {
      jest.resetAllMocks();
      mockedOs.platform.mockReturnValueOnce(os);
    });

    it('returns CLI filepath', () => {
      const directory = 'directory';
      const name = 'name';
      expect(getBinaryPath(directory, name)).toMatchSnapshot();
    });
  });
});
