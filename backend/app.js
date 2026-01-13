import express from 'express';
import cors from 'cors';
import authRoutes from "./routes/auth.routes.js";
import lifeEventRoutes from "./routes/event.routes.js";
import outcomeRoutes from "./routes/outcome.routes.js";
import errorMiddleware from "./middleware/error.js";
import insightRoutes from "./routes/insight.routes.js"
const app = express();

/* -------------------- GLOBAL MIDDLEWARES -------------------- */

// Parse JSON bodies
app.use(express.json());

// Enable CORS
app.use(cors({
  origin: "*", // later restrict
  methods: ["GET", "POST", "PUT", "DELETE"]
}));

app.use("/api/auth", authRoutes);
app.use("/api/event",lifeEventRoutes);
app.use("/api/outcome", outcomeRoutes);
app.use("/api/insights", insightRoutes);

app.get('/', (req, res) => {
  res.send('Life Pattern Analyzer API running');
});

errorMiddleware

export default app;