# encoding: utf-8

bucket = ENV['BUCKET']

namespace :s3 do
  desc 'tasks for s3 create and delete'
  task :create do
    desc 'create s3 bucket'
    abort 'bundle exec rake s3:create BUCKET=<BUCKET_NAME>' if bucket.nil?
    puts `aws s3api create-bucket --bucket #{bucket}`
  end

  task :delete do
    desc 'delete s3 bucket'
    abort 'bundle exec rake s3:delete BUCKET=<BUCKET_NAME>' if bucket.nil?
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
    unless File.exist? './template.json'
      abort 'Execute create task and generaete template.json before execute task'
    end
    abort 'bundle exec rake cfn:execute BUCKET=<BUCKET_NAME>' if bucket.nil?
    puts `aws cloudformation create-stack --stack-name lambda-sample --template-body file://template.json`
  end

  task :delete do
    desc 'delete CloudFormation template'
  end
end
