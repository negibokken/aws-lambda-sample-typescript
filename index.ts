import AWS = require("aws-sdk");
import * as request from "request";

/**
 * @return {Promise} any weather json information
 * @description
 * Get weather information from
 * specified URL with environment variable
 */
function getWeatherInformation(): Promise<any> {
    return new Promise((resolve: any, reject: any): void => {
        let param: request.OptionsWithUrl = {
            url: process.env.URL,
        };
        request(param, (err: any, response: request.RequestResponse, body: any) => {
            let weatherInformation: WeatherNewsResponse = JSON.parse(body);
            err ? reject(err) : resolve(weatherInformation);
        });
    });
}

/**
 * @param {any} body weather JSON object
 * @return {Promise} AWS.SNS.PublishInput
 * @description
 * Promise wrapped arrange object
 */
function arrangeInformation(weatherNews: WeatherNewsResponse): Promise<AWS.SNS.PublishInput> {
    return new Promise((resolve: Function, reject: Function) => {
        const params: AWS.SNS.PublishInput = {
            Subject: JSON.stringify(weatherNews.location),
            Message: JSON.stringify(weatherNews.forecasts)
        };
        resolve(params);
    });
}

/**
 * @param {string} topicArn
 * @return {string|undefined} if valid then return region
 * @description
 * Check wheaterh specified TopicARN is valid or not
 * https://docs.aws.amazon.com/ja_jp/general/latest/gr/aws-arns-and-namespaces.html#arn-syntax-sns
 */
function validateTopicArn(topicArn: string): string|undefined {
    let splitedTopicArn: string[] = topicArn.split(":");
    if (splitedTopicArn.length < 7) { return undefined; }
    return splitedTopicArn[3];
}

/**
 * @param {void}
 * @returns {Promise} AWS.Error | AWS.SNS.PublishResponse
 * @description
 * Promise wrapped AWS.publish
 */
function publish(params: AWS.SNS.PublishInput): Promise<any> {
    return new Promise((resolve, reject) => {
        let topicArn: string = process.env.TopicArn;
        if (!topicArn) { reject("[Error] No Topic ARN specified"); }

        const region: string|undefined = validateTopicArn(topicArn);
        if (region) { reject("[Error] Invalid Topic ARN"); }

        // Specified region because unable to send if the region is different from AWS Lambda
        const sns: AWS.SNS = new AWS.SNS({region: region});
        let snsParams: AWS.SNS.PublishInput = Object.assign(params, {TopicArn: topicArn});
        sns.publish(snsParams, (err: AWS.AWSError, data: AWS.SNS.PublishResponse) => {
            err ? reject(err) : resolve(data);
        });
    });
}

/**
 * @param {any} event AWS Event
 * @param {any} context AWA Lambda Context
 * @callback {any} First argument (err), Second argument (success message)
 * @returns {void}
 * @description
 * AWS handler
 */
export function handler(event: any, context: any, callback: any): void {
    getWeatherInformation()
        .then(arrangeInformation)
        .then(publish)
        .then(() => {
            callback(null, "success");
        }).catch(callback);
};
