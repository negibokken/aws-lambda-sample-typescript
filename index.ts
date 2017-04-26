import * as AWS from 'aws-sdk';
import * as request from 'request';

interface IAWSEvent {}
interface IContext {}

function publish(): Promise<any> {
  return new Promise((resolve, reject) => {
    const sns: AWS.SNS = new AWS.SNS();
    let params: any = {
      Subject: 'test',
      Message: 'test message',
    };
    sns.publish(params);

  });
}

export function handler(event: any, context: any, callback: Function): void {
  callback(null, 'success');
};
