const path = require("path");
const fs = require("fs");

function getRoutesRecursively(layer, basePath = "") {
  if (layer.route) {
    const methods = Object.keys(layer.route.methods).map((method) =>
      method.toUpperCase()
    );
    return [
      {
        path: path.join(basePath, layer.route.path),
        methods: methods,
      },
    ];
  }

  if (layer.name === "router" || layer.name === "bound dispatch") {
    let routes = [];
    if (layer.handle.stack) {
      layer.handle.stack.forEach((stackItem) => {
        routes = routes.concat(
          getRoutesRecursively(
            stackItem,
            path.join(
              basePath,
              layer.regexp.source.replace(/^\^|\/\*\?|\\\/?$/g, "")
            )
          )
        );
      });
    }
    return routes;
  }

  return [];
}

function getAllRoutes(app) {
  let routes = [];
  app._router.stack.forEach((layer) => {
    routes = routes.concat(getRoutesRecursively(layer));
  });
  return routes;
}

function exportRoutes(app, outputPath) {
  const routes = getAllRoutes(app);
  const routeString = routes
    .map((route) => `${route.methods.join(", ")} ${route.path}`)
    .join("\n");
  fs.writeFileSync(outputPath, routeString);
  console.log(`Routes exported to ${outputPath}`);
  return routes;
}

module.exports = { getAllRoutes, exportRoutes };
