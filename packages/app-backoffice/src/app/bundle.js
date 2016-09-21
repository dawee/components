import createApp from '.';

const container = document.getElementById('backoffice');
createApp({
  container,
  ...window.backoffice
});
