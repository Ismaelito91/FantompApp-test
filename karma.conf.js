// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

import path from 'path';
import karmaJasmine from 'karma-jasmine';
import karmaChromeLauncher from 'karma-chrome-launcher';
import karmaJasmineHtmlReporter from 'karma-jasmine-html-reporter';
import karmaCoverage from 'karma-coverage';
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
      reporters: ['progress', 'kjhtml'],
      browsers: [],
      singleRun: false,
      restartOnFileChange: true
   });
};
