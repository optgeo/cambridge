def style(location) 
  sh({'LOCATION' => location},
    "parse-hocon style.conf > docs/style.json")
  sh "gl-style-validate docs/style.json"
end

namespace :build do
  desc 'build Docker container image'
  task :docker do
    sh "docker build -t unvt/cambridge ."
  end

  desc 'build style.json for localhost'
  task :localhost do
    style('http://localhost')
  end

  desc 'build style.json for raspberrypi.local'
  task :raspi do
    style('http://raspberrypi.local')
  end 
end

desc 'host the site'
task :host do
  sh "node index.js"
end

namespace :docker do
  desc 'run docker for cambridge'
  task :run do
    sh "docker run -ti --rm -v #{Dir.pwd}:/root/cambridge -p 80:80 unvt/cambridge"
  end
end
