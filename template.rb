AWSTemplateFormatVersion '2010-09-09'
Resources do
  WeatherLambdaFunction do
    Type 'AWS::Lambda::Function'
    Properties do
      FunctionName 'weather-news-lambda'
      Code do
        S3Bucket 'aws-lambda-sample-2017'
        S3Key 'weather-lambda.zip'
      end
      Environment do
        Variables do
          SNS_TOPIC_ARN { Fn__GetAtt %w[SNSTopic Arn] }
          URL 'http://weather.livedoor.com/forecast/webservice/json/v1?city=400040'
        end
      end
      Handler 'index.handler'
      Runtime 'nodejs4.3'
      Timeout 30
      Role { Fn__GetAtt %w[WeatherLambdaRole Arn] }
    end
  end

  WeatherLambdaRole do
    Type 'AWS::IAM::Role'
    Properties do
      RoleName 'WeatherLambdaRole'
      Path '/'
      AssumeRolePolicyDocument do
        Version '2012-10-17'
        Statement [
          _ {
            Effect 'Allow'
            Principal do
              Service ['lambda.amazonaws.com']
            end
            Action ['sts:AssumeRole']
          },
        ]
      end
      Policies [
        _ {
          PolicyName 'WeatherLambdaPolicy'
          PolicyDocument do
            Version '2012-10-17'
            Statement [
              _ {
                Effect 'Allow'
                Action '*'
                Resource '*'
              },
            ]
          end
        },
      ]
    end
  end

  SNSTopic do
    Type 'AWS::SNS::Topic'
    Properties do
      DisplayName 'weather news'
      TopicName 'weather-news'
    end
  end
end
