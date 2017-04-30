# encoding: utf-8

bucket = ENV['BUCKET']

abort 'bundle exec rake BUCKET=<BUCKET_NAME>' if bucket.nil?

namespace :s3 do
  desc 'tasks for s3 create and delete'
  task :create do
    desc 'create s3 bucket'
    puts `aws s3api create-bucket --bucket #{bucket}`
  end

  task :delete do
    desc 'delete s3 bucket'
    puts `aws s3api delete-bucket --bucket #{bucket}`
  end
end

namespace :cfn do
  desc 'tasks for CloudFormation create and delete'
  task :create do
    desc 'create CloudFormation template'
  end

  task :execute do
    desc 'execute CloudFormation template'
  end

  task :delete do
    desc 'elete CloudFormation template'
  end
end
