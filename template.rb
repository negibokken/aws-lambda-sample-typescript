AWSTemplateFormatVersion '2010-09-09'

Parameters do
  BucketName do
    Description 'Bucket Name'
    Type 'String'
  end
end

Resources do
  WeatherLambdaFunction do
    Type 'AWS::Lambda::Function'
    Properties do
      FunctionName 'weather-news-lambda'
      Code do
        S3Bucket { Ref 'BucketName' }
        S3Key 'weather-lambda.zip'
      end
      Environment do
        Variables do
          SNS_TOPIC_ARN { Ref 'SNSTopic' }
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
  LambdaPermission do
    Type 'AWS::Lambda::Permission'
    Properties do
      Action 'lambda:InvokeFunction'
      FunctionName 'weather-news-lambda'
      SourceArn { Fn__GetAtt %w[ScheduleEvent Arn] }
      Principal 'events.amazonaws.com'
    end
  end
  ScheduleEvent do
    Type 'AWS::Events::Rule'
    Properties do
      ScheduleExpression 'cron(0 22 * * ? *)'
      Targets [
        _ {
          Id 'WeatherNewsScheduleEvent'
          Arn { Fn__GetAtt %w[WeatherLambdaFunction Arn] }
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
