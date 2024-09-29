module.exports = {
    ci: {
      collect: {
        staticDistDir: './build',
        numberOfRuns: 1,
      },
      assert: {
        preset: 'lighthouse:recommended',
      },
      upload: {
        target: 'temporary-public-storage',
      },
    },
  };
  