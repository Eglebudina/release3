"use strict";

const minMax = {
  
   getMinWind (station){
     let windSpeed = 0;
     if (station.readings.length >= 1){
      windSpeed = station.readings[station.readings.length-1].windSpeed; 
       var value = station.readings[0].windSpeed;
    for (var i = 0; i < station.readings.length; i++) {
      console.log(station.readings[i].windSpeed)
      if (station.readings[i].windSpeed <= value) {
        value = station.readings[i].windSpeed;
      }
    }
    }
    
     return value;
  },
  
  getMaxWind (station){
    var value = [0];
    for (var i = 0; i < station.readings.length; i++) {
      console.log(station.readings[i].windSpeed)
      if (station.readings[i].windSpeed >= value) {
        value = station.readings[i].windSpeed;
      }
    }
     return value;
  },
  
  getMinTemp (station){
    if (station.readings.length >= 1){
      station.temperature = station.readings[station.readings.length-1].temperature; 
    
    var value = station.readings[0].temperature;
    for (var i = 0; i < station.readings.length; i++) {
      console.log(station.readings[i].temperature)
      if (station.readings[i].temperature <= value) {
        value = station.readings[i].temperature;
      }
    }
    }
     return value;
  },
  
  getMaxTemp (station){
    var value = [0];
    for (var i = 0; i < station.readings.length; i++) {
      console.log(station.readings[i].temperature)
      if (station.readings[i].temperature >= value) {
        value = station.readings[i].temperature;
      }
    }
     return value;
  },
  
  getMinPressure (station){
    if (station.readings.length >= 1){
      station.pressure = station.readings[station.readings.length-1].pressure; 
    
    var value = station.readings[0].pressure;
    for (var i = 0; i < station.readings.length; i++) {
      console.log(station.readings[i].pressure)
      if (station.readings[i].pressure <= value) {
        value = station.readings[i].pressure;
      }
    }
    }
     return value;
  },
  
  getMaxPressure (station){
    var value = [0];
    for (var i = 0; i < station.readings.length; i++) {
      console.log(station.readings[i].pressure)
      if (station.readings[i].pressure >= value) {
        value = station.readings[i].pressure;
      }
    }
     return value;
  },
}

module.exports = minMax;