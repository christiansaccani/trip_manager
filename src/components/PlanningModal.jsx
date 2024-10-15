import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  Modal,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  InputAdornment,
  FormControl,
} from "@mui/material";
import "../style/App.css";

function PlanningModal({ open, onClose, tripsData, setTripsData, selectedTrip }) {
  const idCounter = useRef(0);

  const [selectedDestination, setSelectedDestination] = useState(null);
  const [selectedArriving, setSelectedArriving] = useState(null);
  const [selectedDeparture, setSelectedDeparture] = useState(null);
  const [selectedBudget, setSelectedBudget] = useState(null);

  const handleChangeTripsData = useCallback (() => {
    if (!selectedDestination  || !selectedArriving || !selectedDeparture || !selectedBudget) {
      alert('You should compile all the fields')
      return
    }

    const newTrip = {
      id: idCounter.current,
      destination: selectedDestination,
      arriving: selectedArriving,
      departure: selectedDeparture,
      budget: selectedBudget,
    };

    if (!selectedTrip) {
      setTripsData((prevTripsData) => [...prevTripsData, newTrip]);
      idCounter.current += 1;
    } else {

    }
    

    onClose()
  }, [tripsData, idCounter, selectedDestination, selectedArriving, selectedDeparture, selectedBudget])
  
  useEffect(() => {
    setSelectedDestination(selectedTrip ? selectedTrip.destination : '');
    setSelectedArriving(selectedTrip ? selectedTrip.arriving : '');
    setSelectedDeparture(selectedTrip ? selectedTrip.departure : '');
    setSelectedBudget(selectedTrip ? selectedTrip.budget : '');
  }, [tripsData, selectedTrip]);
  
    return (
      <Modal open={open} onClose={onClose}>
        <div
          style={{
            padding: 20,
            backgroundColor: "white",
            borderRadius: 8,
            maxWidth: 400,
            margin: "auto",
            marginTop: "5%",
          }}
        >
          <h3 style={{marginBottom: '1rem'}}>What are our plans?</h3>

          <form
            className="trip-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleChangeTripsData();
            }}
          >
            <InputLabel shrink>Destination</InputLabel>
            <TextField
              value={selectedDestination || ''}
              onChange={(e) => setSelectedDestination(e.target.value)}
              fullWidth
              variant="outlined"
              style={{ marginBottom: "1rem" }}
            />

            <InputLabel shrink>Arriving</InputLabel>
            <TextField
              type="date"
              value={selectedArriving || ''}
              onChange={(e) => setSelectedArriving(e.target.value)}
              fullWidth
              variant="outlined"
              style={{ marginBottom: "1rem" }}
            />

            <InputLabel shrink>Departure</InputLabel>
            <TextField
              type="date"
              value={selectedDeparture || ''}
              onChange={(e) => setSelectedDeparture(e.target.value)}
              fullWidth
              variant="outlined"
              style={{ marginBottom: "1rem" }}
            />

            <InputLabel shrink>Budget</InputLabel>
            <TextField
              type="number"
              value={selectedBudget || ''}
              onChange={(e) => setSelectedBudget(e.target.value)}
              fullWidth
              variant="outlined"
              InputProps={{
                startAdornment: <InputAdornment position="start">€</InputAdornment>,
              }}
              inputProps={{ min: 0 }} 
              style={{ marginBottom: "1rem" }}
            />

            <Button type="submit" variant="contained" className="addButton" aria-hidden='false'>
              Procede
            </Button>
          </form>

          <Button onClick={onClose} style={{ marginTop: "1rem" }}>
            Close
          </Button>
        </div>
      </Modal>
    );
  }
  
  export default PlanningModal;
  