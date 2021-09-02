"use strict";

const accounts = require ('./accounts.js');
const _ = require('lodash');
const logger = require("../utils/logger");
const stationStore = require("../models/station-store");
const stationAnalytics = require("../utils/station-analytics");
const minMax = require("../utils/min-max");
const trends = require("../utils/trends");
const uuid = require("uuid");

const dashboard = {
  index(request, response) {
    logger.info('dashboard rendering');
    
    const loggedInUser = accounts.getCurrentUser(request);
    const stationId = request.params.id;
    logger.debug('Station id = ', stationId);
    
    const stations = stationStore.getUserStations(loggedInUser.id); 
    // get all the users stations, this is an array of station objects    
    // loop over the array of station objects, adding on the extra stats to each station object
    for (let station of stations) {
      station.windBeauford = stationAnalytics.getWindBeauford(station);
      station.codeToText = stationAnalytics.getCodeToText(station);
      station.calculateCelcius = stationAnalytics.getCalculateCelcius(station);
      station.calculateFahrenheit = stationAnalytics.getCalculateFahrenheit(station);
      station.windDirection = stationAnalytics.getWindDirection(station);
      station.windChill = stationAnalytics.getWindChill(station);
      station.pressure = stationAnalytics.getPressure(station);
      station.minWind = minMax.getMinWind(station);
      station.minTemp = minMax.getMinTemp(station);
      station.minPressure = minMax.getMinPressure(station);
      station.maxWind = minMax.getMaxWind(station);
      station.maxTemp = minMax.getMaxTemp(station);
      station.maxPressure = minMax.getMaxPressure(station);
      station.trendTemp = trends.getTrendTemp(station);
      station.trendWind = trends.getTrendWind(station);
      station.trendPress = trends.getTrendPress(station);
    };
    
    const viewData = {
      title: 'Station Dashboard',
      stations: _.sortBy(stations, ['station', 'name']), // <- same array above with the extra stats added and in asc order
    };
    
    logger.info('about to render', stationStore.getAllStations());
    response.render('dashboard', viewData );
    
  },
  
  deleteStation(request, response) {
    const stationId = request.params.id;
    logger.debug(`Deleting Station ${stationId}`);
    stationStore.removeStation(stationId);
    response.redirect('/dashboard');
  },
  
  addStation(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const newStation = {
      id: uuid.v1(),
      userid: loggedInUser.id,
      name: request.body.name,
      lat: request.body.lat,
      lng: request.body.lng,
      readings: [],
    };
    logger.debug('Creating a new Station', newStation);
    stationStore.addStation(newStation);
    response.redirect('/dashboard');
  },
  
};

module.exports = dashboard;