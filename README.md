# AWS Lambda Sample

## Content

This repository is a simple AWS Lambda sample.

The Lambda function get weather news form [livedoor Web API](http://weather.livedoor.com/weather_hacks/webservice) and send push notification via Amazon SNS.

## Development tools

* Node.js v4.3.2
* Ruby v2.3.3
* bundler v1.13.6
* aws cli v1.11.44

## Usage

### Create Bucket and Resources

1. Execute below commands
    ```sh
    $ npm install
    $ npm start
    ```

2. Make S3 bukcet
    ```sh
    $ bundle install --path vendor/bundle
    $ bundle exec rake s3:create BUCKET={your_bucket_name}
    ```

3. Make CloudFormation template
    ```sh
    $ bundle exec rake cfn:create
    ```

4. Execute CloudFormation with template
    ```sh
    $ bundle exec rake cfn:execute BUCKET={your_bucket_name}
    ```

5. Add an Amazon SNS subscription
    ```sh
    $ bundle exec rake sns:subscribe TOPIC_ARN={your_sns_topic_arn} ENDPOINT={your_email_addresss}
    ```

### Delete

* Delete s3 bucket and resources that created by CloudFormation
    ```sh
    $ bundle exec rake s3:delete BUCKET={your_bucket_name}
    $ bundle exec rake cfn:delete
    ```

## License
MIT