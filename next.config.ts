import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  // Use an absolute path for turbopack.root to ensure Turbopack
  // resolves modules from this project folder, not a parent workspace.
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
