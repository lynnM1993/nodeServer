'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/api/upload/image', controller.upload.image);
  router.get('/api/photo/list', controller.upload.getList);
};
