namespace :build do
  desc 'build Docker container image'
  task :docker do
    sh "docker build -t unvt/cambridge ."
  end

  desc 'extract raw tiles from mbtiles'
  task :tiles do
    sh "tile-join --force --no-tile-compression \
      --output-to-directory=zxy --no-tile-size-limit \
      src/OS_Open_Zoomstack.mbtiles"
  end

  desc 'build style.json'
  task :style do
    sh({'LOCATION' => 'http://localhost:9966'}, 
      "parse-hocon style.conf > style.json")
    sh "gl-style-validate style.json"
  end
end

desc 'host the site'
task :host do
  sh "budo"
end

namespace :run do
  desc 'run docker for cambridge'
  task :docker do
    sh "docker run -ti --rm -v #{Dir.pwd}:/root unvt/cambridge"
  end
end
