const express = require("express");
const cors = require("cors");
const pool = require("./db");
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const DEFAULT_STEPS = [
  false,false,false,false,false,false,false
];

function computeStatus(steps) {
  if (steps.every(s => !s)) return "planned";
  if (steps.every(s => s)) return "done";
  return "ongoing";
}

// GET all releases
app.get("/api/releases", async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM releases ORDER BY release_date DESC"
  );

  const releases = result.rows.map(r => ({
    ...r,
    status: computeStatus(r.steps)
  }));

  res.json(releases);
});

// CREATE release
app.post("/api/releases", async (req, res) => {

  const { name, release_date, additional_info } = req.body;

  const result = await pool.query(
    "INSERT INTO releases (id,name,release_date,additional_info,steps) VALUES ($1,$2,$3,$4,$5) RETURNING *",
    [
      uuidv4(),
      name,
      release_date,
      additional_info,
      JSON.stringify(DEFAULT_STEPS)
    ]
  );

  res.json(result.rows[0]);
});

// UPDATE release
app.put("/api/releases/:id", async (req, res) => {

  const { id } = req.params;
  const { steps, additional_info } = req.body;

  const result = await pool.query(
    "UPDATE releases SET steps=$1, additional_info=$2 WHERE id=$3 RETURNING *",
    [JSON.stringify(steps), additional_info, id]
  );

  // compute status before returning
  const release = result.rows[0];

  let status;
  if (steps.every(s => !s)) status = "planned";
  else if (steps.every(s => s)) status = "done";
  else status = "ongoing";

  res.json({
    ...release,
    status
  });
});

app.listen(process.env.PORT, () =>
  console.log("Server running on port " + process.env.PORT)
);