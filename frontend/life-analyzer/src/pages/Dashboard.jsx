import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import Loader from "../components/Loader";
import axiosInstance from "../api/axiosInstance";

function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchInsights() {
      try {
        const res = await axiosInstance.get("/insights");
        console.log("INSIGHTS RESPONSE:", res.data);
        setData(res.data);
      } catch (error) {
        console.error("Failed to fetch insights", error);
      } finally {
        setLoading(false); // ✅ ALWAYS RUNS
      }
    }

    fetchInsights();
  }, []);

  if (loading) return <Loader />;

  //if (!data) return <p>No insights available</p>;

  return (
    <div>
      <Card title="Wellness Score">
        <h2>{data.wellnessScore}</h2>
      </Card>

      <Card title="Today Summary">
        <p>Mood: {data.mood}</p>
        <p>Sleep: {data.sleep} hrs</p>
      </Card>

      <Card title="Insight">
        <p>{data.insight}</p>
      </Card>
    </div>
  );
}

export default Dashboard;
