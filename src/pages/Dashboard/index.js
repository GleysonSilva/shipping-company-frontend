import React from "react";
import api from "../../services/api";

export default function Dashboard(params) {
  const [spots, setspots] = React.useState([]);

  React.useEffect(() => {
    async function laodSpots() {
      const user_id = localStorage.getItem("user");
      console.log("id", user_id);
      const response = await api.get("/dashboard", {
        headers: { user_id },
      });
      setspots(response.data);
      console.log(response.data);
    }
    laodSpots();
  }, []);
  return <>Teset</>;
}
