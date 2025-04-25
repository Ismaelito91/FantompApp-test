// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

import path from 'path';
import karmaJasmine from 'karma-jasmine';
import karmaChromeLauncher from 'karma-chrome-launcher';
import karmaJasmineHtmlReporter from 'karma-jasmine-html-reporter';
import karmaCoverage from 'karma-coverage';
import karmaSonarqubeReporter from 'karma-sonarqube-reporter';
import angularKarmaPlugin from '@angular-devkit/build-angular/plugins/karma.js';

export default function (config) {
   config.set({
      basePath: '',
      frameworks: ['jasmine', '@angular-devkit/build-angular'],
      plugins: [
         karmaJasmine,
         karmaChromeLauncher,
         karmaJasmineHtmlReporter,
         karmaCoverage,
         karmaSonarqubeReporter,
         angularKarmaPlugin
      ],
      client: {
         jasmine: {
            // you can add configuration options for Jasmine here
            // the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
            // for example, you can disable the random execution with `random: false`
            // or set a specific seed with `seed: 4321`
         },
      },
      jasmineHtmlReporter: {
         suppressAll: true // removes the duplicated traces
      },
      coverageReporter: {
         dir: path.join(process.cwd(), './coverage/fantome-app-frontend'),
         subdir: '.',
         reporters: [
            { type: 'html' },
            { type: 'text-summary' }
         ]
      },
      sonarqubeReporter: {
         basePath: 'src/app', // test files folder
         filePattern: '**/*spec.ts', // test files glob pattern
         encoding: 'utf-8', // test files encoding
         outputFolder: 'reports', // report destination
         legacyMode: false, // report for Sonarqube < 6.2 (disabled)
         reportName: function (metadata) {
            // report name callback, but accepts also a
            // string (file name) to generate a single file
            /**
             * Report metadata array:
             * - metadata[0] = browser name
             * - metadata[1] = browser version
             * - metadata[2] = plataform name
             * - metadata[3] = plataform version
             */
            return 'sonarqube_report.xml';
         },
      },
      reporters: ['progress', 'kjhtml', 'sonarqube'],
      browsers: [],
      singleRun: false,
      restartOnFileChange: true
   });
};
