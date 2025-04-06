pipeline {
    agent any

    environment {
        AZURE_CREDS = credentials('Azure_Credential')
        RESOURCE_GROUP = 'my-test-resource-group'
        FUNCTION_APP_NAME = 'my-test-function-app'
    }

    stages {
        stage('Build') {
            steps {
                script {
                    echo 'Building the application...'
                    powershell 'npm install'
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    echo 'Running tests...'
                    powershell 'npm test'
                }
            }
        }

        stage('Package') {
            steps {
                script {
                    echo 'Packaging the application...'
                    powershell '''
                        if (-Not (Test-Path -Path "function.zip")) {
                            Write-Host "Creating function.zip file..."
                            Compress-Archive -Path ./src/functions/*, ./node_modules/* -DestinationPath function.zip -Force
                        } else {
                            Write-Host "function.zip already exists, skipping archive creation."
                        }
                    '''
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    echo 'Deploying to Azure...'
                    withCredentials([azureServicePrincipal('Azure_Credential')]) {
                        powershell '''
                            az login --service-principal -u $env:AZURE_CLIENT_ID -p $env:AZURE_CLIENT_SECRET --tenant $env:AZURE_TENANT_ID
                            az functionapp deployment source config-zip --resource-group "${env.RESOURCE_GROUP}" --name "${env.FUNCTION_APP_NAME}" --src function.zip
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
