# AWS Lambda Sample

## Abstract

This repository is a simple AWS Lambda sample.

The sample works together with Amazon SNS.

## Development tools

* Node.js v4.3.2
* Ruby v2.3.3
* bundler v1.13.6
* aws cli v1.11.44

## Usage

### Create

* Execute below commands
    ```sh
    $ npm install
    $ npm start
    ```

* Make S3 bukcet
    ```sh
    $ bundle install --path vendor/bundle
    $ bundle exec rake s3:create
    ```

* Make CloudFormation template
    ```sh
    $ bundle exec rake cfn:create
    ```

* Execute CloudFormation
    ```sh
    $ bundle exec rake cfn:execute
    ```

### Delete

* Execute CloudFormation
    ```sh
    $ bundle exec rake s3:delete
    $ bundle exec rake cfn:delete
    ```

## License
MIT