import * as aws from 'aws-sdk';
import * as request from 'request';

interface IAWSEvent {}
interface IContext {}

// exports.handler = (event: any, context: any, callback: Function): void => {
export function handler(event: any, context: any, callback: Function): void {
  callback(null, 'success');
};
