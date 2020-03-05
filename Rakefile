namespace :build do
  desc 'build Docker container image'
  task :docker do
    sh "docker build -t unvt/cambridge ."
  end

  desc 'build style.json'
  task :style do
    sh({'LOCATION' => 'http://localhost'}, 
      "parse-hocon style.conf > docs/style.json")
    sh "gl-style-validate docs/style.json"
  end
end

desc 'host the site'
task :host do
  sh "node index.js"
end

namespace :run do
  desc 'run docker for cambridge'
  task :docker do
    sh "docker run -ti --rm -v #{Dir.pwd}:/root/cambridge unvt/cambridge"
  end
end
