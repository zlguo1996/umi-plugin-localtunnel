import { defineConfig } from 'umi';

export default defineConfig({
  plugins: [require.resolve('../lib')],
  localtunnel: {
    subdomain: 'test-subdomain',
  },
});
