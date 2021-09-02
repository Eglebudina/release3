'use strict';

const logger = require("../utils/logger");
const stationStore = require("../models/station-store");
const stationAnalytics = require("../utils/station-analytics");
const minMax = require("../utils/min-max");
const trends = require("../utils/trends");
const uuid = require("uuid");

const station = {
  index(request, response) {
    const stationId = request.params.id;
    logger.debug('Station id = ', stationId);

    const station = stationStore.getStation(stationId);
   
    const viewData = {
      title: "Station",
      station: stationStore.getStation(stationId),
      windBeauford : stationAnalytics.getWindBeauford(station),
      codeToText : stationAnalytics.getCodeToText(station),
      calculateCelcius: stationAnalytics.getCalculateCelcius(station),
      calculateFahrenheit: stationAnalytics.getCalculateFahrenheit(station),
      windDirection: stationAnalytics.getWindDirection(station),
      windChill: stationAnalytics.getWindChill(station),
      pressure: stationAnalytics.getPressure(station),
      minWind: minMax.getMinWind(station),
      minTemp: minMax.getMinTemp(station),
      minPressure: minMax.getMinPressure(station),
      maxWind: minMax.getMaxWind(station),
      maxTemp: minMax.getMaxTemp(station),
      maxPressure: minMax.getMaxPressure(station),
      trendTemp: trends.getTrendTemp(station),
      trendWind: trends.getTrendWind(station),
      trendPress: trends.getTrendPress(station)
   
    };
    response.render("station", viewData);
  },
  
  deleteReading(request, response) {
    const stationId = request.params.id;
    const readingId = request.params.readingid;
    logger.debug(`Deleting Reading ${readingId} from Station ${stationId}`);
    stationStore.removeReading(stationId, readingId);
    response.redirect("/station/" + stationId);
  },
  
  addReading(request, response) {
    const stationId = request.params.id;
    const station = stationStore.getStation(stationId);
    const newReading = {
      id: uuid.v1(),
      code: request.body.code,
      temperature: request.body.temperature,
      windSpeed: request.body.windSpeed,
      pressure: request.body.pressure,
      windDirection: request.body.windDirection,
      date: new Date().toString().substring(4, 25),
    };
    stationStore.addReading(stationId, newReading);
    response.redirect('/station/' + stationId);
  },
  
};

module.exports = station;