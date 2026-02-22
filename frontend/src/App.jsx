import { useState } from "react";
import ReleaseList from "./components/ReleaseList";
import NewRelease from "./components/NewRelease";

function App() {

  const [showForm, setShowForm] = useState(false);

  return (

    <div style={{ padding: "20px" }}>

      <h1>Release Checklist</h1>

      <button onClick={() => setShowForm(!showForm)}>

        {showForm ? "Back to list" : "Create New Release"}

      </button>

      {showForm ? <NewRelease /> : <ReleaseList />}

    </div>
  );
}

export default App;