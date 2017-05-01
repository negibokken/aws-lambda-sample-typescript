# encoding: utf-8

bucket = ENV['BUCKET']
topic_arn = ENV['TOPIC_ARN']
endpoint = ENV['ENDPOINT']

namespace :s3 do
  desc 'tasks for s3 create and delete'
  task :create do
    desc 'create s3 bucket'
    abort 'bundle exec rake s3:create BUCKET=<BUCKET_NAME>' if bucket.nil?
    puts `aws s3api create-bucket --bucket #{bucket} --region us-west-2`
  end

  task :delete do
    desc 'delete s3 bucket'
    abort 'bundle exec rake s3:delete BUCKET=<BUCKET_NAME>' if bucket.nil?
    puts `aws s3api delete-bucket --bucket #{bucket}`
    puts `aws s3api delete-bucket --bucket #{bucket}`
  end
end

namespace :lambda do
  desc 'tasks for upload lambda zip code'
  task :upload do
    abort 'bundle exec rake cfn:execute BUCKET=<BUCKET_NAME>' if bucket.nil?
    abort 'Execute npm start before execute this task' unless File.exist? './weather-lambda.zip'
    puts `aws s3 cp weather-lambda.zip s3://#{bucket}/`
  end
end

namespace :cfn do
  desc 'tasks for CloudFormation create and delete'
  task :create do
    desc 'create CloudFormation template'
    puts `bundle exec kumogata convert template.rb > template.json`
  end

  task :execute do
    desc 'execute CloudFormation template'
    abort 'bundle exec rake cfn:execute BUCKET=<BUCKET_NAME>' if bucket.nil?
    puts `bundle exec kumogata convert template.rb > template.json`
    system 'aws cloudformation create-stack --stack-name weather-lambda --template-body file://template.json ' \
           '--capabilities "CAPABILITY_NAMED_IAM" --region us-west-2'
  end

  task :delete do
    desc 'delete CloudFormation template'
    puts `aws cloudformation delete-stack --stack-name weather-lambda`
  end
end

namespace :sns do
  desc 'tasks for SNS'
  task :subscribe do
    desc 'register endpoint'
    abort 'bundle exec rake s3:create TOPIC_ARN=<Topic_ARN> ENDPOINT=<Mail_Address>' if topic_arn.nil? || endpoint.nil?
    puts `aws sns subscribe --topic-arn #{topic_arn} --protocol email --notification-endpoint #{endpoint}`
  end
end
