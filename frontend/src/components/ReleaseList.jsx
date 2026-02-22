import { useEffect, useState } from "react";
import API from "../api";

export default function ReleaseList() {

  const [releases, setReleases] = useState([]);
  const [selectedRelease, setSelectedRelease] = useState(null);

  useEffect(() => {
    loadReleases();
  }, []);

  async function loadReleases() {
    const res = await API.get("/releases");
    setReleases(res.data);
  }

  if (selectedRelease) {
    return (
      <ReleaseDetail
        release={selectedRelease}
        goBack={() => {
          setSelectedRelease(null);
          loadReleases();
        }}
      />
    );
  }

  return (
    <div>

      <h2>All Releases</h2>

      <table border="1" cellPadding="10">

        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>

          {releases.map(r => (

            <tr
              key={r.id}
              onClick={() => setSelectedRelease(r)}
              style={{ cursor: "pointer" }}
            >

              <td>{r.name}</td>

              <td>
                {new Date(r.release_date).toLocaleString()}
              </td>

              <td>{r.status}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

// import at bottom to avoid error
import ReleaseDetail from "./ReleaseDetail";