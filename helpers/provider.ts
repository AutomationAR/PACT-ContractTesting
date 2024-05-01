// eslint-disable-next-line import/no-import-module-exports
import { getDashboard } from "../../api-services/dashboard";

const express = require("express");
// eslint-disable-next-line import/no-extraneous-dependencies
const cors = require("cors");

export const server = express();

server.use(cors());
server.use((_: any, res: any, next: any) => {
  res.header("Content-Type", "application/json; charset=utf-8");
  next();
});

// "In memory" data store
const dataStore = require("./dashboard.json");

server.get(getDashboard, (_: any, res: any) => {
  res.json(dataStore);
});

module.exports = {
  server,
  getDashboard,
};