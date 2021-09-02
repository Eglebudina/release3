"use strict";

const trends = {
  getTrendTemp(station) {
  let temperature = [0];
  if (station.readings.length >= 3) {
        if (station.readings[station.readings.length - 1].temperature >= station.readings[station.readings.length - 2].temperature
          && station.readings[station.readings.length - 2].temperature >= station.readings[station.readings.length - 3].temperature) {
                return "arrow up";
            } else if (station.readings[station.readings.length - 1].temperature <= station.readings[station.readings.length - 2].temperature
                    && station.readings[station.readings.length - 2].temperature <= station.readings[station.readings.length - 3].temperature) {
                return "arrow down";
            } else
            return "arrows alternate horizontal";
        } else
            return "minus circle";
    },
  
    getTrendWind(station) {
      let windSpeed = [0];
        if (station.readings.length >= 3) {
            if (station.readings[station.readings.length - 1].windSpeed >= station.readings[station.readings.length - 2].windSpeed
          && station.readings[station.readings.length - 2].windSpeed >= station.readings[station.readings.length - 3].windSpeed) {
                return "arrow up";
            } else if (station.readings[station.readings.length - 1].windSpeed <= station.readings[station.readings.length - 2].windSpeed
                    && station.readings[station.readings.length - 2].windSpeed <= station.readings[station.readings.length - 3].windSpeed) {
                return "arrow down";
            } else
            return "arrows alternate horizontal";
        } else
            return "minus circle";
    },

     getTrendPress(station)  {
       let pressure = [0];
        if (station.readings.length >= 3) {
            if (station.readings[station.readings.length - 1].pressure >= station.readings[station.readings.length - 2].pressure
          && station.readings[station.readings.length - 2].pressure >= station.readings[station.readings.length - 3].pressure) {
                return "arrow up";
            } else if (station.readings[station.readings.length - 1].pressure <= station.readings[station.readings.length - 2].pressure
                    && station.readings[station.readings.length - 2].pressure <= station.readings[station.readings.length - 3].pressure) {
                return "arrow down";
            } else
            return "arrows alternate horizontal";
        } else
            return "minus circle";
    },
}
module.exports = trends;
  