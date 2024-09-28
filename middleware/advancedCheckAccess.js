const advancedCheckAccess = (conditions) => async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    for (const [key, condition] of Object.entries(conditions)) {
      if (Array.isArray(condition)) {
        // Simple array check
        if (!condition.includes(req.user[key])) {
          return res.status(403).json({ error: "Forbidden" });
        }
      } else if (typeof condition === "function") {
        // Custom function check
        const result = await condition(req);
        if (!result) {
          return res.status(403).json({ error: "Forbidden" });
        }
      }
    }
    next();
  } catch (error) {
    console.error("RBAC Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = advancedCheckAccess;
