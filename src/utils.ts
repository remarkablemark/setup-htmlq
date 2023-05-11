import os from 'os';

const platform = {
  darwin: 'darwin',
  linux: 'linux',
  win32: 'windows',
} as const;

/**
 * Gets a string identifying the operating system platform.
 *
 * @see {@link https://nodejs.org/api/os.html#os_os_platform}
 *
 * @param os - OS in [darwin, linux, win32...]
 * @returns - Return value in [darwin, linux, windows]
 */
function getOS(os: NodeJS.Platform) {
  return platform[os as keyof typeof platform];
}

/**
 * Gets download object.
 *
 * @see {@link https://github.com/mgdm/htmlq/releases}
 *
 * @param version - CLI version
 * @returns - URL and binary path
 */
export function getDownloadObject(version: string) {
  const platform = os.platform();

  const filename = `htmlq-x86_64-${getOS(platform)}`;
  const extension = platform === 'win32' ? 'zip' : 'tar.gz';

  return {
    url: `https://github.com/mgdm/htmlq/releases/download/v${version}/${filename}.${extension}`,
  };
}
