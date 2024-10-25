// next.config.js
module.exports = {
    // Environment variables exposed for client-side usage
    env: {
      NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || '', // Example client-side variable
    },
  
    // Webpack configuration to mock 'process' for client-side builds
    webpack: (config, { isServer }) => {
      if (!isServer) {
        // Mock process for the client-side
        config.resolve.fallback = { 
          process: require.resolve('process/browser') 
        };
      }
      return config;
    },
  
    // Enable strict mode for better debugging
    reactStrictMode: true,
  
    // Customizing build output path (if needed)
    output: 'standalone',
  
    // Any other future custom configuration can go here
  };
  