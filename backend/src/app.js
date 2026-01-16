const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const adminRoutes = require("./routes/admin.routes");
const storeRoutes = require("./routes/store.routes");
const ratingRoutes = require("./routes/rating.routes");
const storeOwnerRoutes = require("./routes/storeOwner.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/ratings", ratingRoutes);
app.use("/api/store-owner", storeOwnerRoutes);

app.get("/", (req, res) => {
  res.send("Roxiler Assignment API running");
});

module.exports = app;