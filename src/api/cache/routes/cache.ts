export default {
  routes: [
    {
      method: "POST",
      path: "/cache/clear",
      handler: "cache.clear",
      config: {
        auth: false,
      },
    },
  ],
};
