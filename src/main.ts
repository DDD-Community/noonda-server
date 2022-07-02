import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerSetup } from './util/swagger';
import { HttpExceptionFilter } from "./util/http-exception.filter";
import { Callback, Context, Handler } from "aws-lambda";
import serverlessExpress from '@vendia/serverless-express';
import { Server } from "http";
import { ExpressAdapter } from "@nestjs/platform-express";
import { createServer, proxy } from "aws-serverless-express";
import { eventContext } from 'aws-serverless-express/middleware';
import {ValidationPipe} from "@nestjs/common";

let server: Handler;
const express = require('express');
const binaryMimeTypes: string[] = [];

let cachedServer: Server;

async function bootstrapServer(): Promise<Server> {
  if (!cachedServer) {
    const expressApp = express();
    const nestApp = await NestFactory.create(AppModule, new ExpressAdapter(expressApp))
    nestApp.use(eventContext());
    nestApp.useGlobalPipes(new ValidationPipe({transform: true}));
    SwaggerSetup(nestApp);
    await nestApp.init();
    await nestApp.listen(3005);
    cachedServer = createServer(expressApp, undefined, binaryMimeTypes);
  }
  return cachedServer;
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  if(event.path === '/api-docs') event.path = '/api-docs/';

  event.path = event.path.includes('swagger-ui')
    ? `/api-docs${event.path}`
    : event.path;

  cachedServer = await bootstrapServer();
  return proxy(cachedServer, event, context, 'PROMISE').promise;
};

if (!process.env.NODE_ENV) bootstrapServer();



