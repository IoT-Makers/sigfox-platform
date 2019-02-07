pipeline {
    agent any
    environment {
        REGISTRY_URL = 'iotagency.sigfox.com:5000/'
        DOMAIN = 'iotagency.sigfox.com'        
    }
    stages {
        stage('build') {
            steps {
                sh 'bash build_for_deploy.sh -y dev'
            }
        }
    }
}
