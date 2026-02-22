import { useState } from "react";
import API from "../api";

const STEP_NAMES = [

  "GitHub PR merged",
  "Changelog updated",
  "Tests passing",
  "Release created",
  "Deployed to demo",
  "Tested in demo",
  "Production deploy"

];

export default function ReleaseDetail({ release, goBack }) {

  const [steps, setSteps] = useState(release.steps);

  const [info, setInfo] = useState(release.additional_info || "");

  async function toggleStep(index) {

  const newSteps = [...steps];
  newSteps[index] = !newSteps[index];

  const res = await API.put("/releases/" + release.id, {
    steps: newSteps,
    additional_info: info
  });

  setSteps(res.data.steps);

  // reload full page to refresh status
  window.location.reload();
  }

  async function updateInfo(value) {

    setInfo(value);

    await API.put("/releases/" + release.id, {

      steps: steps,
      additional_info: value

    });
  }

  return (

    <div>

      <button onClick={goBack}>
        Back
      </button>

      <h2>{release.name}</h2>

      <h3>Checklist</h3>

      {STEP_NAMES.map((step, index) => (

        <div key={index}>

          <input
            type="checkbox"
            checked={steps[index]}
            onChange={() => toggleStep(index)}
          />

          {step}

        </div>

      ))}

      <h3>Additional Info</h3>

      <textarea
        value={info}
        onChange={e => updateInfo(e.target.value)}
      />

    </div>
  );
}