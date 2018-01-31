#! /usr/bin/env node

import program from 'commander';
import inquirer from 'inquirer';
import Joi from 'joi';
import fs from 'fs';
import version from '../lib/version';
import init from '../lib/init';
import like from '../lib/like';
import communicate from '../lib/communicate';
import start from '../lib/start';

program
  .option('-c, --communicate', '联系作者', communicate)
  .option('-l, --like', '感觉不错，不妨支持一下', like)
  .option('-v, --version', '当前olaf-cli的版本', version);

const validates = {
  projectName: Joi.string().regex(/^[a-z0-9-]{3,48}$/),
  author: Joi.string().regex(/^[a-zA-Z\s]{3,20}$/),
  description: Joi.string().min(3).max(1024),
  type: Joi.string(),
  useScene: Joi.number().integer().min(1).max(3),
};
program
  .command('init')
  .alias('i')
  .description('使用olaf(奥拉夫)新建您的项目')
  .option('--project-name <project name>', '项目名称（如:nodejs-react-example-web）')
  .option('--author <author>', '作者英文名(如:Gavin)')
  .option('--description <description>', '项目描述')
  .option('--type <type>', '使用场景')
  .option('--useScene <useScene>', '核心框架')
  .action(async (option) => {
    const config = {
      projectName: option.projectName || null,
      author: option.author || null,
      description: option.description || null,
      type: option.type || null,
      useScene: option.useScene || 0,
    };
    const questions = [];
    if (Joi.validate(config.projectName, validates.projectName).error !== null) {
      questions.push({
        type: 'input',
        name: 'projectName',
        message: '请输入项目名称(如:nodejs-react-example-web):',
        validate(input) {
          const done = this.async();
          if (Joi.validate(input, validates.projectName).error !== null) {
            done('项目名称为3~48个字符，且只能是小写字母、数字、中横线');
            return;
          }
          fs.access(input, fs.constants.F_OK, (err) => {
            if (err) {
              done(null, true);
              return true;
            }
            done('该项目在当前目录已存在');
            return false;
          });
        }
      });
    }
    if (Joi.validate(config.author, validates.author).error !== null) {
      questions.push({
        type: 'input',
        name: 'author',
        message: '请输入作者英文名(如:Gavin):',
        validate(input) {
          const done = this.async();
          if (Joi.validate(input, validates.author).error !== null) {
            done('请输入正确的作者英文名(如:Gavin)');
            return;
          }
          done(null, true);
        }
      });
    }
    if (Joi.validate(config.description, validates.description).error !== null) {
      questions.push({
        type: 'input',
        name: 'description',
        message: '请输入项目描述:',
        validate(input) {
          const done = this.async();
          if (Joi.validate(input, validates.description).error !== null) {
            done('项目描述必须为3~1024个字');
            return;
          }
          done(null, true);
        }
      });
    }
    if (Joi.validate(config.type, validates.type).error !== null) {
      questions.push({
        type: 'list',
        name: 'type',
        message: '请选择项目类型',
        choices: [
          {
            name: 'React',
            value: 'react'
          },
          // {
          //   name: 'Lite',
          //   value: 'lite'
          // },
          // {
          //   name: 'Vue',
          //   value: 'vue'
          // },
          // {
          //   name: 'React Native(expo)',
          //   value: 'rn'
          // },
          // {
          //   name: '微信小程序',
          //   value: 'xcx'
          // },
        ]
      });
    }
    if (Joi.validate(config.useScene, validates.useScene).error !== null) {
      questions.push({
        type: 'list',
        name: 'useScene',
        message: '请选择使用场景',
        choices: [
          {
            name: 'PC',
            value: 1
          },
          // {
          //   name: 'Mobile',
          //   value: 2,
          // },
          // {
          //   name: '后台',
          //   value: 3,
          // },
        ],
        when: ((answers) => {
          if (answers.type === 'react') {
            return true;
          }
          return false;
        })
      });
    }
    inquirer.prompt(questions).then((answers) => {
      init(Object.assign(config, answers));
    });
  });
program
  .command('start')
  .alias('s')
  .description('运行项目')
  .action(() => {
    start();
  });
program.parse(process.argv);
