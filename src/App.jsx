import React, { useState, useEffect, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "./style/App.css";
import { Button, Dialog } from "@mui/material";
import PlanningModal from "./components/PlanningModal"
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';

function App() {
  const [tripsData, setTripsData] = useState([])
  const [tripsColDefs, setTripsColDefs] = useState([
    { field: "destination", flex: 1 },
    { field: "arriving", flex: 1 },
    { field: "departure", flex: 1 },
    { field: "budget", flex: 1 },
    {
      headerName: "",
      field: "edit",
      flex: 0.4,
      cellRenderer: (params) => (
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Button
            variant="text"
            color="primary"
            onClick={() => handleSelectionToEdit(params.data)}
            style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <EditLocationAltIcon />
          </Button>
        </div>
      ),
    }
  ]);
  
  const [selectedTrip, setSelectedTrip] = useState(null)

  const [openPlanningModal, setOpenPlanningModal] = useState(false);
  const handleOpenPlanningModal = () => {
    setOpenPlanningModal(true);
  };
  const handleClosePlanningModal = () => {
    setOpenPlanningModal(false);
  };

  const handleSelectionToEdit = useCallback ((clicked) => {
    setSelectedTrip(clicked);
    handleOpenPlanningModal();
  },[tripsData])

  useEffect(() => {
  }, []);

  return (

    <div className="App">
      <h1>trip_manager</h1>

      <Button onClick={handleOpenPlanningModal} variant="contained" style={{marginBottom: '.5rem'}}>
        <TravelExploreIcon style={{marginRight: '.5rem'}}/> Plan your next Trip
      </Button>
      <div
        className="ag-theme-quartz"
        style={{ height: 400, width: 600 }}
      >
        <AgGridReact
            rowData={tripsData}
            columnDefs={tripsColDefs}
        />
      </div>


      {/* modal to open PlanningModal */}
      <Dialog
          open={openPlanningModal}
          onClose={handleClosePlanningModal}
          fullWidth
          maxWidth="md"
        >
          <PlanningModal
            open={openPlanningModal}
            onClose={handleClosePlanningModal}
            tripsData={tripsData}
            setTripsData={setTripsData}
            selectedTrip={selectedTrip}
          />
        </Dialog>
    </div>

  );
}

export default App;
