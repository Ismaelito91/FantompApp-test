pipeline {
   agent any

   tools {
      nodejs 'nodejs20'
   }

   environment {
      MAIN_DOCKER_REGISTRY_HOST = "rg.fr-par.scw.cloud"
      SCW_REGISTRY_NS = "demo-aot"
      IMAGE_REPOSITORY = "fantome-app-frontend"
      DOCKER_REGISTRY = "${MAIN_DOCKER_REGISTRY_HOST}/${SCW_REGISTRY_NS}"
      IMAGE_URL = "${DOCKER_REGISTRY}/${IMAGE_REPOSITORY}"
   }

   stages {
      stage('Clone') {
         steps {
            checkout scm
         }
      }

      stage('Setup pnpm') {
         when {
            expression {
               sh(script: 'command -v pnpm', returnStatus: true) != 0
            }
         }
         steps {
            sh 'npm install -g pnpm@latest'
         }
      }
      
      stage('Install dependencies') {
         steps {
               sh 'pnpm install --frozen-lockfile'
         }
      }

      stage('Audit dependencies') {
         steps {
               sh 'pnpm audit || true'
         }
      }

      stage('Build') {
         steps {
            script {
               sh "pnpm build"
            }
         }
      }

      stage('Build Docker Image') {
         steps {
            script {
               def branch = env.BRANCH_NAME ?: 'latest'
               sh "docker build . -t ${IMAGE_URL}:${branch}"
            }
         }
      }

      stage('Push Docker Image') {
         steps {
            withCredentials([string(credentialsId: 'SCW_PIC_AOT_SK', variable: 'PASSWORD')]) {
               script {
                  def tag = env.BRANCH_NAME ?: 'latest'
                  sh "docker login ${DOCKER_REGISTRY} -u nologin -p $PASSWORD"
                  sh "docker push ${IMAGE_URL}:${tag}"
               }
            }
         }
      }

      stage('Deploy Application') {
         steps {
            script {
               echo "🚀 Déploiement en cours..."
               def tag = env.BRANCH_NAME ?: 'latest'
               def deployEnv = env.DEPLOYMENT_ENVIRONMENT ?: 'sandbox'
               build job: 'fantome-app-deploy', parameters: [
                  string(name: 'TAG', value: tag),
                  string(name: 'DEPLOYMENT_ENVIRONMENT', value: deployEnv)
               ]
            }
         }
      }
   }

   post {
      always {
         cleanWs()
      }
   }
}
