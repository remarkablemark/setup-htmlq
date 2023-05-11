import os from 'os';

import { getDownloadObject } from './utils';

jest.mock('os');

const mockedOs = jest.mocked(os);

describe('getDownloadObject', () => {
  const platforms = ['darwin', 'linux', 'win32'];

  describe.each(platforms)('when OS is %p', (os) => {
    const version = '0.4.0';

    beforeEach(() => {
      jest.resetAllMocks();
      mockedOs.platform.mockReturnValueOnce(os as NodeJS.Platform);
    });

    it('gets download object', () => {
      expect(getDownloadObject(version)).toMatchSnapshot();
    });
  });
});
