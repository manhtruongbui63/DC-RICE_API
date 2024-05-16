import bodyParser from 'body-parser'

const bodyConfig = (app) => {
  app.use(bodyParser.json({ limit: '50mb' }))
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
}

export const bodyParserConfig = bodyConfig
