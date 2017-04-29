import AWS = require("aws-sdk");
import * as request from "request";

interface IName {
  aaa: string;
}

function publish(): Promise<any> {
    return new Promise((resolve, reject) => {
        const sns: AWS.SNS = new AWS.SNS();
        let params: AWS.SNS.PublishInput = {
            Subject: "test",
            Message: "test message",
        };
        sns.publish(params, (err: AWS.AWSError, data: AWS.SNS.PublishResponse) => {
            err ? reject(err) : resolve(data);
        });
        let a: string[] = ["aaa", "bbb", "ccc"];
    });
}

export function handler(event: any, context: any, callback: Function): void {
    publish()
        .then(() => {
            callback(null, "success");
        })
        .catch((err: AWS.AWSError) => {
            callback(err);
        });
};
