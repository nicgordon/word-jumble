module.exports = function () {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>Word Jumble</title>
        <link rel="stylesheet" type="text/css" href="/assets/style.css" />
      </head>
      <body>
        <div id="content"></div>
        <script>
          window.__config = {
            gameServer: '${process.env.GAME_SERVER_PROTOCOL}${process.env.GAME_SERVER_HOST}:${process.env.GAME_SERVER_PORT}'
          };
        </script>
        <script src="/assets/bundle.js"></script>
      </body>
    </html>
  `;
}
