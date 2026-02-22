import { useState } from "react";
import API from "../api";

export default function NewRelease() {

  const [name, setName] = useState("");

  const [date, setDate] = useState("");

  const [info, setInfo] = useState("");

  async function createRelease() {

    if (!name || !date) {
      alert("Name and date required");
      return;
    }

    await API.post("/releases", {

      name: name,
      release_date: date,
      additional_info: info

    });

    alert("Release created");

    window.location.reload();
  }

  return (

    <div style={{ marginTop: "20px" }}>

      <h2>Create Release</h2>

      <div>
        Name:
        <br/>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>

      <div>
        Date:
        <br/>
        <input
          type="datetime-local"
          onChange={e => setDate(e.target.value)}
        />
      </div>

      <div>
        Additional Info:
        <br/>
        <textarea
          onChange={e => setInfo(e.target.value)}
        />
      </div>

      <br/>

      <button onClick={createRelease}>
        Create Release
      </button>

    </div>
  );
}