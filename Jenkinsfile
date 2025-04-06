pipeline {
    agent any

    environment {
        AZURE_CREDS = credentials('Azure_Credential')
        RESOURCE_GROUP = credentials('RESOURCE_GROUP')
        FUNCTION_APP_NAME = credentials('FUNCTION_APP_NAME')
    }

    stages {
        stage('Build') {
            steps {
                script {
                    echo 'Building the application...'
                    sh 'npm install'
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    echo 'Running tests...'
                    sh 'npm test'
                }
            }
        }

        stage('Package') {
            steps {
                script {
                    echo 'Packaging the application...'
                    sh 'zip -r function.zip function package.json'
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    echo 'Deploying to Azure...'
                    withCredentials([azureServicePrincipal('Azure_Credential')]) {
                        sh '''
                            az login --service-principal -u $AZURE_CLIENT_ID -p $AZURE_CLIENT_SECRET --tenant $AZURE_TENANT_ID
                            az functionapp deployment source config-zip --resource-group $RESOURCE_GROUP --name $FUNCTION_APP_NAME --src function.zip
                        '''
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline succeeded! Azure Function has been deployed.'
        }
        failure {
            echo 'Pipeline failed! Check the logs for details.'
        }
    }
}
