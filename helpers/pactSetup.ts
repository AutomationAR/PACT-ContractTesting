// eslint-disable-next-line import/no-extraneous-dependencies
import { LocalStorage } from 'node-localstorage';
// eslint-disable-next-line import/no-extraneous-dependencies
import {Pact}  from "@pact-foundation/pact";
import path from "path";



// Create a new instance of LocalStorage
 const localStorage = new LocalStorage('./scratch');

// Mock the global localStorage object to use the instance
 global.localStorage = localStorage;

export const provider = new Pact({
    consumer: 'Consumer',
    provider: 'Provider',
    log: path.resolve(process.cwd(), 'logs', 'pact.log'),
    dir: path.resolve(process.cwd(), 'pacts'),
    logLevel: 'info',
  });